import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  innerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 4,
    paddingHorizontal: 10,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    fontWeight: 500,
  },
  input: {
    height: 45,
    fontSize: 14,
    color: "#333",
  },
  required: {
    color: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
