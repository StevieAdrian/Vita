import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background2nd,
    },
    header: {
        width: "100%",
    },
    scrollWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    formContainer: {
        borderRadius: 10,
        shadowColor: "#D7D7D7",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    bottomInputCont: {
        gap: 10,
    },
    inputTitle: {
        color: COLORS.black,
        fontFamily: "Inter-Medium",
        fontSize: 16,
        textAlign: "left",
    },
    separatedInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 15,
    },
    bpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 15,
    },
    bpInputWrapper: {
        flex: 1,
    },
    bpInput: {
        height: 44,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: COLORS.gray2,
        backgroundColor: COLORS.white,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    bpLabel: {
        marginTop: 4,
        color: COLORS.gray1,
        fontFamily: "Inter-Regular",
        fontSize: 14,
    },
    shadowContent: {
        color: COLORS.gray1,
        fontFamily: "Inter-Regular",
        fontSize: 14,
    },
    fullInput: {
        width: "100%",
        height: 44,
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 4,
        borderWidth: 0.497,
        borderColor: COLORS.gray2,
        backgroundColor: COLORS.white,
        marginBottom: 5,
        marginTop: 1,
    },
})