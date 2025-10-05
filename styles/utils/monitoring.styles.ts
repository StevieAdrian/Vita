import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const stylesMonitor = StyleSheet.create({
    banner: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 14,
        marginHorizontal: 0,
        marginTop: 16,
        width: "100%", 
        alignSelf: "center",
    }
})