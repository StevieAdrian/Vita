import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        backgroundColor: "#1A73E8",
    },
    container: {
        flex: 1,
        backgroundColor: "#1A73E8",
        alignItems: "center",
    },
    welcomeImage: {
        width: "70%", 
        resizeMode: "contain",
        alignSelf: "flex-start",    
        marginLeft: 30,          
        marginBottom: -50,
    },
    boxContainer: {
        width: "85%",
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
    },
    continueButton: {
        backgroundColor: "black",
        width: "100%",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    continueText: {
        color: "white",
        fontSize: 16,
        fontWeight: 400,
    },
    signupText: {
        fontSize: 13,
        color: "black",
        marginTop: 15,
    },
    signupLink: {
        color: "blue",
        fontWeight: "bold",
    },
    dividerWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
        width: "70%",       
        alignSelf: "center",
    },
    divider: {
        flex: 1,
        height: 1.5,
        backgroundColor: "white",
    },
    dividerText: {
        marginHorizontal: 10,
        color: "white",
        fontSize: 14,
    },
    googleButton: {
        width: "70%",
        height: 50,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
    googleLogo: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
});