import { COLORS } from "@/constants/theme";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.main,
    padding: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    color: COLORS["sign-in-bg"],
    marginBottom: 10,
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 12,
    color: COLORS["sign-in-bg"],
  },
  input: {
    height: 50,
    width: width - 80,
    backgroundColor: COLORS.input,
    color: COLORS.main,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  inputLabel: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 5,
    color: COLORS["sign-in-bg"],
    fontWeight: "600",
  },
  button: {
    backgroundColor: COLORS["sign-in-bg"],
    padding: 15, // Increase padding for better touch targets
    borderRadius: 8, // Slightly more rounded corners
    marginTop: 15,
    width: width - 80,
    shadowColor: "#000", // Add shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android shadow
  },
  buttonText: {
    color: COLORS.main,
    textAlign: "center",
    fontWeight: "600", // Make text slightly bolder
    fontSize: 16, // Slightly larger text
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width - 80,
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS["sign-in-bg"],
    opacity: 0.4,
  },
  dividerText: {
    paddingHorizontal: 10,
    color: COLORS["sign-in-bg"],
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: COLORS["sign-in-bg"],
    fontSize: 14,
  },
  signupLink: {
    color: COLORS["sign-in-bg"],
    fontWeight: "700",
    fontSize: 14,
  },
});
