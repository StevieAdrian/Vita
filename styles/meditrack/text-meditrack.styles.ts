import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subText: {
    gap: 2,
  },
  title: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
  },
  subtitle: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  subtext: {
    color: COLORS.black,
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
