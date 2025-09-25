import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  leftColumn: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    flex: 1,
  } as const,
  iconWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 8,
  },
  title: {
    color: COLORS.black,
    fontSize: 15,
    fontFamily: "Inter-SemiBold",
  },
  subtitle: {
    color: "rgba(31, 41, 55, 0.7)",
    fontSize: 13,
    marginTop: 2,
    fontFamily: "Inter-Regular",
  },
  time: {
    color: COLORS.black,
    fontSize: 13,
    fontFamily: "Inter-Medium",
    marginTop: 6,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: "rgba(29, 106, 255, 0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
});
