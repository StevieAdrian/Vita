import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  innerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.gray1,
    borderRadius: 8,
    marginBottom: 4,
    paddingHorizontal: 10,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 5,
    fontWeight: 500,
  },
  input: {
    height: 45,
    fontSize: 14,
    color: COLORS.black,
  },
  required: {
    color: COLORS.red,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 4,
  },
});
