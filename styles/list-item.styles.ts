import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#fff",
        borderRadius: 14,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    leftIcon: { 
        width: 22, 
        height: 24, 
        marginRight: 16, 
        resizeMode: "contain" 
    },
    texts: { 
        flex: 1 
    },
    title: { 
        fontSize: 16, 
        fontWeight: "600",
        color: "#111827" 
    },
    subtitle: { 
        marginTop: 2, 
        fontSize: 13, 
        color: "#6B7280" 
    },
    chevron: { 
        width: 14, 
        height: 16, 
        marginLeft: 8, 
        tintColor: "#9CA3AF", 
        resizeMode: "contain" 
    },
});
