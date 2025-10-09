import { COLORS } from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background2nd,
  },
  dashboardContainerLinear: {
    flex: 1,
    paddingHorizontal: 20,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "70%",
  },
  header: {
    width: "100%",
    paddingTop: 0,
    paddingVertical: 0,
  },
  scrollWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dropdownWrapper: {
    width: "100%",
    marginBottom: 15,
  },
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingBottom: 35,
    borderRadius: 10,
    paddingTop: 15,
  },
  label: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
    fontFamily: "Inter-Medium",
  },
  required: {
    color: COLORS.red,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    minHeight: 48,
    borderRadius: 8,
  },
  dropdownButtonActive: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownText: {
    fontSize: 14,
    color: COLORS.black,
    fontFamily: "Inter-Regular",
  },
  placeholderText: {
    color: COLORS.black,
  },
  dropdownMenu: {
    marginTop: 6,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray1,
    borderRadius: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  dropdownScroll: {
    maxHeight: 180,
  },
  dropdownOption: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary5th,
  },
  dropdownOptionLast: {
    borderBottomWidth: 0,
  },
  dropdownOptionActive: {
    backgroundColor: COLORS.primary4th,
    borderRadius: 6,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dropdownOptionText: {
    fontSize: 14,
    color: COLORS.black,
  },
  otherInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.black,
    elevation: 4,
    minHeight: 60,
  },
  reqNotes: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
    fontFamily: "Inter-Medium",
  },
});
