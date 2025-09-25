import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dashboardContainer: {
    backgroundColor: COLORS.background2nd,
    flex: 1,
    paddingHorizontal: 20,
  },
  greetings: {
    color: COLORS.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 24,
    paddingBottom: 20,
  },
  dateBg: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    zIndex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  icon: {
    transform: [{ rotate: "180deg" }],
  },
  subtitle: {
    color: COLORS.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  captionSubtitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  subtitleContainerText: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  seeAllContainer: {
    color: COLORS.black,
    fontFamily: "Inter-Medium",
    fontSize: 14,
  },
  reminderText: {
    color: COLORS.primary,
    fontFamily: "Inter-Medium",
    fontSize: 14,
  },
  reminderListContainer: {
    marginTop: 10,
    gap: 12, // Jarak antar item
  },
  reminderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    // Contoh warna latar belakang seperti yang ada di screenshot:
    // Anda harus menyesuaikan berdasarkan data reminder.color
  },
});
