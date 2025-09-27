import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export const styles = StyleSheet.create({
  optionsContainer: {
    width: "100%",
    maxHeight: 300,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.black,
  },
  checkbox: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.gray2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  checkedCheckbox: {
    backgroundColor: COLORS.primary, 
  },
  checkmark: {
    display: "none",
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  applyButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
