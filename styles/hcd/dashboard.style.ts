import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.background2nd,
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
    marginHorizontal: 20,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  greetings: {
    color: COLORS.black,
    fontFamily: "Inter-Regular",
    fontSize: 16,
  },
  greetingsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 1,
  },
  greetingsBlue: {
    color: COLORS.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 28,
    paddingBottom: 20,
  },
  dateBg: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    zIndex: 1,
    paddingVertical: 10,

    marginBottom: 10,
  },
  icon: {
    transform: [{ rotate: "180deg" }],
  },
  subtitle: {
    color: COLORS.white,
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  captionSubtitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subtitleContainerText: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  seeAllContainer: {
    color: COLORS.white,
    fontFamily: "Inter-Regular",
    fontSize: 14,
  },
  reminderText: {
    color: COLORS.white,
    fontFamily: "Inter-Regular",
    fontSize: 12,
  },
  reminderListContainer: {
    marginTop: 10,
    gap: 12,
  },
  containerReminder: {
    gap: 5,
  },
  remCont: {
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },

  containerContent: {
    marginTop: 15,
    gap: 5,
  },
  reminderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },

  // DIgit BioMarker
  containerDigit: {
    flexDirection: "row",
    gap: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  titleDigitBio: {
    color: COLORS.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  titleDigitWarning: {
    color: COLORS.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  captionDigitBio: {
    color: COLORS.black,
    fontFamily: "Inter-Regular",
    fontSize: 14,
  },
  containerTitle: {
    gap: 2,
  },
  containerAllDigitBio: {
    width: "100%",
    height: 250,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  squaresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 30,
    paddingVertical: 10,
  },
  subSquareContainer: {
    gap: 10,
  },
  captionNumber: {
    color: COLORS.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
  },
  captionName: {
    color: COLORS.black,
    fontFamily: "Inter-Medium",
    fontSize: 12,
  },
  bulletin: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
  },
  containerStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  latestText: { color: COLORS.gray1, fontFamily: "Inter-Medium", fontSize: 14 },
  updateButton: {
    width: 110,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textUpdate: {
    color: COLORS.white,
    fontFamily: "Inter-Medium",
    fontSize: 14,
  },
  LatestContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  // Health Diary Warning
  containerHealthWarning: {
    width: "100%",
    height: "auto",
    backgroundColor: COLORS.red4th,
    borderColor: COLORS.red,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  descHealthWarning: {
    color: COLORS.black,
    fontFamily: "Inter-Regular",
    fontSize: 14,
    paddingBottom: 10,
  },
  titleHealth: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Family Mode
  amountNum: {
    color: COLORS.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  amountCat: {
    color: COLORS.black,
    fontFamily: "Inter-Regular",
    fontSize: 14,
  },
  membersNum: {
    color: COLORS.gray2,
    fontFamily: "Inter-Medium",
    fontSize: 14,
    paddingTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray3,
    width: "100%",
    marginVertical: 12,
  },
  containerAmount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    width: "100%",
  },
  containerHealthAmount: {
    width: "47%",
    height: 71,
    backgroundColor: COLORS.secondary5th,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  containerAlertAmount: {
    width: "47%",
    height: 71,
    backgroundColor: COLORS.red3rd,
    borderColor: COLORS.red,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  reminderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray3,
    width: "100%",
    backgroundColor: "white",
    overflow: "hidden",
  },
  reminderTimesCard: {
    alignItems: "flex-start",
  },
  reminderTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  reminderCardS: {
    marginLeft: 8,
    justifyContent: "flex-start",
    width: "60%",
  },
  seeAllReminder: {
    color: COLORS.primary,
    fontFamily: "Inter-Medium",
    fontSize: 14,
    paddingVertical: 10,
  },
  contIsi: {
    width: "100%",
  },
});
