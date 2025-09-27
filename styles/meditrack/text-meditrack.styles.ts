import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter-Bold",
  },
  subtitle: {
    color: COLORS.primary,
    fontSize: 13,
    fontFamily: "Inter-Bold",
  },
  subtext: {
    color: COLORS.black,
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  caret: {
    marginLeft: 6,
    color: COLORS.black,
    fontSize: 13,
    fontWeight: "500",
  },
});
