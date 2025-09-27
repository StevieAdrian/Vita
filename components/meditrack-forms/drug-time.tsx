import { styles } from "@/styles/drug-time.styles";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface TimeDrugProps {
  onTimesChange?: (times: string[]) => void;
  initialTimes?: string[];
}

const TimeDrug: React.FC<TimeDrugProps> = ({
  onTimesChange,
  initialTimes = ["12:00"],
}) => {
  const [times, setTimes] = useState<string[]>(initialTimes);

  const handleTimeChange = (text: string, index: number) => {
    // Remove any non-digit characters except colon
    const cleanedText = text.replace(/[^\d:]/g, "");

    // Auto-format: add colon after 2 digits
    let formattedText = cleanedText;

    if (cleanedText.length === 2 && !cleanedText.includes(":")) {
      formattedText = cleanedText + ":";
    }

    // Prevent invalid formats (more than one colon, more than 5 chars total)
    if (formattedText.split(":").length > 2 || formattedText.length > 5) {
      return;
    }

    // Validate hours and minutes if complete
    if (formattedText.includes(":")) {
      const parts = formattedText.split(":");
      const hours = parseInt(parts[0]);
      const minutes = parts[1] ? parseInt(parts[1]) : 0;

      // Check if hours are valid (0-23)
      if (parts[0].length > 0 && (hours > 23 || hours < 0)) {
        return;
      }

      // Check if minutes are valid (0-59) - only if minutes part has content
      if (parts[1] && parts[1].length > 0 && (minutes > 59 || minutes < 0)) {
        return;
      }

      // Don't allow minutes to have more than 2 digits
      if (parts[1] && parts[1].length > 2) {
        return;
      }
    }

    // Update state
    const newTimes = [...times];
    newTimes[index] = formattedText;
    setTimes(newTimes);
    onTimesChange?.(newTimes);
  };

  const handleAddMoreTime = () => {
    const newTimes = [...times, "12:00"];
    setTimes(newTimes);
    onTimesChange?.(newTimes);
  };

  const handleRemoveTime = (index: number) => {
    if (times.length > 1) {
      const newTimes = times.filter((_, i) => i !== index);
      setTimes(newTimes);
      onTimesChange?.(newTimes);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What Time?</Text>

      <View style={styles.timesWrapper}>
        {times.map((time, index) => (
          <View key={index} style={styles.timeInputContainer}>
            <TextInput
              style={styles.timeInputField}
              value={time}
              onChangeText={(text) => handleTimeChange(text, index)}
              placeholder="12:00"
              keyboardType="numeric"
              maxLength={5}
            />
            <Ionicons
              name="time-outline"
              size={18}
              color="#8E8E93"
              style={styles.clockIcon}
            />
            {times.length > 1 && (
              <TouchableOpacity
                style={styles.removeTimeButton}
                onPress={() => handleRemoveTime(index)}
              >
                <Ionicons name="close" size={14} color="white" />
              </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity
          style={styles.addTimeButton}
          onPress={handleAddMoreTime}
        >
          <Ionicons name="add" size={24} style={styles.addIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimeDrug;
