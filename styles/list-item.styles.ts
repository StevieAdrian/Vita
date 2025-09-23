import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.background2nd,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  leftIcon: {
    width: 22,
    height: 24,
    marginRight: 16,
    resizeMode: "contain",
  },
  texts: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.gray1,
  },
  chevron: {
    width: 14,
    height: 16,
    marginLeft: 8,
    tintColor: COLORS.gray1,
    resizeMode: "contain",
  },
});
