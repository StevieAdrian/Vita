import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 50,
    paddingBottom: 25,
  },
  notifications: {},
  leftSide: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  profilePict: {
    backgroundColor: COLORS.white,
    borderRadius: 41,
    borderColor: COLORS.white,
    borderWidth: 2,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  amountNotif: {
    position: "absolute",
    top: -3,
    left: -7,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 41,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textNotif: {
    color: COLORS.white,
    fontFamily: "Inter-Regular",
    fontSize: 12,
  },
  textHeader: {
    color: COLORS.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 24,
  },
});
