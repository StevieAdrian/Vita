import { COLORS } from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const scaleWidth = (size: number) => (width / 375) * size;
const scaleHeight = (size: number) => (height / 812) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scaleWidth(size) - size) * factor;

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
  },
  scrollWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  dobWrapper: {
    width: "100%",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  radioGroup: {
    marginVertical: 5,
  },
  genderContainer: {
    flexDirection: "row",
    marginTop: scaleHeight(6),
    marginBottom: scaleHeight(12),
    width: "100%",
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: scaleWidth(30),
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: scaleWidth(9),
    borderWidth: 2,
    borderColor: "#D0D0D0",
    marginRight: scaleWidth(8),
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: COLORS.black,
  },
  radioButtonInner: {
    width: scaleWidth(8),
    height: scaleWidth(8),
    borderRadius: scaleWidth(4),
    backgroundColor: COLORS.black,
    borderColor: COLORS.gray2,
  },
  genderText: {
    fontSize: moderateScale(15),
    color: COLORS.black,
  },
  saveBtn: {
    marginTop: 30,
    backgroundColor: "#4a90e2",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  otherInput: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 10,
    paddingVertical: scaleHeight(14),
    paddingHorizontal: scaleWidth(16),
    fontSize: moderateScale(16),
    color: COLORS.black,
    elevation: 4,
    minHeight: scaleHeight(60),
    borderWidth: 1,
    borderColor: COLORS.gray2,
  },
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
});
