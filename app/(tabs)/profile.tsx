import { Text, View, StyleSheet } from "react-native";
import React from "react";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text>profile screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
