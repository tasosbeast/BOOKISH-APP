import React from "react";
import { View } from "react-native";
import styles from "../../styles/auth.style";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/(tabs)/notifications">Visit notifications screen</Link>
    </View>
  );
}
