import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background2nd,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0,
    zIndex: 1,
    height: 80,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.black,
    fontFamily: "Inter-Semibold",
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.background2nd,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  sectionHeaderWrapper: {
    marginBottom: 16,
  },
  remindersContainer: {
    gap: 12,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: 12,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray2,
    textAlign: "center",
    lineHeight: 24,
  },
});
