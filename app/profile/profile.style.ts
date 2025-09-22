import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "white"
    },
    titleContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        width: "100%", 
        paddingTop: 50 
    },
    arrowButton: {
        position: "absolute",
        left: 15,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    arrowImage: {
        width: 20,  
        height: 20, 
        resizeMode: "contain",
    },
    title: {
        fontSize: 18, 
        fontWeight: "bold",
        textAlign: "center", 
        flex: 1
    }
})
