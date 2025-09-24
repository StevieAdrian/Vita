import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  triggerContainer: {
    width: 368,
    height: 235,
    gap: 15,
    backgroundColor: "black",
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flexDirection: "column",
  },
  titlePopUp: {
    color: COLORS.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
    textAlign: "center",
  },
  descPopUp: {
    color: COLORS.gray2,
    fontFamily: "Inter-Regular",
    fontSize: 14,
    textAlign: "center",
  },
  buttonStyle: {
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  textButton: {
    color: COLORS.white,
    fontFamily: "Inter-Medium",
    fontSize: 14,
    textAlign: "center",
  },
  buttonContainer: {
    gap: 15,
    width: 207,
  },
  negationButton: {
    borderRadius: 5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  negationText: {
    color: COLORS.primary,
    fontFamily: "Inter-Medium",
    fontSize: 14,
    textAlign: "center",
  },
});
