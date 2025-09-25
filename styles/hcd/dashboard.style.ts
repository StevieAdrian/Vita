import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dashboardContainer: {
    backgroundColor: COLORS.background2nd,
    flex: 1,
    paddingHorizontal: 20,
  },
  greetings: {
    color: COLORS.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 24,
    paddingBottom: 15,
  },
  dateBg: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    zIndex:1,
    paddingVertical:10,
    paddingHorizontal:20
  },
});
