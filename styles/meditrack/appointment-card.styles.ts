import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 12,
  },
  leftColumn: {
    flexDirection: "row",
    gap: 12,
    flex: 1,
  },
  iconWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  infoWrapper: {
    flex: 1,
  },
  title: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  subtitle: {
    color: "rgba(31, 41, 55, 0.7)",
    fontSize: 13,
    marginTop: 2,
    fontFamily: "Inter-Regular",
  },
  metaRow: {
    flexDirection: "row",
    marginTop: 12,
    flexWrap: "wrap",
    gap: 12,
  },
  metaBlock: {
    minWidth: 92,
  },
  metaLabel: {
    fontSize: 12,
    color: "rgba(31, 41, 55, 0.6)",
    fontFamily: "Inter-Regular",
  },
  metaValue: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.black,
    marginTop: 2,
    fontFamily: "Inter-SemiBold",
  },
  cta: {
    alignSelf: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  ctaLabel: {
    color: COLORS.black,
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
});
