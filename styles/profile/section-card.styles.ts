import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.background2nd,
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        borderColor: COLORS.primary2nd,
    },
    header: { 
        marginBottom: 10 
    },
    title: { 
        fontSize: 14, 
        fontWeight: "600", 
        color: COLORS.black 
    },
    subtitle: { 
        fontSize: 12, 
        color: COLORS.gray2, 
        marginTop: 2 
    },
    footer: { 
        marginTop: 12 
    },
});