import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

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
  content: {
    flex: 1,
    paddingHorizontal: scaleWidth(24),
    paddingTop: scaleHeight(40),
    paddingBottom: scaleHeight(30),
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: scaleHeight(30),
  },
  logo: {
    width: scaleWidth(80),
    height: scaleHeight(80),
  },
  title: {
    fontSize: moderateScale(32),
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
    marginBottom: scaleHeight(40),
    lineHeight: moderateScale(38),
  },
  progressBarContainer: {
    marginBottom: scaleHeight(30),
    paddingHorizontal: scaleWidth(20),
  },
  progressBar: {
    height: scaleHeight(8),
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: scaleHeight(4),
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.white,
    borderRadius: scaleHeight(4),
  },
  selectionContainer: {
    flex: 1,
    justifyContent: "center",
    gap: scaleHeight(16),
  },
  optionsContainer: {
    gap: scaleHeight(12),
  },
  optionButton: {
    backgroundColor: COLORS.white,
    paddingVertical: scaleHeight(18),
    paddingHorizontal: scaleWidth(24),
    borderRadius: scaleWidth(12),
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: scaleHeight(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: scaleWidth(4),
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: COLORS.primary2nd,
    shadowColor: COLORS.primary2nd,
    shadowOpacity: 0.3,
    elevation: 6,
  },
  optionText: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: COLORS.black,
  },
  selectedOptionText: {
    color: COLORS.white,
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
  errorText: {
    color: COLORS.red,
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
