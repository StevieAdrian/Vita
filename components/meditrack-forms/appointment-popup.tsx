import { APPOINTMENT_CATEGORIES } from "@/constants/appointmentType";
import { styles } from "@/styles/meditrack/appointment-category.style";
import type React from "react";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import PopUpForm from "./popup-form";

interface AppointmentCategoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (selectedCategory: string) => void;
  initialCategory?: string;
}

const AppointmentCategoryModal: React.FC<AppointmentCategoryModalProps> = ({
  isVisible,
  onClose,
  onApply,
  initialCategory = "",
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const handleApply = () => {
    onApply(selectedCategory);
    onClose();
  };

  const getSelectedLabel = () => {
    const category = APPOINTMENT_CATEGORIES.find(
      (cat) => cat.value === selectedCategory
    );
    return category ? category.label : "";
  };

  return (
    <PopUpForm
      isVisible={isVisible}
      onClose={onClose}
      title="Choose Category"
      options={APPOINTMENT_CATEGORIES.map((cat) => cat.label)}
      selectedOptions={[getSelectedLabel()]}
      onSelectOption={(categoryValue) => setSelectedCategory(categoryValue)}
    >
      <ScrollView style={styles.optionsContainer}>
        {APPOINTMENT_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.value}
            style={styles.optionRow}
            onPress={() => setSelectedCategory(category.value)}
          >
            <Text style={styles.optionText}>{category.label}</Text>
            <View
              style={[
                styles.checkbox,
                selectedCategory === category.value && styles.checkedCheckbox,
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </PopUpForm>
  );
};

export default AppointmentCategoryModal;
