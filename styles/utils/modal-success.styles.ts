import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter-SemiBold",
  },
  container: {
    width: "80%",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 35,
    alignItems: "center",
  },
  icon: {
    width: 64,
    height: 64,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: COLORS.primary,
    fontFamily: "Inter-Bold",
    marginBottom: 2,
  },
  description: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 35,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },
});
