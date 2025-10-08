import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
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

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 38,
  },

  progressBarContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 4,
  },

  selectionContainer: {
    justifyContent: "space-between",
    gap: 16,
  },
  optionsContainer: {
    gap: 12,
  },

  optionButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: COLORS.primary2nd,
    shadowColor: COLORS.primary2nd,
    shadowOpacity: 0.3,
    elevation: 6,
  },
  optionText: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.black,
  },
  selectedOptionText: {
    color: COLORS.white,
  },

  continueButton: {
    backgroundColor: COLORS.black,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  continueButtonDisabled: {
    backgroundColor: COLORS.black,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  continueButtonText: {
    fontSize: 18,
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
