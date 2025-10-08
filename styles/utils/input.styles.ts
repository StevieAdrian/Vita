import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 4,
    borderColor: COLORS.gray2,
    borderWidth: 1,
    width: "100%",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
    fontFamily: "Inter-Medium",
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 14,
    color: COLORS.black,
    paddingHorizontal: 10,
  },
  required: {
    color: COLORS.red,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 4,
  },
  container: {
    marginBottom: 10,
    borderRadius: 10,
  },
});
