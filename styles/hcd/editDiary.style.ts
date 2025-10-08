import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  mainContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    backgroundColor: COLORS.background2nd,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray3,
    width: "100%",
    marginVertical: 12,
  },
  formContainer: {
    alignItems: "flex-start",
    backgroundColor: COLORS.white,
    width: 369,
    borderRadius: 10,
    shadowColor: "#D7D7D7",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    paddingHorizontal: 17,
    paddingVertical: 25,
  },
  titleForm: {
    width: "80%",
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    textAlign: "left",
  },
  formHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  //   Form
  containerForm: { gap: 25, width: "100%" },
  flexInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: COLORS.black,
  },
  containerInput: {
    gap: 15,
  },
  descInput: {
    width: "100%",
    height: 78,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 0.497,
    borderColor: COLORS.gray2,
    textAlignVertical: "top",
    minHeight: 78,
  },
});
