import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1A73E8",
    },
    welcomeImage: {
        width: "70%", 
        marginLeft: 30,
        resizeMode: "contain" as const,
    }
});