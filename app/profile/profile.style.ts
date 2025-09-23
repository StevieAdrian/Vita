import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background2nd,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: 50,
  },
  arrowButton: {
    position: "absolute",
    left: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  arrowImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  center: {
    alignItems: "center",
    marginTop: 16,
  },
  name: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.black,
  },
  username: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.gray1,
  },
  downloadBtn: {
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.primary2nd,
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
    fontWeight: "600",
  },
});
