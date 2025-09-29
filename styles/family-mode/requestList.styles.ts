import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background2nd,
  },
  header: {
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  label: {
    fontSize: 13,
    color: "gray",
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    marginBottom: 4,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },
  declineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: "center",
  },
  acceptText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  declineText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary,
    borderColor: COLORS.primary,
  },
  actionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: {
    width: 14,
    height: 14,
    marginRight: 6,
  },
  actionIconDecline: {
    width: 12,
    height: 12,
    marginRight: 6,
    tintColor: COLORS.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 16,
  },
  modalYesBtn: {
    width: "100%",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  modalYesText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalNoBtn: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  modalNoText: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "600",
  },
});
