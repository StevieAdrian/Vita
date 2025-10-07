import { COLORS } from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const scaleWidth = (size: number): number => (width / 375) * size;
const scaleHeight = (size: number): number => (height / 812) * size;
const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scaleWidth(size) - size) * factor;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scaleWidth(24),
    paddingTop: scaleHeight(40),
    paddingBottom: scaleHeight(30),
  },
  mainWrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: scaleHeight(20),
  },
  logo: {
    width: scaleWidth(60),
    height: scaleHeight(60),
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: scaleHeight(25),
  },

  inputSection: {
    width: "100%",
    marginBottom: scaleHeight(25),
  },
  inputBox: {
    backgroundColor: COLORS.white,
    borderRadius: scaleWidth(10),
    paddingVertical: scaleHeight(14),
    paddingHorizontal: scaleWidth(16),
    fontSize: moderateScale(16),
    color: COLORS.black,
    borderWidth: 1,
  },

  buttonContainer: {
    width: "100%",
  },
  continueButton: {
    backgroundColor: COLORS.black,
    paddingVertical: scaleHeight(18),
    paddingHorizontal: scaleWidth(24),
    borderRadius: scaleWidth(12),
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: scaleHeight(4),
    },
    shadowOpacity: 0.3,
    shadowRadius: scaleWidth(6),
    elevation: 8,
  },
  continueButtonDisabled: {
    backgroundColor: COLORS.black,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  continueButtonText: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: COLORS.white,
  },
});
