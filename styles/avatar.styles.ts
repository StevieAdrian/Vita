import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
    container: {
        position: "relative",
        alignSelf: "center",
        marginVertical: 16,
    },
    avatar: {
        backgroundColor: COLORS.background2nd,
    },
    cameraButton: {
        position: "absolute",
        bottom: 5,
        right: 5,
        backgroundColor: "#4F46E5",
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
});
