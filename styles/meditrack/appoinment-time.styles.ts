import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 8,
    fontFamily: "Inter-Medium",
  },
  timeRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
  },
  timeText: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: "500",
  },
  timeSeparator: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  separatorLine: {
    width: 16,
    height: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 1,
  },
});

export const timePickerStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.black,
  },
  pickerContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  picker: {
    flex: 1,
    marginHorizontal: 10,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 12,
    textAlign: "center",
  },
  pickerWrapper: {
    maxHeight: 200,
    backgroundColor: COLORS.background2nd,
    borderRadius: 12,
    overflow: "hidden",
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
  },
  selectedItem: {
    backgroundColor: COLORS.primary,
  },
  pickerText: {
    fontSize: 16,
    color: COLORS.black,
  },
  selectedText: {
    color: COLORS.white,
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  scrollableList: {
    maxHeight: 200, 
  },
});