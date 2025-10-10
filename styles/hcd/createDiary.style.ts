import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    backgroundColor: COLORS.background2nd,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#E9F3FF",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
  container: { width: "100%", paddingHorizontal: 16 },
  formContainer: {
    alignItems: "flex-start",
    backgroundColor: COLORS.white,
    maxWidth: 369,
    borderRadius: 10,
    shadowColor: "#D7D7D7",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  calenderContainer: {
    marginTop: 10,
    borderColor: COLORS.gray3,
    borderWidth: 1,
    borderRadius: 10,
  },
  titleForm: {
    width: "80%",
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    textAlign: "left",
    color: COLORS.black,
  },
  formHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  text: {
    fontSize: 18,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray3,
    width: "100%",
    marginVertical: 12,
  },

  subformContainer: {
    gap: 10,
    marginTop: 10,
    width: "100%",
  },

  subtitle: {
    color: COLORS.primary,
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    textAlign: "left",
  },

  inputTitle: {
    color: COLORS.black,
    fontFamily: "Inter-Medium",
    fontSize: 16,
    textAlign: "left",
  },

  shadowContent: {
    color: COLORS.gray1,
    fontFamily: "Inter-Regular",
    fontSize: 14,
  },

  separatedInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    flexWrap: "wrap",
  },

  bottomInputCont: {
    gap: 10,
  },

  halfInput: {
    width: "100%",
    height: 44,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 4,
    borderWidth: 0.497,
    borderColor: COLORS.gray2,
  },

  fullInput: {
    height: 44,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 0.497,
    borderColor: COLORS.gray2,
  },

  descInput: {
    height: 78,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 0.497,
    borderColor: COLORS.gray2,
    textAlignVertical: "top",
    minHeight: 78,
  },

  fullContainer: {
    gap: 10,
    width: "100%",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
  },
  inputGroup: {
    flex: 1,
    maxWidth: "48%",
    gap: 10,
  },
});
