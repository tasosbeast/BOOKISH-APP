import { COLORS } from "@/constants/theme";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS["form-bg"],
    padding: 40,
    maxWidth: 600,
    marginVertical: 40,
    marginHorizontal: "auto",
    borderRadius: 4,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  buttonGroup: {
    display: "flex",
    padding: 0,
    margin: 0,
    marginBottom: 40,
  },
  button: {
    display: "flex",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: COLORS["form-bg"],
  },
});
