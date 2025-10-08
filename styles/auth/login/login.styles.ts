import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  dashboardContainerLinear: {
    flex: 1,
    paddingHorizontal: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  upCont: {
    alignItems: "center",
    marginHorizontal: 16,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 18,
    alignItems: "flex-start",
    marginLeft: 35,
  },

  logo: {
    width: 35,
    height: 35,
    marginBottom: 14,
    tintColor: COLORS.white,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 32,
    color: COLORS.white,
    marginBottom: 6,
    textAlign: "left",
    width: "100%",
    fontFamily: "Inter-Semibold",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.85)",
    textAlign: "left",
    lineHeight: 20,
    width: "100%",
    fontFamily: "Inter-Regular",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  welcomeImage: {
    width: "70%",
    resizeMode: "contain",
    alignSelf: "flex-start",
    marginLeft: 30,
    marginBottom: -50,
  },
  boxContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    width: "100%",
    alignItems: "center",
  },

  continueButton: {
    backgroundColor: COLORS.black,
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  continueText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  signupText: {
    fontSize: 14,
    color: COLORS.gray1,
    marginTop: 15,
    fontFamily: "Inter-Regular",
  },
  signupLink: {
    color: COLORS.primary,
    fontFamily: "Inter-Medium",
  },
  dividerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "70%",
    alignSelf: "center",
  },
  divider: {
    flex: 1,
    height: 1.5,
    backgroundColor: COLORS.white,
  },
  dividerText: {
    marginHorizontal: 10,
    color: COLORS.white,
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.secondary4th,
    marginBottom: 16,
    width: "85%",
  },
  googleLogo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  forgotContainer: {
    alignSelf: "flex-end",
    marginVertical: 10,
  },
  forgotText: {
    color: COLORS.primary,
    fontFamily: "Inter-SemiBold",
  },
  googleIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },

  googleText: {
    fontSize: 15,
    color: COLORS.black,
    fontWeight: "500",
  },
});
