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
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  welcomeImage: {
    width: "70%",
    resizeMode: "contain",
    alignSelf: "flex-start",
    marginLeft: 30,
    marginBottom: -50,
  },
  boxContainer: {
    width: "85%",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
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
    fontSize: 16,
    fontWeight: 400,
  },
  signupText: {
    fontSize: 13,
    color: COLORS.black,
    marginTop: 15,
  },
  signupLink: {
    color: "blue",
    fontWeight: "bold",
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
    width: "70%",
    height: 50,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  googleLogo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
