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
    backgroundColor: "white",
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
    color: "#2d4150",
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
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
    backgroundColor: "#f8f9fa",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#e1e5e9",
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d4150",
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
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 14,
    color: "#4285F4",
    fontWeight: "600",
    marginLeft: 4,
  },
  yearPickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d4150",
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
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e1e5e9",
  },
  yearGridItemSelected: {
    backgroundColor: "#4285F4",
    borderColor: "#4285F4",
  },
  yearGridText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d4150",
  },
  yearGridTextSelected: {
    color: "#ffffff",
  },
});
