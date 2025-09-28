import { Image, Modal, View, Text, TouchableOpacity } from "react-native";
import { ModalProps } from "@/types/modal"
import { styles } from "@/styles/modal-success.styles";

export default function ModalSuccess({visible, title, description, buttonText, onClose}: ModalProps) {
    return (
        <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                <Image
                    source={require("@/assets/utilsIcon/success-icon.png")}
                    style={styles.icon}
                    resizeMode="contain"
                />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>

                <TouchableOpacity style={styles.button} onPress={onClose}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}