import { styles } from "@/styles/meditrack/popup-form.styles";
import React from "react";
import { Ionicons } from "react-native-vector-icons";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface PopUpFormProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  options?: string[];
  selectedOptions?: string[];
  onSelectOption?: (option: string) => void;
}

const PopUpForm: React.FC<PopUpFormProps> = ({
  isVisible,
  onClose,
  title,
  children,
  options = [],
  selectedOptions = [],
  onSelectOption = () => {},
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default PopUpForm;
