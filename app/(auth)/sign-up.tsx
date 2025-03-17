// Import all React functionalities
import * as React from "react";
// Import UI components from React Native
import { Text, TextInput, Button, View } from "react-native";
// Import the Clerk hook for handling sign-up processes
import { useSignUp } from "@clerk/clerk-expo";
// Import the router from Expo for navigating between screens
import { useRouter } from "expo-router";

// Define the SignUpScreen component that handles user registration and verification
export default function SignUpScreen() {
  // Destructure necessary functions and state from the Clerk sign-up hook
  const { isLoaded, signUp, setActive } = useSignUp();
  // Obtain the router instance to perform navigation
  const router = useRouter();

  // State to hold the user's email address input
  const [emailAddress, setEmailAddress] = React.useState("");
  // State to hold the user's password input
  const [password, setPassword] = React.useState("");
  // State flag to determine if email verification is pending
  const [pendingVerification, setPendingVerification] = React.useState(false);
  // State to hold the verification code provided by the user
  const [code, setCode] = React.useState("");

  // Function to handle the submission of the sign-up form
  const onSignUpPress = async () => {
    // If the sign-up system is not yet loaded, do nothing
    if (!isLoaded) return;

    try {
      // Create a new sign-up attempt using the provided email and password
      await signUp.create({
        emailAddress, // User's email
        password, // User's password
      });

      // Prepare email verification by sending a code to the user's email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Update state to show the verification form (pending verification)
      setPendingVerification(true);
    } catch (err) {
      // Log any errors encountered during the sign-up process
      // Refer to Clerk's documentation on error handling for more details:
      // https://clerk.com/docs/custom-flows/error-handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Function to handle the submission of the email verification form
  const onVerifyPress = async () => {
    // Ensure the sign-up system is loaded before proceeding
    if (!isLoaded) return;

    try {
      // Attempt to verify the email using the provided code
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code, // Verification code entered by the user
      });

      // Check if the sign-up process is complete after verification
      if (signUpAttempt.status === "complete") {
        // Activate the new session using the session ID returned from the sign-up attempt
        await setActive({ session: signUpAttempt.createdSessionId });
        // Redirect the user to the home screen
        router.replace("/");
      } else {
        // Log additional details if the sign-up is not yet complete
        // This may indicate further steps are required
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // Log any errors encountered during the verification process
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // If the verification process is pending, display the verification form
  if (pendingVerification) {
    return (
      <>
        {/* Inform the user to verify their email */}
        <Text>Verify your email</Text>
        {/* Input field for the verification code */}
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)} // Update the 'code' state as the user types
        />
        {/* Button to submit the verification code */}
        <Button title="Verify" onPress={onVerifyPress} />
      </>
    );
  }

  // If not pending verification, display the sign-up form
  return (
    <View>
      <>
        {/* Title for the sign-up screen */}
        <Text>Sign up</Text>
        {/* Input field for the user's email address */}
        <TextInput
          autoCapitalize="none" // Prevent auto-capitalization for email input
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)} // Update the email state as the user types
        />
        {/* Input field for the user's password */}
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={true} // Hide the password input for security
          onChangeText={(password) => setPassword(password)} // Update the password state as the user types
        />
        {/* Button to continue with the sign-up process */}
        <Button title="Continue" onPress={onSignUpPress} />
      </>
    </View>
  );
}
