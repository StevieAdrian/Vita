import { COLORS } from "../constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    color: COLORS.black,
    marginRight: 4,
  },
  arrowIcon: {
    color: COLORS.black,
    fontWeight: "bold",
  },
  cardContainer: {
    gap: 12, 
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.gray3,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12, 
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDate: {
    fontSize: 14,
    color: COLORS.gray1,
    marginTop: 4,
  },
  detailButton: {
    backgroundColor: COLORS.white,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  detailButtonText: {
    color: COLORS.black,
    fontWeight: "bold",
  },
});
