import { StyleSheet } from "react-native";

export const NAV_ITEMS = 64;

export const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: NAV_ITEMS,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
        zIndex: 10,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: -2 },
        elevation: 12,
    },
    item: { 
        alignItems: "center", 
        flex: 1 
    },
    icon: { 
        width: 24, 
        height: 24, 
        marginBottom: 4, 
        resizeMode: "contain" 
    },
    label: { 
        fontSize: 12, 
        color: "#555" 
    },
    activeLabel: { 
        color: "#007bff", 
        fontWeight: "600" 
    },
});