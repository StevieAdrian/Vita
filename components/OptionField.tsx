import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { allergicOptionStyles as styles } from "../styles/options.style";

interface OptionFieldProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  type?: "checkbox" | "radio";
}

const OptionField: React.FC<OptionFieldProps> = ({
  label,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.optionButton, isSelected && styles.selectedOption]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.optionContent}>
        <View style={[styles.checkbox, isSelected && styles.checkedBox]}>
          {isSelected && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text
          style={[styles.optionText, isSelected && styles.selectedOptionText]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OptionField;