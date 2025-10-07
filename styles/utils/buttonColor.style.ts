import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerButton: { paddingTop: 20 },
  buttonStyle: {
    borderRadius: 5,
    backgroundColor: COLORS.gray2,
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
    backgroundColor: COLORS.black,
  },
});
