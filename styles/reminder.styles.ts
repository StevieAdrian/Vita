import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  leftColumn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  } as const,

  title: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },
  subtitle: {
    color: COLORS.black,
    fontSize: 12,
    marginTop: 2,
    fontFamily: "Inter-Regular",
  },
  time: {
    color: COLORS.black,
    fontSize: 12,
    fontFamily: "Inter-Medium",
    marginTop: 2,
  },
  icon: {
    transform: [{ rotate: "180deg" }],
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
