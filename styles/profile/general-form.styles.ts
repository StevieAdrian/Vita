import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    marginVertical: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: "Inter-SemiBold",
    color: COLORS.black,
  },
  username: {
    marginTop: 2,
    fontSize: 16,
    color: COLORS.gray1,
  },
  downloadBtn: {
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  downloadIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: COLORS.white,
    resizeMode: "contain",
  },
  downloadText: {
    color: COLORS.white,
    fontFamily: "Inter-Regular",
    fontSize: 14,
  },
  choiceSettingContainer: {
    gap: 8,
    marginTop: 8,
  },
});
