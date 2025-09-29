import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter-SemiBold",
    },
    container: {
        width: "80%",
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
    },
    icon: {
        width: 64,
        height: 64,
        marginBottom: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FF0000",
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#FF0000",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 30,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "600",
    },
})