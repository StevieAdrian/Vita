import { REPEAT_DAYS } from "@/constants/drugs";
import { styles } from "@/styles/meditrack/drug-repeat.styles";
import { toggleDaySelection } from "@/utils/drug-repeatValidation";
import type React from "react";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import PopUpForm from "./PopUpForm";

interface DrugRepeatModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (selectedDays: string[]) => void;
  initialRepeatDays?: string[];
}

const DrugRepeatModal: React.FC<DrugRepeatModalProps> = ({
  isVisible,
  onClose,
  onApply,
  initialRepeatDays = [],
}) => {
  const [selectedDays, setSelectedDays] = useState<string[]>(initialRepeatDays);

  useEffect(() => {
    setSelectedDays(initialRepeatDays);
  }, [initialRepeatDays]);

  const handleApply = () => {
    onApply(selectedDays);
    onClose();
  };

  return (
    <PopUpForm
      isVisible={isVisible}
      onClose={onClose}
      title="Repeat"
      options={REPEAT_DAYS.map((day) => day.label)}
      selectedOptions={selectedDays}
      onSelectOption={(dayValue) =>
        toggleDaySelection(dayValue, selectedDays, setSelectedDays)
      }
    >
      <ScrollView style={styles.optionsContainer}>
        {REPEAT_DAYS.map((day) => (
          <TouchableOpacity
            key={day.value}
            style={styles.optionRow}
            onPress={() =>
              toggleDaySelection(day.value, selectedDays, setSelectedDays)
            }
          >
            <Text style={styles.optionText}>{day.label}</Text>
            <View
              style={[
                styles.checkbox,
                selectedDays.includes(day.value) && styles.checkedCheckbox,
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

export default DrugRepeatModal;
