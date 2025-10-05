import { COLORS } from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.primary,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    scrollContent: {
        paddingHorizontal: 35,
        paddingBottom: 24,
        flexGrow: 1,
    },
    header: {
        width: "100%",
    },
    containerHealthWarning: {
        width: "100%",
        height: "auto",
        backgroundColor: COLORS.red3rd,
        borderColor: COLORS.red,
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 15,
    },
    descHealthWarning: {
        color: COLORS.black,
        fontFamily: "Inter-Regular",
        fontSize: 14,
        paddingBottom: 10,
    },
    titleHealth: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    containerDigit: {
        flexDirection: "row",
        gap: 20,
        paddingVertical: 10,
        alignItems: "center",
    },
    titleDigitBio: {
        color: COLORS.black,
        fontFamily: "Inter-SemiBold",
        fontSize: 16,
    },
    warningCard: {
        width: "100%",
        backgroundColor: COLORS.red4th,
        borderColor: COLORS.red2nd,
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
        marginVertical: 10,
    },
    goodCard: {
        width: "100%",
        backgroundColor: COLORS.secondary4th,
        borderColor: COLORS.secondary,
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
        marginVertical: 10,
    },
    warningHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        gap: 10,
    },
    warningIcon: {
        width: 28,
        height: 28,
    },
    warningTitle: {
        fontFamily: "Inter-SemiBold",
        fontSize: 16,
        color: COLORS.black,
    },
    warningStatus: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        color: COLORS.red,
    },
    goodStatus: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        color: COLORS.tosca,
    },
    warningBody: {
        fontFamily: "Inter-Regular",
        fontSize: 14,
        color: "#000",
        marginBottom: 12,
    },
    warningFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    warningRisk: {
        fontFamily: "Inter-Regular",
        fontSize: 14,
        color: COLORS.black,
    },
    warningBadge: {
        borderWidth: 1,
        borderColor: COLORS.red,
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 6,
    },
    warningBadgeText: {
        color: "#FF4D4F",
        fontFamily: "Inter-SemiBold",
        fontSize: 13,
    },

    // health statistcs
    statsCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginVertical: 12,
    },
    statsHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    statsIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    statsTitle: {
        fontFamily: "Inter-SemiBold",
        fontSize: 16,
        color: COLORS.black,
    },
    statsSummary: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    statsBox: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 10,
        flex: 1,
        alignItems: "center",
        paddingVertical: 12,
        marginHorizontal: 8,
    },
    statsBoxValue: {
        fontSize: 20,
        fontFamily: "Inter-SemiBold",
        color: COLORS.black,
    },
    statsBoxLabel: {
        fontSize: 13,
        fontFamily: "Inter-Regular",
        color: COLORS.black,
    },
    statsSubtitle: {
        fontSize: 14,
        fontFamily: "Inter-SemiBold",
        marginBottom: 8,
    },
    statsRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    statsLabel: {
        width: 110,
        fontSize: 14,
        fontFamily: "Inter-Regular",
        color: COLORS.black,
    },
    statsProgressWrapper: {
        width: 100,
        // flexBasis: 10,
        height: 16,
        backgroundColor: COLORS.gray5,
        borderRadius: 10,
        overflow: "hidden",
        marginLeft: 50,
        marginRight: 12,
    },
    statsProgressBar: {
        height: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 6,
    },
    statsStatus: {
        flex: 0.5,
        fontSize: 13,
        fontFamily: "Inter-Regular",
        color: "#000",
    },

    // future health
    futureCard: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        marginVertical: 12,
    },
    futureTitle: {
        fontFamily: "Inter-SemiBold",
        fontSize: 16,
        color: COLORS.black,
    },
    futureSubtitle: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        color: COLORS.black,
        marginBottom: 16,
    },
    futureRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    futureLabel: {
        fontFamily: "Inter-Regular",
        fontSize: 14,
        color: COLORS.black,
    },
    futureBadge: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 30,
    },
    futureBadgeText: {
        fontFamily: "Inter-SemiBold",
        fontSize: 12,
        color: COLORS.black,
    },
    futureBadgeWarning: {
        borderColor: COLORS.yellow2nd,
        backgroundColor: COLORS.white,
    },
    futureBadgeTextWarning: {
        color: COLORS.black,
    },
    recommendBox: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 8,
        padding: 12,
        marginTop: 16,
        backgroundColor: COLORS.primary5th,
    },
    recommendTitle: {
        fontFamily: "Inter-SemiBold",
        fontSize: 14,
        marginBottom: 6,
        color: COLORS.black,
    },
    recommendItem: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        color: COLORS.black,
        marginBottom: 4,
    },
    barContainer: {
        backgroundColor: COLORS.white, 
        borderRadius: 12, 
        padding: 16, 
        marginBottom: 16
    },
    barTitle: {
        fontSize: 18, 
        fontWeight: "700", 
        marginBottom: 8 
    },
    barNumber: {
        fontSize: 28, 
        fontWeight: "800", 
        marginBottom: 16 
    },
    highestText: {
        color: "gray", 
        marginTop: 12
    },
    bpContainer: {
        backgroundColor: COLORS.white, 
        borderRadius: 12, 
        padding: 16, 
        marginBottom: 16 
    },
    bpTitle: {
        fontSize: 18, 
        fontWeight: "700", 
        marginBottom: 8
    },
    bpInnerContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        marginBottom: 12
    },
    bpStatus: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginLeft: 8,
    }
})