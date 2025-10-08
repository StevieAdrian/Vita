import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const NAV_ITEMS = 107;

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: NAV_ITEMS,
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: COLORS.white,
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: -2 },
    elevation: 12,
  },
  item: {
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 4,
    alignItems: "flex-end",
    resizeMode: "contain",
  },
  label: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: COLORS.black,
  },
  activeLabel: {
    color: COLORS.primary,
    fontFamily: "Inter-Medium",
  },
  notesItem: {
    marginTop: -35,
  },
  notesIcon: {
    width: 65,
    height: 70,
    marginBottom: 0,
  },
  notesLabel: {
    paddingTop: 11,
  },
});
