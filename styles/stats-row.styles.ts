import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    row: { 
        flexDirection: "row",
        gap: 8,
    },
    box: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: "#F9FAFB",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        alignItems: "center",
        paddingVertical: 12,
    },
    value: { 
        fontSize: 18,
        fontWeight: "700", 
        color: "#111827" 
    },
    label: { 
        marginTop: 4, 
        fontSize: 12, 
        color: "#6B7280" 
    },
});
