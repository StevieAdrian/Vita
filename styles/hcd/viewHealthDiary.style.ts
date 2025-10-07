import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dashboardContainer: {
    backgroundColor: COLORS.background2nd,
    flex: 1,
    paddingHorizontal: 15,
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
  dateBg: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    zIndex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  containerReminder: {
    marginTop: 20,
    gap: 5,
  },
  containerContent: {
    backgroundColor: COLORS.white,
    marginVertical: 20,
    width: "100%",
    height: 460,
    borderRadius: 10,
    gap: 5,
  },
  containerContentDiary: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    width: "100%",
    height: "auto",
    borderRadius: 10,
  },

  emptyText: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 14,
    color: COLORS.white,
    fontFamily: "Inter-Regular",
  },
  containerContentEmpty: {
    alignItems: "center",
    marginTop: 4,
  },

  createButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  createButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: "Inter-Medium",
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
    color: COLORS.primary,
    fontFamily: "Inter-Medium",
    fontSize: 16,
  },
  seeAllReminder: {
    color: COLORS.primary,
    fontFamily: "Inter-Medium",
    fontSize: 14,
    paddingVertical: 10,
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
  icon: {
    transform: [{ rotate: "180deg" }],
  },
  reminderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
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

  containerAllDigitBio: {
    width: "100%",
    height: 250,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  titleHealth: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerDigit: {
    flexDirection: "row",
    gap: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  captionDigitBio: {
    color: COLORS.gray1,
    fontFamily: "Inter-Regular",
    fontSize: 14,
  },
  containerTitle: {
    gap: 2,
  },
  titleDigitBio: {
    color: COLORS.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },

  // Kotak

  squaresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 10,
  },
  subSquareContainer: {
    gap: 10,
  },
  captionNumber: {
    color: COLORS.gray1,
    fontFamily: "Inter-Medium",
    fontSize: 12,
  },
  captionName: {
    color: COLORS.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
  },
  captCont: {
    flexDirection: "row",
    gap: 5,
    alignItems: "flex-end",
  },
  captCont1: {
    gap: 5,
  },
  bulletin: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
  },
  containerStatus: {
    flexDirection: "row",
    gap: 20,
    width: 150,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.secondary5th,
    borderColor: COLORS.secondary,
    borderRadius: 5,
    borderWidth: 1,
  },
  //   Form
  containerForm: { gap: 15, width: "100%" },
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
    textAlignVertical: "top",
    minHeight: 78,
    borderColor: COLORS.gray3,
  },
  formContainer: {
    alignItems: "flex-start",
    backgroundColor: COLORS.white,
    width: "100%",
    borderRadius: 10,
    shadowColor: "#D7D7D7",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    paddingHorizontal: 17,
    paddingVertical: 25,
    flex: 1,
  },
  contentContainer: {
    width: "100%",
    marginTop: 20,
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

  // Latest Update
  LatestContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  latestText: {
    color: COLORS.gray1,
    fontFamily: "Inter-Regular",
    fontSize: 14,
    marginTop: 2,
  },
  // Schedule Card
  reminderCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
  },
  reminderTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  }, // --- Reminder Row ---
  reminderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray3,
    width: "100%",
  },

  reminderCardS: {
    flex: 1,
    marginLeft: 8,
    justifyContent: "flex-start",
  },
  reminderTimesCard: {
    alignItems: "flex-start",
  },
  section: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,

    paddingVertical: 30,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scheduleCont: {
    marginTop: 15,
  },

  // Reminder Page All
  container: { flex: 1 },
  headerContainer: {
    width: "100%",
    backgroundColor: COLORS.background2nd,
  },
});
