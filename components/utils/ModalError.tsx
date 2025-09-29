import { styles } from "@/styles/utils/modal-error.styles";
import { ModalProps } from "@/types/modal";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

export default function ModalError({
  visible,
  title,
  description,
  buttonText,
  onClose,
}: ModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image
            source={require("@/assets/utilsIcon/error-icon.png")}
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
  );
}
