import { COLORS } from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  calendarButton: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -12 }],
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    width: width * 0.95,
    maxWidth: 420,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.gray1,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: COLORS.background2nd,
  },
  customHeader: {
    marginBottom: 15,
    alignItems: "center",
  },
  monthYearButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: COLORS.background2nd,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#e1e5e9",
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.gray1,
    marginRight: 8,
  },
  yearPickerContainer: {
    flex: 1,
  },
  yearPickerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e5e9",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.background2nd,
    borderRadius: 8,
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
    marginLeft: 4,
  },
  yearPickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray1,
  },
  yearScrollContainer: {
    flex: 1,
    maxHeight: 300,
  },
  yearGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  yearGridItem: {
    width: "23%",
    aspectRatio: 1.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background2nd,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e1e5e9",
  },
  yearGridItemSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  yearGridText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.gray1,
  },
  yearGridTextSelected: {
    color: COLORS.white,
  },
});
