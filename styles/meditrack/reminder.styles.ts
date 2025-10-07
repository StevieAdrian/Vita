import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
    gap: 10,
  },
  leftColumn: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    flex: 1,
  } as const,
  title: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },
  subtitle: {
    color: COLORS.black,
    fontSize: 12,
    marginTop: 2,
    fontFamily: "Inter-Regular",
  },
  time: {
    color: COLORS.black,
    fontSize: 12,
    fontFamily: "Inter-Medium",
    marginTop: 2,
  },

  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: "rgba(29, 106, 255, 0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  completedText: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  repeatDays: {
    fontSize: 12,
    color: COLORS.gray1,
    marginTop: 2,
  },
  categoryDetail: {
    fontSize: 11,
    color: COLORS.gray1,
    fontStyle: "italic",
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
});
