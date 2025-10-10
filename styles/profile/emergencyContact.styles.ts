import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background2nd,
  },
  header: {
    width: "100%",
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
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderRadius: 10,
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
  label: {
    alignSelf: "flex-start",
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
    fontSize: 15,
    color: COLORS.black,
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
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: COLORS.black,
  },
});
