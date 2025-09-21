import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const scaleWidth = (size: number): number => (width / 375) * size;
const scaleHeight = (size: number): number => (height / 812) * size;
const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scaleWidth(size) - size) * factor;

export const allergicOptionStyles = StyleSheet.create({
  optionButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: scaleHeight(16),
    paddingHorizontal: scaleWidth(20),
    borderRadius: scaleWidth(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: scaleHeight(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: scaleWidth(4),
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: "#2E7BD4",
    shadowColor: "#2E7BD4",
    shadowOpacity: 0.3,
    elevation: 6,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleWidth(12),
  },
  checkbox: {
    width: scaleWidth(20),
    height: scaleHeight(20),
    borderRadius: scaleWidth(4),
    borderWidth: 2,
    borderColor: "#CCCCCC",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    backgroundColor: "#2E7BD4",
    borderColor: "#2E7BD4",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: moderateScale(12),
    fontWeight: "bold",
  },
  optionText: {
    fontSize: moderateScale(16),
    fontWeight: "500",
    color: "#333333",
    flex: 1,
  },
  selectedOptionText: {
    color: "#FFFFFF",
  },
});
