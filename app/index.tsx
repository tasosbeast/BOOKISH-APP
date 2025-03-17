/**
 * Root index component that serves as the entry point of the application.
 * This component automatically redirects users to the tabs navigation structure.
 *
 * In Expo Router's file-based navigation, this file is loaded when a user visits
 * the root path of the app. Instead of rendering content directly, it uses the
 * Redirect component to send users to the tabbed interface.
 *
 * The (tabs) path refers to the folder structure in the app directory, where
 * screens within the (tabs) folder are organized into a tab-based navigation.
 *
 * This approach ensures users always start with the main tabbed experience
 * rather than seeing a standalone screen at the root level.
 *
 * @returns A redirect component that navigates to the tabs interface
 */

// Import React to define our component
import React from "react";
// Import the Redirect component from Expo Router to programmatically navigate
import { Redirect } from "expo-router";

// Define the Index component that handles the redirection from the root path
export default function Index() {
  // The Redirect component sends the user to the specified route immediately.
  // In this case, it navigates to the '/(auth)/login' route.
  return <Redirect href="/(auth)/login" />;
}
