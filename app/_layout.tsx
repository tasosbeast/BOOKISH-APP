import React from "react";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkLoaded>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: "#adb5bd" }}>
            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaView>
        </SafeAreaProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
