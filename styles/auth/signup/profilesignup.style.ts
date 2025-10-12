import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
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
  mainWrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 25,
  },

  inputSection: {
    width: "100%",
    marginBottom: 25,
  },
  inputBox: {
    backgroundColor: COLORS.gray3,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.black,
  },

  buttonContainer: {
    width: "100%",
  },
  continueButton: {
    backgroundColor: COLORS.black,
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    elevation: 8,
  },
  continueButtonDisabled: {
    backgroundColor: COLORS.black,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  continueButtonText: {
    fontSize: 14,
    fontFamily: "Inter-regular",
    color: COLORS.white,
  },
  backButton: {
    position: "absolute",
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    zIndex: 1,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
