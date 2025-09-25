import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dashboardContainer: {
    backgroundColor: COLORS.background2nd,
    flex: 1,
    paddingHorizontal: 20,
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
    backgroundColor: COLORS.background2nd,
  },
  greetings: {
    color: COLORS.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 28,
    paddingBottom: 20,
  },
  greetingsContainer: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  greetingsBlue: {
    color: COLORS.primary,
    fontFamily: "Inter-SemiBold",
    fontSize: 28,
    paddingBottom: 20,
  },
  dateBg: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    zIndex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  icon: {
    transform: [{ rotate: "180deg" }],
  },
  subtitle: {
    color: COLORS.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
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
    color: COLORS.black,
    fontFamily: "Inter-Medium",
    fontSize: 14,
  },
  reminderText: {
    color: COLORS.primary,
    fontFamily: "Inter-Medium",
    fontSize: 14,
  },
  reminderListContainer: {
    marginTop: 10,
    gap: 12, // Jarak antar item
  },
  containerReminder: {
    marginVertical: 20,
    gap: 5,
    paddingHorizontal: 10,
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
    backgroundColor: COLORS.red3rd,
    borderColor: COLORS.red,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 15,
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
  },
  containerHealthAmount: {
    width: 160,
    height: 71,
    backgroundColor: COLORS.secondary5th,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  containerAlertAmount: {
    width: 160,
    height: 71,
    backgroundColor: COLORS.red3rd,
    borderColor: COLORS.red,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
