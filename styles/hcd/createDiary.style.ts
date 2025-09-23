import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    flex: 1,
    backgroundColor: COLORS.background2nd,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#E9F3FF",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: COLORS.background2nd,
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    width: 369,
    // minHeight: "100%",
    borderRadius: 10,
    shadowColor: "#D7D7D7",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 32,
  },
});
