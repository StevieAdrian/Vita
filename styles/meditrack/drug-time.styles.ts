import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  label: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 8,
    fontFamily: "Inter-Medium",
  },
  timesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 12,
  },
  timeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    minWidth: 120,
    maxWidth: 140,
  },
  timeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  timeText: {
    fontSize: 16,
    color: COLORS.black,
    flex: 1,
  },
  removeTimeButton: {
    position: "absolute",
    right: -8,
    top: -8,
    backgroundColor: COLORS.red,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 10,
  },
  addTimeButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 50,
    height: 50,
  },
  addIcon: {
    color: COLORS.primary,
  },
});

export const timePickerStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  picker: {
    alignItems: "center",
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: COLORS.black,
  },
  scrollableList: {
    maxHeight: 200,
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 2,
  },
  selectedItem: {
    backgroundColor: COLORS.primary,
  },
  pickerText: {
    fontSize: 16,
    color: COLORS.black,
  },
  selectedText: {
    color: "white",
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
