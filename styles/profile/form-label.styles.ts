import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: COLORS.black,
  },
  required: {
    color: "red",
    marginLeft: 2,
  },
});
