import { DRUG_CATEGORIES } from "@/constants/drugs";
import { styles } from "@/styles/meditrack/drug-category.styles";
import { toggleCategorySelection } from "@/utils/drug-categoryValidation";
import type React from "react";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import PopUpForm from "./popup-form";

interface DrugsCategoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (selectedCategories: string[]) => void;
  initialCategories?: string[];
}

const DrugsCategoryModal: React.FC<DrugsCategoryModalProps> = ({
  isVisible,
  onClose,
  onApply,
  initialCategories = [],
}) => {
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);

  useEffect(() => {
    setSelectedCategories(initialCategories);
  }, [initialCategories]);

  const handleApply = () => {
    onApply(selectedCategories);
    onClose();
  };

  const getSelectedLabels = () => {
    return selectedCategories.map((value) => {
      const category = DRUG_CATEGORIES.find((cat) => cat.value === value);
      return category ? category.label : value;
    });
  };

  return (
    <PopUpForm
      isVisible={isVisible}
      onClose={onClose}
      title="Choose Category"
      options={DRUG_CATEGORIES.map((cat) => cat.label)}
      selectedOptions={selectedCategories}
      onSelectOption={(categoryValue) =>
        toggleCategorySelection(
          categoryValue,
          selectedCategories,
          setSelectedCategories
        )
      }
    >
      <ScrollView style={styles.optionsContainer}>
        {DRUG_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.value}
            style={styles.optionRow}
            onPress={() =>
              toggleCategorySelection(
                category.value,
                selectedCategories,
                setSelectedCategories
              )
            }
          >
            <Text style={styles.optionText}>{category.label}</Text>
            <View
              style={[
                styles.checkbox,
                selectedCategories.includes(category.value) &&
                  styles.checkedCheckbox,
              ]}
            ></View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </PopUpForm>
  );
};

export default DrugsCategoryModal;
