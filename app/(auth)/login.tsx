// Import necessary hooks and components from Clerk, Expo Router, and React Native
import { useSignIn } from "@clerk/clerk-expo"; // Hook to manage sign-in functionalities using Clerk
import { Link, useRouter } from "expo-router"; // Components for navigation using Expo Router
import { Text, TextInput, View, TouchableOpacity, Image } from "react-native"; // UI components from React Native
import React from "react"; // Import React library for component building
import { styles } from "@/styles/auth.style"; // Import custom styling for authentication screens

// Define the default functional component for the sign-in page
export default function Page() {
  // Destructure sign-in methods and state from Clerk's sign-in hook
  const { signIn, setActive, isLoaded } = useSignIn();
  // Get the router instance for navigation actions (e.g., redirection after sign-in)
  const router = useRouter();

  // Create local state variables to store user input for email and password
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Function to handle the submission of the sign-in form using React's useCallback for optimization
  const onSignInPress = React.useCallback(async () => {
    // Prevent submission if the sign-in system is not yet loaded
    if (!isLoaded) return;

    try {
      // Attempt to create a sign-in using the provided email and password
      const signInAttempt = await signIn.create({
        identifier: emailAddress, // Use the email address as the identifier
        password, // Use the entered password
      });

      // If the sign-in process completes successfully
      if (signInAttempt.status === "complete") {
        // Set the newly created session as active for the user
        await setActive({ session: signInAttempt.createdSessionId });
        // Redirect the user to the home page
        router.replace("/");
      } else {
        // If sign-in is not complete, log the attempt details for debugging purposes
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // Log any errors encountered during the sign-in process
      // Refer to Clerk's documentation for additional error handling information
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]); // Dependencies for the callback to ensure it updates on state changes

  return (
    // Main container view for the sign-in page using custom styles
    <View style={styles.container}>
      {/* Display the app logo or an authentication image */}
      <Image
        source={require("@/assets/images/Bibliophile-amico.png")}
        style={{ width: 150, height: 150, marginBottom: 20 }}
        resizeMode="contain"
      />

      {/* Header container for sign-in text */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Sign in to Bookish</Text>
        <Text style={styles.subheader}>
          Welcome back! Please sign in to continue
        </Text>
      </View>

      {/* Google Sign-In Button */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: "#fff",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#ddd",
          },
        ]}
        // Placeholder onPress action; replace with actual Google sign-in functionality as needed
        onPress={() => console.log("Google Sign In pressed")}
      >
        {/* Google icon image displayed inside the button */}
        <Image
          source={require("@/assets/images/google-icon.png")}
          style={{ width: 30, height: 30, marginRight: 10 }}
          resizeMode="contain"
        />
        {/* Button text styled with custom buttonText style and overriding text color */}
        <Text style={[styles.buttonText, { color: "#333" }]}>Google</Text>
      </TouchableOpacity>

      {/* Divider with OR text to separate alternative sign-in methods */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Container for email input field */}
      <View>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input} // Apply custom styling to the input field
          autoCapitalize="none" // Prevent automatic capitalization for email input
          value={emailAddress} // Bind the current emailAddress state to the input
          placeholder="Enter email" // Placeholder text when the input is empty
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)} // Update the state on text change
        />
      </View>

      {/* Label for the password input field */}
      <Text style={styles.inputLabel}>Password</Text>
      {/* Input field for entering the password */}
      <TextInput
        style={styles.input} // Apply custom styling to the input field
        value={password} // Bind the current password state to the input
        placeholder="Enter password" // Placeholder text when the input is empty
        secureTextEntry={true} // Hide the password characters for security
        onChangeText={(password) => setPassword(password)} // Update the state on text change
      />

      {/* Button to trigger the sign-in process */}
      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      {/* Container for the sign-up link, prompting users without an account */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Link href="/sign-up" asChild>
          <TouchableOpacity>
            <Text style={styles.signupLink}> Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
