// Import necessary hooks and components from Clerk, Expo Router, and React Native
import { useSignIn } from "@clerk/clerk-expo"; // Hook to manage sign-in functionalities using Clerk
import { Link, useRouter } from "expo-router"; // Components for navigation using Expo Router
import { Text, TextInput, View, TouchableOpacity, Image } from "react-native"; // UI components from React Native
import React from "react"; // Import React library for component building
import { styles } from "@/styles/auth.style"; // Import styling for authentication screens

// Define the default functional component for the sign-in page
export default function Page() {
  // Destructure sign-in methods and state from Clerk's hook
  const { signIn, setActive, isLoaded } = useSignIn();
  // Get the router for navigation actions
  const router = useRouter();

  // Create local state variables for storing email and password inputs
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    // Prevent proceeding if the sign-in system is not yet loaded
    if (!isLoaded) return;

    try {
      // Attempt to create a sign-in using the provided email and password
      const signInAttempt = await signIn.create({
        identifier: emailAddress, // User's email address as identifier
        password, // User's password
      });

      // If the sign-in process completes successfully
      if (signInAttempt.status === "complete") {
        // Set the newly created session as active for the user
        await setActive({ session: signInAttempt.createdSessionId });
        // Redirect the user to the home page
        router.replace("/");
      } else {
        // If sign-in is not complete, log the attempt for debugging
        // This might indicate additional steps are required for the sign-in process
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // Log any errors encountered during the sign-in process
      // For more details on error handling, refer to Clerk's documentation
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]); // Dependencies for the callback

  return (
    // Main container view for the sign-in page
    <View style={styles.container}>
      {/* App logo or authentication image */}
      <Image
        source={require("@/assets/images/Bibliophile-amico.png")}
        style={{ width: 150, height: 150, marginBottom: 20 }}
        resizeMode="contain"
      />

      {/* Text header for the sign-in page */}
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
        onPress={() => console.log("Google Sign In pressed")}
      >
        <Image
          source={require("@/assets/images/google-icon.png")}
          style={{ width: 30, height: 30, marginRight: 10 }}
          resizeMode="contain"
        />
        <Text style={[styles.buttonText, { color: "#333" }]}>Google</Text>
      </TouchableOpacity>

      {/* Divider with OR text */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Input field for entering the email address */}
      <View>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input} // Apply custom styling
          autoCapitalize="none"
          value={emailAddress} // Binds the emailAddress state to the input value
          placeholder="Enter email" // Placeholder text
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)} // Update state on text change
        />
      </View>
      {/* Input field for entering the password */}
      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        style={styles.input} // Apply custom styling
        value={password} // Binds the password state to the input value
        placeholder="Enter password" // Placeholder text
        secureTextEntry={true} // Hides the text input for security
        onChangeText={(password) => setPassword(password)} // Update state on text change
      />
      {/* Touchable button that triggers the sign-in process */}
      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      {/* Text link to the sign-up page */}
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
