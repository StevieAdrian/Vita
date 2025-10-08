import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray1,
    marginTop: 2,
  },
  footer: {
    marginTop: 12,
  },
});
