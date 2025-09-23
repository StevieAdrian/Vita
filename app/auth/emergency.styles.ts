import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const scaleWidth = (size) => (width / 375) * size;
const scaleHeight = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scaleWidth(size) - size) * factor;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4285F4",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: scaleHeight(20),
  },
  header: {
    backgroundColor: "#4285F4",
    paddingTop: scaleHeight(50),
    paddingHorizontal: scaleWidth(25),
    paddingBottom: scaleHeight(30),
    alignItems: "center",
    minHeight: height * 0.3,
    justifyContent: "center",
  },
  logo: {
    width: scaleWidth(35),
    height: scaleWidth(35),
    marginBottom: scaleHeight(20),
    tintColor: "white",
    alignSelf: "center",
  },
  title: {
    fontSize: width < 375 ? scaleWidth(28) : scaleWidth(32),
    fontWeight: "bold",
    color: "white",
    marginBottom: scaleHeight(20),
    textAlign: "center",
    width: "100%",
    lineHeight: scaleHeight(38),
  },
  progressBarContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: scaleHeight(30),
    paddingHorizontal: scaleWidth(20),
  },
  progressBar: {
    height: scaleHeight(8),
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: scaleHeight(4),
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: scaleHeight(4),
    width: "80%",
  },
  formWrapper: {
    alignItems: "center",
    width: "100%",
  },
  formContainer: {
    backgroundColor: "white",
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(24),
    width: width - scaleWidth(40),
    marginHorizontal: scaleWidth(20),
    borderRadius: scaleWidth(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: scaleHeight(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: scaleWidth(4),
    elevation: 3,
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: "#333",
    marginBottom: scaleHeight(20),
    textAlign: "left",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    fontWeight: "500",
  },
  required: {
    color: "red",
  },
  dropdownWrapper: {
    width: "100%",
    marginBottom: 15,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: scaleHeight(12),
    minHeight: scaleHeight(48),
    borderRadius: scaleWidth(8),
  },
  dropdownButtonActive: {
    borderColor: "#4285F4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownText: {
    fontSize: moderateScale(15),
    color: "#333",
  },
  placeholderText: {
    color: "#999",
  },
  dropdownMenu: {
    marginTop: scaleHeight(6),
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  dropdownScroll: {
    maxHeight: scaleHeight(200),
  },
  dropdownOption: {
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(12),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownOptionLast: {
    borderBottomWidth: 0,
  },
  dropdownOptionActive: {
    backgroundColor: "#F0F4FF",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dropdownOptionText: {
    fontSize: moderateScale(15),
    color: "#333",
  },
  continueButton: {
    backgroundColor: "#000",
    paddingVertical: scaleHeight(14),
    borderRadius: scaleWidth(6),
    alignItems: "center",
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(16),
    width: "100%",
  },
  continueText: {
    color: "white",
    fontSize: moderateScale(15),
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 8,
    textAlign: "left",
  },
});
