import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: 50,
    marginBottom: 37,
  },
  backButton: {
    position: "absolute",
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },

  title: {
    fontSize: 24,
    fontWeight: 600,
    textAlign: "center",
    flex: 1,
    fontFamily: "Inter-Regular",
  },
});
