import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const scaleWidth = (size: number): number => (width / 375) * size;
const scaleHeight = (size: number): number => (height / 812) * size;
const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scaleWidth(size) - size) * factor;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A90E2",
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
    marginBottom: scaleHeight(20),
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
  subtitle: {
    fontSize: moderateScale(16),
    color: "#FFFFFF",
    textAlign: "left",
    marginBottom: scaleHeight(20),
    opacity: 0.9,
  },
  selectionContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  optionsContainer: {
    gap: scaleHeight(12),
  },
  continueButton: {
    backgroundColor: "#000",
    paddingVertical: scaleHeight(18),
    paddingHorizontal: scaleWidth(24),
    borderRadius: scaleWidth(12),
    alignItems: "center",
    marginTop: scaleHeight(20),
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
  otherInput: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: scaleWidth(12),
    paddingVertical: scaleHeight(14),
    paddingHorizontal: scaleWidth(16),
    fontSize: moderateScale(16),
    color: "#000",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
    minHeight: scaleHeight(60),
  },
});
