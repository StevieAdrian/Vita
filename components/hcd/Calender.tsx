import { COLORS } from "@/constants/colors";
import { styles } from "@/styles/hcd/calender.styles";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";

type CalenderProps = {
  value: string;
  onSelectDate: (date: string) => void;
  minDate?: Date;
  maxDate?: Date;
  allowFutureDates?: boolean;
  allowPastDates?: boolean;
};

export default function Calender({
  value,
  onSelectDate,
  minDate,
  maxDate,
  allowFutureDates = true,
  allowPastDates = true,
}: CalenderProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const getInitialDate = () => {
    const today = new Date();
    const defaultYear = today.getFullYear();
    return new Date(defaultYear, today.getMonth(), today.getDate());
  };

  const [currentDate, setCurrentDate] = useState(getInitialDate());

  const getMaxDate = () => {
    if (maxDate) return maxDate.toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    return allowFutureDates ? undefined : today;
  };

  const getMinDate = () => {
    if (minDate) return minDate.toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    return allowPastDates ? undefined : today;
  };

  const getSelectedDate = () => {
    if (value) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString().split("T")[0];
      }
    }
    return undefined;
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

  useEffect(() => {
    setCurrentDate(getInitialDate());
  }, []);

  return (
    <>
      <TouchableOpacity
        style={styles.calendarButton}
        onPress={() => setShowCalendar(true)}
        activeOpacity={0.7}
      >
        <FontAwesome6 name="calendar" size={24} color={COLORS.black} />
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
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowCalendar(false);
                  setShowYearPicker(false);
                }}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={COLORS.black} />
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
                    <Ionicons
                      name="chevron-down"
                      size={12}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                </View>

                <Calendar
                  current={currentDate.toISOString().split("T")[0]}
                  onDayPress={handleDateSelect}
                  onMonthChange={handleMonthChange}
                  minDate={getMinDate()}
                  maxDate={getMaxDate()}
                  hideArrows={false}
                  hideExtraDays={true}
                  markedDates={{
                    [getSelectedDate() || ""]: {
                      selected: true,
                      selectedColor: COLORS.primary,
                      selectedTextColor: COLORS.white,
                    },
                  }}
                  theme={{
                    selectedDayBackgroundColor: COLORS.primary,
                    selectedDayTextColor: COLORS.white,
                    todayTextColor: COLORS.primary,
                    dayTextColor: COLORS.black,
                    textDisabledColor: COLORS.background2nd,
                    dotColor: COLORS.primary3rd,
                    selectedDotColor: COLORS.white,
                    arrowColor: COLORS.primary2nd,
                    disabledArrowColor: COLORS.background2nd,
                    monthTextColor: COLORS.black,
                    indicatorColor: COLORS.primary,
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
                    <Ionicons
                      name="arrow-back"
                      size={16}
                      color={COLORS.primary}
                    />
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
