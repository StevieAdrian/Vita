import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    marginHorizontal: 4,
    flex: 1,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  inactiveTab: {
    backgroundColor: COLORS.white,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 14,
  },
});
