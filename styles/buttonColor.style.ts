import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  containerButton: { paddingTop: 20 },
  buttonStyle: {
    borderRadius: 5,
    backgroundColor: COLORS.primary3rd,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  textButton: {
    color: COLORS.white,
    fontFamily: "Inter-Medium",
    fontSize: 16,
    textAlign: "center",
  },
  buttonActive: {
    backgroundColor: COLORS.primary,
  },
});
