import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingIcon: {
    width: 80,
    height: 80,
    tintColor: COLORS.white,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "600",
  },
});
