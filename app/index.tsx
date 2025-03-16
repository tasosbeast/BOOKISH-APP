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
import React from "react";
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href={"/(tabs)"} />;
}
