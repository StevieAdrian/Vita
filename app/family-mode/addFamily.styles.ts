import { COLORS } from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const scaleWidth = (size: number) => (width / 375) * size;
const scaleHeight = (size: number) => (height / 812) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scaleWidth(size) - size) * factor;

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background2nd,
    },
    header: {
        width: "100%",
        paddingTop: 0,
        paddingVertical: 0,
    },
    scrollWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    dropdownWrapper: {
        width: "100%",
        marginBottom: 15,
    },
    label: {
        alignSelf: "flex-start",
        fontSize: 14,
        color: COLORS.black,
        marginBottom: 5,
        fontWeight: "500",
    },
    required: {
        color: COLORS.red,
    },
    dropdownButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray1,
        paddingHorizontal: 10,
        paddingVertical: scaleHeight(12),
        minHeight: scaleHeight(48),
        borderRadius: scaleWidth(8),
    },
    dropdownButtonActive: {
        borderColor: COLORS.primary,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dropdownText: {
        fontSize: moderateScale(15),
        color: COLORS.black,
    },
    placeholderText: {
        color: COLORS.black,
    },
    dropdownMenu: {
        marginTop: scaleHeight(6),
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray1,
        borderRadius: 8,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    dropdownScroll: {
        maxHeight: scaleHeight(200),
    },
    dropdownOption: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary5th,
    },
    dropdownOptionLast: {
        borderBottomWidth: 0,
    },
    dropdownOptionActive: {
        backgroundColor: COLORS.primary4th,
        borderRadius: 6,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    dropdownOptionText: {
        fontSize: moderateScale(15),
        color: COLORS.black,
    },
    otherInput: {
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        borderRadius: scaleWidth(12),
        paddingVertical: scaleHeight(14),
        paddingHorizontal: scaleWidth(16),
        fontSize: moderateScale(16),
        color: COLORS.black,
        shadowColor: COLORS.white,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 4,
        minHeight: scaleHeight(60),
    },
    reqNotes: {
        alignSelf: "flex-start",
        fontSize: 14,
        color: COLORS.black,
        marginBottom: 5,
        fontWeight: 500,
    },
})