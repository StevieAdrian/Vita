import { COLORS } from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const scaleWidth = (size: number) => (width / 375) * size;
const scaleHeight = (size: number) => (height / 812) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scaleWidth(size) - size) * factor;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: scaleHeight(100),
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: scaleHeight(40),
    paddingHorizontal: scaleWidth(25),
    paddingBottom: scaleHeight(18),
    alignItems: "flex-start",
  },
  logo: {
    width: scaleWidth(35),
    height: scaleWidth(35),
    marginBottom: scaleHeight(14),
    tintColor: COLORS.white,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: width < 375 ? scaleWidth(28) : scaleWidth(32),
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: scaleHeight(6),
    textAlign: "left",
    width: "100%",
  },
  subtitle: {
    fontSize: width < 375 ? scaleWidth(14) : scaleWidth(16),
    color: "rgba(255, 255, 255, 0.85)",
    textAlign: "left",
    lineHeight: scaleHeight(20),
    width: "100%",
  },
  formWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: scaleHeight(12),
    paddingBottom: scaleHeight(200),
  },
  formContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: scaleWidth(18),
    paddingVertical: scaleHeight(18),
    width: "90%",
    alignSelf: "center",
    borderRadius: scaleWidth(12),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: scaleHeight(2),
    },
    shadowOpacity: 0.08,
    shadowRadius: scaleWidth(4),
    elevation: 3,
    marginBottom: scaleHeight(10),
  },
  bottomContainer: {
    width: "90%",
    alignItems: "center",
    marginTop: scaleHeight(10),
    alignSelf: "center",
    marginBottom: scaleHeight(20),
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    color: COLORS.gray1,
    marginBottom: 5,
    fontWeight: "500",
  },
  required: {
    color: COLORS.red,
  },
  dobWrapper: {
    width: "100%",
    position: "relative",
    marginBottom: 15,
  },
  calendarIcon: {
    position: "absolute",
    right: 12,
    top: 36,
    zIndex: 1,
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
    width: scaleWidth(18),
    height: scaleWidth(18),
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
  },
  genderText: {
    fontSize: moderateScale(15),
    color: COLORS.black,
  },
  continueButton: {
    backgroundColor: COLORS.black,
    paddingVertical: scaleHeight(14),
    borderRadius: scaleWidth(6),
    alignItems: "center",
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(16),
    width: "100%",
  },
  continueText: {
    color: COLORS.white,
    fontSize: moderateScale(15),
    fontWeight: "600",
  },
  loginText: {
    textAlign: "center",
    fontSize: moderateScale(14),
    color: COLORS.gray2,
    marginBottom: scaleHeight(20),
    width: "100%",
  },
  loginLink: {
    color: "blue",
    fontWeight: "500",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: scaleHeight(16),
    width: "100%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.white,
  },
  dividerText: {
    marginHorizontal: scaleWidth(12),
    fontSize: moderateScale(13),
    color: COLORS.white,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    paddingVertical: scaleHeight(12),
    borderRadius: scaleWidth(8),
    borderWidth: 1,
    borderColor: COLORS.secondary4th,
    marginBottom: scaleHeight(16),
    width: "100%",
  },
  googleIcon: {
    width: scaleWidth(18),
    height: scaleWidth(18),
    marginRight: scaleWidth(8),
  },
  googleText: {
    fontSize: moderateScale(15),
    color: COLORS.black,
    fontWeight: "500",
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
});
