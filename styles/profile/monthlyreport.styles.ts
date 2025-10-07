import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: COLORS.primary,
  },
  headerContainer: {
    width: "100%",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  contentWrapper: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  dropdownContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  label: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "#000",
  },
  dropdownBox: {
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 200,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  dropdownText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#000",
  },
  previewSection: {
    marginBottom: 24,
  },
  warningText: {
    color: COLORS.red,
    fontFamily: "Inter-Medium",
    fontSize: 14,
    marginBottom: 12,
    fontStyle: "italic",
  },
  previewImage: {
    width: "100%",
    height: 380,
    resizeMode: "contain",
  },
  textPdf: {
    width: "100%",
    marginBottom: 32,
  },
  downloadButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 8,
  },
  downloadButtonText: {
    color: "white",
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  downloadIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "white",
  },
});
