import { styles } from "@/styles/calender.styles";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";

type CalenderProps = {
  value: string;
  onSelectDate: (date: string) => void;
};

export default function Calender({ value, onSelectDate }: CalenderProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const getInitialDate = () => {
    const today = new Date();
    const defaultYear = today.getFullYear();
    return new Date(defaultYear, today.getMonth(), today.getDate());
  };

  const [currentDate, setCurrentDate] = useState(getInitialDate());

  const getSelectedDate = () => {
    if (value) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString().split("T")[0];
      }
    }
    return "";
  };

  const handleDateSelect = (day: any) => {
    const selectedDate = new Date(day.dateString);
    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    onSelectDate(formattedDate);
    setShowCalendar(false);
  };

  const handleMonthChange = (date: any) => {
    setCurrentDate(new Date(date.dateString));
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(i);
    }
    return years;
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setShowYearPicker(false);
  };

  const formatMonthYear = () => {
    return currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <TouchableOpacity
        style={styles.calendarButton}
        onPress={() => setShowCalendar(true)}
        activeOpacity={0.7}
      >
        <FontAwesome6 name="calendar" size={24} color="#000" />
      </TouchableOpacity>

      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setShowCalendar(false);
          setShowYearPicker(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date of Birth</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowCalendar(false);
                  setShowYearPicker(false);
                }}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {!showYearPicker ? (
              <>
                <View style={styles.customHeader}>
                  <TouchableOpacity
                    style={styles.monthYearButton}
                    onPress={() => setShowYearPicker(true)}
                  >
                    <Text style={styles.monthYearText}>
                      {formatMonthYear()}
                    </Text>
                    <Ionicons name="chevron-down" size={12} color="#4285F4" />
                  </TouchableOpacity>
                </View>

                <Calendar
                  current={currentDate.toISOString().split("T")[0]}
                  onDayPress={handleDateSelect}
                  onMonthChange={handleMonthChange}
                  maxDate={new Date().toISOString().split("T")[0]}
                  hideArrows={false}
                  hideExtraDays={true}
                  markedDates={{
                    [getSelectedDate()]: {
                      selected: true,
                      selectedColor: "#4285F4",
                      selectedTextColor: "#ffffff",
                    },
                  }}
                  theme={{
                    selectedDayBackgroundColor: "#4285F4",
                    selectedDayTextColor: "#ffffff",
                    todayTextColor: "#4285F4",
                    dayTextColor: "#2d4150",
                    textDisabledColor: "#d9e1e8",
                    dotColor: "#00adf5",
                    selectedDotColor: "#ffffff",
                    arrowColor: "#4285F4",
                    disabledArrowColor: "#d9e1e8",
                    monthTextColor: "#2d4150",
                    indicatorColor: "#4285F4",
                    textDayFontWeight: "400",
                    textMonthFontWeight: "bold",
                    textDayHeaderFontWeight: "600",
                    textDayFontSize: 16,
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 13,
                  }}
                />
              </>
            ) : (
              <View style={styles.yearPickerContainer}>
                <View style={styles.yearPickerHeader}>
                  <TouchableOpacity
                    onPress={() => setShowYearPicker(false)}
                    style={styles.backButton}
                  >
                    <Ionicons name="arrow-back" size={16} color="#4285F4" />
                    <Text style={styles.backButtonText}>Back</Text>
                  </TouchableOpacity>
                  <Text style={styles.yearPickerTitle}>Select Year</Text>
                </View>

                <ScrollView
                  style={styles.yearScrollContainer}
                  contentContainerStyle={styles.yearGridContainer}
                  showsVerticalScrollIndicator={true}
                >
                  {generateYearOptions().map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.yearGridItem,
                        currentDate.getFullYear() === year &&
                          styles.yearGridItemSelected,
                      ]}
                      onPress={() => handleYearSelect(year)}
                    >
                      <Text
                        style={[
                          styles.yearGridText,
                          currentDate.getFullYear() === year &&
                            styles.yearGridTextSelected,
                        ]}
                      >
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
