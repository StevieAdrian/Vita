import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const allergicOptionStyles = StyleSheet.create({
  optionButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: COLORS.primary2nd,
    shadowColor: COLORS.primary2nd,
    shadowOpacity: 0.3,
    elevation: 6,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.gray2,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    backgroundColor: "#2E7BD4",
    borderColor: "#2E7BD4",
    borderWidth: 2,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.black,
    flex: 1,
  },
  selectedOptionText: {
    color: COLORS.white,
  },
});
