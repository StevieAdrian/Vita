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
  header: {
    width: "100%",
  },
  container: {
    flex: 1,
  },
  tabContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 16,
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
  }
});
