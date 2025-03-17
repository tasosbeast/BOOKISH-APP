// Import necessary hooks and components from Clerk, Expo Router, and React Native
import { useSignIn } from "@clerk/clerk-expo"; // Hook to manage sign-in functionalities using Clerk
import { Link, useRouter } from "expo-router"; // Components for navigation using Expo Router
import { Text, TextInput, View, TouchableOpacity } from "react-native"; // UI components from React Native
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
      {/* Group of buttons for sign in and sign up actions */}
      <View style={styles.buttonGroup}>
        {/* Touchable button that triggers the sign-in process */}
        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        {/* Link to the sign-up page wrapped around a touchable button */}
        <Link href="/sign-up" asChild>
          <TouchableOpacity style={[styles.button]}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Input field for entering the email address */}
      <TextInput
        autoCapitalize="none"
        value={emailAddress} // Binds the emailAddress state to the input value
        placeholder="Enter email" // Placeholder text
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)} // Update state on text change
      />
      {/* Input field for entering the password */}
      <TextInput
        style={styles.input} // Apply custom styling
        value={password} // Binds the password state to the input value
        placeholder="Enter password" // Placeholder text
        secureTextEntry={true} // Hides the text input for security
        onChangeText={(password) => setPassword(password)} // Update state on text change
      />
    </View>
  );
}
