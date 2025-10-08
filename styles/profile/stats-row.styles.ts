import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
  },
  box: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: COLORS.primary5th,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
    paddingVertical: 12,
  },
  value: {
    fontSize: 16,
    fontFamily: "Inter-Semibold",
    color: COLORS.black,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: "Inter-Regular",
    color: COLORS.gray2,
  },
});
