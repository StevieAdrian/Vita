import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dropdownText: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: COLORS.black,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 200,
    maxHeight: 300,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderColor: COLORS.gray2,
    borderWidth: 1,
  },
  monthItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray3,
  },
  monthText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: COLORS.black,
  },
  dropdownContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  label: { fontFamily: "Inter-Medium", fontSize: 16 },
  downloadIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    resizeMode: "contain",
  },
  dropdownBox: {
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 8,
    padding: 10,
    width: 200,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
