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
        paddingHorizontal: 20,
        paddingBottom: 24,
        flexGrow: 1,
    },
    header: {
        width: "100%",
    },
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 16,
    },
    iconWrapper: {
        width: 44, 
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        marginTop: 2,
    },
    icon: {
        width: 32,
        height: 32,
        resizeMode: "contain",
    },
    contentWrapper: {
        flex: 1, 
        marginRight: 8,
    },
    message: {
        fontSize: 14,
        color: "#1F2937",
        flexWrap: "wrap",
    },
    time: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
    },    
    outerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        flex: 1,
        paddingHorizontal: 8,
        height: 40,
        marginRight: 8,
    },
    searchIcon: {
        marginRight: 4,
        width: 12, 
        height: 12,
        alignItems: "center", 
        marginHorizontal: 6,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: "#1F2937",
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "left",
        justifyContent: "space-between",
        backgroundColor: COLORS.primary4th,
        borderRadius: 8,
        width: 120,
        paddingHorizontal: 12,
        height: 40,
        minWidth: 70,
    },
    filterText: {
        fontSize: 14,
        color: "#1F2937",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        width: "80%",
        padding: 16,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    modalItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    modalItemText: {
        fontSize: 14,
        color: "#1F2937",
    },
    applyButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        paddingVertical: 10,
        marginTop: 12,
        alignItems: "center",
    },
    applyButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "500",
    },
})