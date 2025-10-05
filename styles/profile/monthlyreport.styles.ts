import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    width: "100%",
    backgroundColor: COLORS.primary,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#E9F3FF",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.primary,
  },
  formContainer: {
    alignItems: "flex-start",
    width: 369,
    height: "auto",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  dropdownContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  label: { fontFamily: "Inter-Medium", fontSize: 16 },
  downloadIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    resizeMode: "contain",
  },
  dropdownBox: {
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 8,
    padding: 10,
    width: 200,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  warningText: {
    color: COLORS.red,
    fontFamily: "Inter-Medium",
    fontSize: 14,
    marginTop: 15,
    marginBottom: 5,
    fontStyle: "italic",
  },
  textPdf: {
    width: "100%",
  },
});
