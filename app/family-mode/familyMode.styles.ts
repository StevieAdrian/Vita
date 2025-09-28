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
        paddingHorizontal: 25,
        paddingBottom: 24,
        paddingTop: 14,
        flexGrow: 1,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.gray4,
        marginVertical: 8,
    },
    requestContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
    },
    requestTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    requestSubtitle: {
        fontSize: 14,
        color: COLORS.gray2,
    },
    chevron: {
        width: 14,
        height: 16,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: 12,
        paddingBottom: 14,
        backgroundColor: COLORS.background2nd,
    },
    textHeader: {
        color: COLORS.black,
        fontFamily: "Inter-SemiBold",
        fontSize: 24,
    },
    imageContainer: {
        flexDirection: "row",
        gap: 20,
    },
    memberIcon: {
        width: 14,
        height: 16,
    },
    memberCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    memberHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    memberAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    memberName: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.black,
    },
    memberRelation: {
        fontSize: 14,
        color: COLORS.gray2,
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    statBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
        marginRight: 6,
    },
    statValue: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.black,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.gray2,
    },
    alertRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    alertIcon: {
        width: 14,
        height: 14,
        marginRight: 4,
        tintColor: "red",
    },
    alertText: {
        fontSize: 13,
        color: "red",
        fontWeight: "500",
    },
    monitorBtn: {
        width: "100%",
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    monitorBtnText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },
})