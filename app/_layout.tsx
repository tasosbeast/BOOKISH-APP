// Import the React library for building components
import React from "react";
// Import ClerkProvider and ClerkLoaded for handling authentication with Clerk
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
// Import the navigation stack component from Expo Router
import { Stack } from "expo-router";
// Import safe area components to ensure the UI is rendered within safe boundaries on different devices
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// Import token cache to persist authentication tokens
import { tokenCache } from "@/cache";
// Import useFonts hook to load custom fonts in the app
import { useFonts } from "expo-font";
// Import SplashScreen API to manage the splash screen behavior
import * as SplashScreen from "expo-splash-screen";

/**
 * This file is the starting point of your app's navigation structure - think of it as the foundation
 * that everything else is built on. It:
 * - Sets up the app container as a wrapper around your entire app
 * - Handles screen edges safely to prevent content from being hidden by notches or home bars
 * - Creates the basic navigation system for moving between screens
 * - Hides default headers so you can create your own custom design
 *
 * Every screen in your app will be displayed inside this layout, and it ensures
 * your app looks good on different device shapes and sizes.
 *
 * @returns A layout wrapper with proper safe area handling and navigation stack
 */

// Prevent the splash screen from auto-hiding until fonts and layout are ready
SplashScreen.preventAutoHideAsync();

// Retrieve the publishable key for Clerk from environment variables
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// Throw an error if the publishable key is missing, ensuring proper configuration
if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

// Define the main root layout component for the app
export default function RootLayout() {
  // Load the custom font 'Modak' from the assets directory using the useFonts hook
  const [fontsLoaded] = useFonts({
    Modak: require("../assets/fonts/Modak-Regular.ttf"),
  });

  // Callback function that is executed once the layout is ready and fonts are loaded
  // It hides the splash screen to reveal the app's UI
  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // While fonts are still loading, render nothing to keep the splash screen visible
  if (!fontsLoaded) {
    return null;
  }

  // Wrap the entire app in the ClerkProvider to manage authentication and token caching
  // ClerkLoaded ensures that the app only renders once Clerk has been fully initialized
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        {/* 
          SafeAreaProvider ensures that the app respects safe areas on different devices.
          The onLayout prop is used to trigger the hiding of the splash screen once the layout is ready.
        */}
        <SafeAreaProvider onLayout={onLayoutRootView}>
          {/* 
            SafeAreaView provides padding to ensure content doesn't overlap with device-specific UI elements (like notches).
            Here, it is styled to take up the full screen and set a background color.
          */}
          <SafeAreaView style={{ flex: 1, backgroundColor: "#adb5bd" }}>
            {/* 
              The Stack component manages navigation between screens.
              The screenOptions prop is used to hide default headers, allowing for custom header designs.
            */}
            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaView>
        </SafeAreaProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
