import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const scaleWidth = (size: number): number => (width / 375) * size;
const scaleHeight = (size: number): number => (height / 812) * size;
const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scaleWidth(size) - size) * factor;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4285F4",
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
    color: "#FFFFFF",
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
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#FFFFFF",
    paddingVertical: scaleHeight(18),
    paddingHorizontal: scaleWidth(24),
    borderRadius: scaleWidth(12),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: scaleHeight(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: scaleWidth(4),
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: "#2E7BD4",
    shadowColor: "#2E7BD4",
    shadowOpacity: 0.3,
    elevation: 6,
  },
  optionText: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: "#333333",
  },
  selectedOptionText: {
    color: "#FFFFFF",
  },
  continueButton: {
    backgroundColor: "#000",
    paddingVertical: scaleHeight(18),
    paddingHorizontal: scaleWidth(24),
    borderRadius: scaleWidth(12),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: scaleHeight(4),
    },
    shadowOpacity: 0.3,
    shadowRadius: scaleWidth(6),
    elevation: 8,
  },
  continueButtonDisabled: {
    backgroundColor: "#000",
    shadowOpacity: 0.1,
    elevation: 2,
  },
  continueButtonText: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: "#FFFFFF",
  },
  errorText: {
    color: "B00020",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
