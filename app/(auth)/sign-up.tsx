// Import all React functionalities
import * as React from "react";
// Import UI components from React Native
import { Text, TextInput, View, TouchableOpacity, Image } from "react-native";
// Import the Clerk hook for handling sign-up processes
import { useSignUp } from "@clerk/clerk-expo";
// Import the router and Link from Expo for navigating between screens
import { useRouter, Link } from "expo-router";
// Import custom styles defined in your auth.style file
import { styles } from "@/styles/auth.style";

// Define the SignUpScreen component that manages user registration and email verification
export default function SignUpScreen() {
  // Destructure necessary functions and state from the Clerk sign-up hook
  const { isLoaded, signUp, setActive } = useSignUp();
  // Obtain the router instance to perform navigation actions (e.g., redirecting after sign-up)
  const router = useRouter();

  // State to hold the user's email address input
  const [emailAddress, setEmailAddress] = React.useState("");
  // State to hold the user's password input
  const [password, setPassword] = React.useState("");
  // State flag to determine if the email verification process is pending
  const [pendingVerification, setPendingVerification] = React.useState(false);
  // State to hold the verification code that the user will enter
  const [code, setCode] = React.useState("");

  // Function to handle submission of the sign-up form
  const onSignUpPress = async () => {
    // Check if the sign-up system is loaded before proceeding
    if (!isLoaded) return;

    try {
      // Initiate a new sign-up attempt with the provided email and password
      await signUp.create({
        emailAddress, // The user's email address
        password, // The user's password
      });

      // Trigger sending a verification email to the user with a code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Update state to show the verification form instead of the sign-up form
      setPendingVerification(true);
    } catch (err) {
      // Log any errors encountered during the sign-up process for debugging
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Function to handle submission of the email verification form
  const onVerifyPress = async () => {
    // Ensure the sign-up system is loaded before proceeding with verification
    if (!isLoaded) return;

    try {
      // Attempt to verify the email using the verification code entered by the user
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code, // The code entered by the user
      });

      // Check if the sign-up process is complete after verification
      if (signUpAttempt.status === "complete") {
        // Set the new session as active using the session ID returned from the attempt
        await setActive({ session: signUpAttempt.createdSessionId });
        // Redirect the user to the home screen (or any target screen)
        router.replace("/");
      } else {
        // If sign-up is not complete, log the sign-up attempt details
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // Log any errors encountered during the email verification process
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // If the sign-up process is waiting for email verification, display the verification form
  if (pendingVerification) {
    return (
      <View style={styles.container}>
        {/* Display an image for visual branding */}
        <Image
          source={require("@/assets/images/Bibliophile-amico.png")}
          style={{ width: 150, height: 150, marginBottom: 20 }}
          resizeMode="contain"
        />

        {/* Container for header text */}
        <View style={styles.headerContainer}>
          {/* Main header instructing user to verify email */}
          <Text style={styles.header}>Verify your email</Text>
          {/* Subheader explaining that a verification code was sent */}
          <Text style={styles.subheader}>
            We've sent a verification code to your email
          </Text>
        </View>

        {/* Label for the verification code input field */}
        <Text style={styles.inputLabel}>Verification Code</Text>
        {/* Input field for the user to enter the verification code */}
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#7a9cc6" // Brighter placeholder text color
          onChangeText={(code) => setCode(code)}
        />

        {/* Button to trigger the email verification submission */}
        <TouchableOpacity style={styles.button} onPress={onVerifyPress}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // If email verification is not pending, display the sign-up form
  return (
    <View style={styles.container}>
      {/* Display an image for visual branding */}
      <Image
        source={require("@/assets/images/Bibliophile-amico.png")}
        style={{ width: 150, height: 150, marginBottom: 20 }}
        resizeMode="contain"
      />

      {/* Container for header text */}
      <View style={styles.headerContainer}>
        {/* Main header for the sign-up form */}
        <Text style={styles.header}>Create an account</Text>
        {/* Subheader inviting the user to sign up */}
        <Text style={styles.subheader}>Sign up to start using Bookish</Text>
      </View>

      {/* Label for the email input field */}
      <Text style={styles.inputLabel}>Email</Text>
      {/* Input field for the user's email address */}
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#c1bdba" // Brighter placeholder text color
        onChangeText={(email) => setEmailAddress(email)}
      />

      {/* Label for the password input field */}
      <Text style={styles.inputLabel}>Password</Text>
      {/* Input field for the user's password */}
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password"
        placeholderTextColor="#c1bdba" // Brighter placeholder text color
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      {/* Button to submit the sign-up form */}
      <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      {/* Container for the prompt to navigate to the login screen */}
      <View style={styles.signupContainer}>
        {/* Text prompting the user about an existing account */}
        <Text style={styles.signupText}>Already have an account?</Text>
        {/* Link wrapped around a touchable element to navigate to the login screen */}
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text style={styles.signupLink}> Sign in</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
