import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  reminderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    // Contoh warna latar belakang seperti yang ada di screenshot:
    // Anda harus menyesuaikan berdasarkan data reminder.color
  },
  reminderContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  reminderTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  reminderTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#ccc",
    backgroundColor: "transparent",
  },
  iconBackground: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});
