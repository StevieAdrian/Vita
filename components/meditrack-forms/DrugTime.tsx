import { COLORS } from "@/constants/colors";
import { styles, timePickerStyles } from "@/styles/meditrack/drug-time.styles";
import { formatTime } from "@/utils/appointment-cartegoryValidation";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

interface TimePickerProps {
  value: string;
  onTimeChange: (time: string) => void;
  isVisible: boolean;
  onClose: () => void;
  title: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onTimeChange,
  isVisible,
  onClose,
  title,
}) => {
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);

  React.useEffect(() => {
    if (value) {
      const [hours, minutes] = value.split(":");
      setSelectedHour(parseInt(hours, 10));
      setSelectedMinute(parseInt(minutes, 10));
    }
  }, [value, isVisible]);

  const handleConfirm = () => {
    const timeString = `${selectedHour
      .toString()
      .padStart(2, "0")}:${selectedMinute.toString().padStart(2, "0")}`;
    onTimeChange(timeString);
    onClose();
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={timePickerStyles.overlay}>
        <View style={timePickerStyles.container}>
          <View style={timePickerStyles.header}>
            <Text style={timePickerStyles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>

          <View style={timePickerStyles.pickerContainer}>
            <View style={timePickerStyles.picker}>
              <Text style={timePickerStyles.pickerLabel}>Hour</Text>
              <FlatList
                data={hours}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      timePickerStyles.pickerItem,
                      selectedHour === item && timePickerStyles.selectedItem,
                    ]}
                    onPress={() => setSelectedHour(item)}
                  >
                    <Text
                      style={[
                        timePickerStyles.pickerText,
                        selectedHour === item && timePickerStyles.selectedText,
                      ]}
                    >
                      {item.toString().padStart(2, "0")}
                    </Text>
                  </TouchableOpacity>
                )}
                style={timePickerStyles.scrollableList}
                showsVerticalScrollIndicator={false}
              />
            </View>

            <View style={timePickerStyles.picker}>
              <Text style={timePickerStyles.pickerLabel}>Minute</Text>
              <FlatList
                data={minutes.filter((m) => m % 5 === 0)}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      timePickerStyles.pickerItem,
                      selectedMinute === item && timePickerStyles.selectedItem,
                    ]}
                    onPress={() => setSelectedMinute(item)}
                  >
                    <Text
                      style={[
                        timePickerStyles.pickerText,
                        selectedMinute === item &&
                          timePickerStyles.selectedText,
                      ]}
                    >
                      {item.toString().padStart(2, "0")}
                    </Text>
                  </TouchableOpacity>
                )}
                style={timePickerStyles.scrollableList}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>

          <TouchableOpacity
            style={timePickerStyles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={timePickerStyles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

interface TimeDrugProps {
  onTimesChange?: (times: string[]) => void;
  initialTimes?: string[];
}

const TimeDrug: React.FC<TimeDrugProps> = ({
  onTimesChange,
  initialTimes = ["12:00"],
}) => {
  const [times, setTimes] = useState<string[]>(initialTimes);
  const [showTimePickers, setShowTimePickers] = useState<boolean[]>(
    initialTimes.map(() => false)
  );

  const handleTimeChange = (time: string, index: number) => {
    const newTimes = [...times];
    newTimes[index] = time;
    setTimes(newTimes);
    onTimesChange?.(newTimes);
  };

  const handleShowTimePicker = (index: number, show: boolean) => {
    const newShowTimePickers = [...showTimePickers];
    newShowTimePickers[index] = show;
    setShowTimePickers(newShowTimePickers);
  };

  const handleAddMoreTime = () => {
    const newTimes = [...times, "12:00"];
    setTimes(newTimes);
    setShowTimePickers([...showTimePickers, false]);
    onTimesChange?.(newTimes);
  };

  const handleRemoveTime = (index: number) => {
    if (times.length > 1) {
      const newTimes = times.filter((_, i) => i !== index);
      const newShowTimePickers = showTimePickers.filter((_, i) => i !== index);
      setTimes(newTimes);
      setShowTimePickers(newShowTimePickers);
      onTimesChange?.(newTimes);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What Time?</Text>

      <View style={styles.timesWrapper}>
        {times.map((time, index) => (
          <View key={index} style={styles.timeInputContainer}>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => handleShowTimePicker(index, true)}
            >
              <Text style={styles.timeText}>{formatTime(time)}</Text>
              <Ionicons name="time-outline" size={20} color={COLORS.black} />
            </TouchableOpacity>

            {times.length > 1 && (
              <TouchableOpacity
                style={styles.removeTimeButton}
                onPress={() => handleRemoveTime(index)}
              >
                <Ionicons name="close" size={14} color="white" />
              </TouchableOpacity>
            )}

            <TimePicker
              value={time}
              onTimeChange={(newTime) => handleTimeChange(newTime, index)}
              isVisible={showTimePickers[index]}
              onClose={() => handleShowTimePicker(index, false)}
              title={`Select Time ${index + 1}`}
            />
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
