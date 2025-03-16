import React from "react";
import { View } from "react-native";
import styles from "../../styles/auth.style";
import { Link } from "expo-router";

/**
 * Index component that serves as the main entry point for the tabs navigation.
 * Renders a simple view with a link to the notifications feed screen.
 *
 * @returns A View component containing a navigation Link to the notifications tab
 */
export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/(tabs)/notifications">Feed screen in tabs</Link>
    </View>
  );
}
