import { COLORS } from "@/constants/colors";
import {
  styles,
  timePickerStyles,
} from "@/styles/meditrack/appoinment-time.styles";
import { formatTime } from "@/utils/appointment-cartegoryValidation";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
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

interface AppointmentTimeRangeProps {
  onTimeRangeChange: (startTime: string, endTime: string) => void;
  initialStartTime?: string;
  initialEndTime?: string;
}

const AppointmentTimeRange: React.FC<AppointmentTimeRangeProps> = ({
  onTimeRangeChange,
  initialStartTime = "09:00",
  initialEndTime = "10:00",
}) => {
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  useEffect(() => {
    setStartTime(initialStartTime);
    setEndTime(initialEndTime);
  }, [initialStartTime, initialEndTime]);

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    setShowStartTimePicker(false);
    onTimeRangeChange(time, endTime);
  };

  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
    setShowEndTimePicker(false);
    onTimeRangeChange(startTime, time);
  };

  return (
    <View>
      <Text style={styles.label}>What Time?</Text>
      <View style={styles.timeRangeContainer}>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setShowStartTimePicker(true)}
        >
          <Text style={styles.timeText}>{formatTime(startTime)}</Text>
          <Ionicons name="time-outline" size={20} color={COLORS.black} />
        </TouchableOpacity>

        <View style={styles.timeSeparator}>
          <View style={styles.separatorLine} />
        </View>

        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setShowEndTimePicker(true)}
        >
          <Text style={styles.timeText}>{formatTime(endTime)}</Text>
          <Ionicons name="time-outline" size={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <TimePicker
        value={startTime}
        onTimeChange={handleStartTimeChange}
        isVisible={showStartTimePicker}
        onClose={() => setShowStartTimePicker(false)}
        title="Select Start Time"
      />

      <TimePicker
        value={endTime}
        onTimeChange={handleEndTimeChange}
        isVisible={showEndTimePicker}
        onClose={() => setShowEndTimePicker(false)}
        title="Select End Time"
      />
    </View>
  );
};

export default AppointmentTimeRange;
