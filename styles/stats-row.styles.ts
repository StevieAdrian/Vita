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
    backgroundColor: COLORS.background2nd,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    paddingVertical: 12,
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.black,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.gray2,
  },
});
