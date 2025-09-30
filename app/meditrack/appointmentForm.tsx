import Calender from "@/components/hcd/Calender";
import AppointmentCategoryModal from "@/components/meditrack-forms/AppointmentPopUp";
import AppointmentTimeRange from "@/components/meditrack-forms/appointTime";
import InputField from "@/components/utils/InputField";
import ModalError from "@/components/utils/ModalError";
import ModalSuccess from "@/components/utils/ModalSuccess";
import { COLORS } from "@/constants/colors";
import { useAppointments } from "@/hooks/useAppointment";
import { AppointmentReminder } from "@/types/appointment";
import {
  validateAppointmentForm,
  validateTimeRange,
} from "@/utils/appointment-cartegoryValidation";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "../../styles/meditrack/appointmentform.style";

interface AppointmentFormProps {
  initialData?: AppointmentReminder;
  onSubmit?: (data: AppointmentReminder) => void;
  onDelete?: (id: string) => void;
  isEditMode?: boolean;
  onBack?: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialData,
  onSubmit,
  onDelete,
  isEditMode = false,
  onBack,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<string>("");
  const [medicalStaff, setMedicalStaff] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { add, update, remove } = useAppointments();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validation = validateAppointmentForm({
    title,
    date,
    category,
    medicalStaff,
    location,
    startTime,
    endTime,
  });

  const isFormValid = validation.isValid;

  const handleAddAppointment = async () => {
    const timeValidationError = validateTimeRange(startTime, endTime);
    if (timeValidationError) {
      setErrors([timeValidationError]);
      return;
    }

    if (!isFormValid) {
      setErrors(validation.errors);
      setErrorMessage(
        "Please fill in all required fields correctly.\n\n" +
          validation.errors.join("\n• ")
      );
      setShowError(true);
      return;
    }

    const newAppointment: AppointmentReminder = {
      id: initialData?.id || Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      date,
      category,
      medicalStaff: medicalStaff.trim(),
      location: location.trim(),
      startTime,
      endTime,
      isCompleted: initialData?.isCompleted ?? false,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "",
      status: "",
    };

    if (isEditMode && initialData?.id) {
      await update(initialData.id, newAppointment);
    } else {
      await add(newAppointment);
    }

    onSubmit?.(newAppointment);
    setShowSuccess(true);

    setTitle("");
    setDescription("");
    setDate("");
    setCategory("");
    setMedicalStaff("");
    setLocation("");
    setStartTime("09:00");
    setEndTime("10:00");
  };

  const handleTimeRangeChange = (start: string, end: string) => {
    setStartTime(start);
    setEndTime(end);
    setErrors((prev) =>
      prev.filter((error) => !error.includes("time") && !error.includes("Time"))
    );
  };

  const handleCategoryApply = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setErrors((prev) => prev.filter((error) => !error.includes("Category")));
  };

  const clearFieldError = (fieldType: string) => {
    setErrors((prev) =>
      prev.filter(
        (error) => !error.toLowerCase().includes(fieldType.toLowerCase())
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/meditrack/MediTrack")}
          >
            <Image
              source={require("../../assets/utilsIcon/arrow-left.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditMode ? "Edit Appointment" : "New Appointment"}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {errors.length > 0 && (
              <View style={styles.errorContainer}>
                <Ionicons name="warning-outline" size={20} color={COLORS.red} />
                <Text style={styles.errorText}>
                  Please check the following fields:
                </Text>
                {errors.map((error, index) => (
                  <Text key={index} style={styles.errorItem}>
                    {error}
                  </Text>
                ))}
              </View>
            )}

            <TextInput
              style={[
                styles.titleInput,
                errors.some((e) => e.includes("Title")) && styles.inputError,
              ]}
              placeholder="What's Appointment?"
              placeholderTextColor={COLORS.gray2}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                clearFieldError("title");
              }}
            />
            <View style={styles.separator} />

            <View style={styles.section}>
              <Text style={styles.label}>Description</Text>
              <View style={styles.descriptionContainer}>
                <TextInput
                  style={styles.descriptionInput}
                  placeholder="Add description..."
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  placeholderTextColor={COLORS.gray2}
                  accessibilityLabel="Appointment description"
                />
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.dobWrapper}>
                <InputField
                  label="Date"
                  placeholder="Select a date"
                  value={date}
                  onChangeText={setDate}
                  editable={false}
                  placeholderTextColor={COLORS.gray2}
                />
                <Calender
                  value={date}
                  allowFutureDates={true}
                  allowPastDates={true}
                  onSelectDate={(newDate) => {
                    setDate(newDate);
                    clearFieldError("date");
                  }}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Category</Text>
              <TouchableOpacity
                style={styles.inputField}
                onPress={() => setIsCategoryModalVisible(true)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    !category && styles.placeholderText,
                  ]}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {category || "Select Category"}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={COLORS.black}
                  style={styles.chevronIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Medical Staff</Text>
              <View
                style={[
                  styles.inputField,
                  errors.some((e) => e.includes("Medical staff")) &&
                    styles.inputError,
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="Who's the doctor/nurse/medical staff?"
                  value={medicalStaff}
                  onChangeText={(text) => {
                    setMedicalStaff(text);
                    clearFieldError("medical staff");
                  }}
                  placeholderTextColor={COLORS.gray2}
                  accessibilityLabel="Medical staff name"
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Location</Text>
              <View
                style={[
                  styles.descriptionContainer,
                  errors.some((e) => e.includes("Location")) &&
                    styles.inputError,
                ]}
              >
                <TextInput
                  style={styles.descriptionInput}
                  placeholder="Add location address or facility name"
                  value={location}
                  onChangeText={(text) => {
                    setLocation(text);
                    clearFieldError("location");
                  }}
                  multiline
                  placeholderTextColor={COLORS.gray2}
                  accessibilityLabel="Appointment location"
                />
              </View>
            </View>

            <View style={styles.section}>
              <AppointmentTimeRange
                onTimeRangeChange={handleTimeRangeChange}
                initialStartTime={startTime}
                initialEndTime={endTime}
              />
            </View>

            <View style={styles.buttonContainer}>
              {isEditMode && onDelete && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  accessibilityLabel="Delete appointment"
                  accessibilityRole="button"
                  onPress={() => initialData?.id && remove(initialData.id)}
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={COLORS.white}
                  />
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  isFormValid && styles.submitButtonActive,
                ]}
                onPress={handleAddAppointment}
                disabled={!isFormValid}
              >
                <Ionicons
                  name={isEditMode ? "checkmark-outline" : "add-outline"}
                  size={20}
                  color={COLORS.white}
                />
                <Text style={styles.submitButtonText}>
                  {isEditMode ? "Update Appointment" : "Add Reminder"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <AppointmentCategoryModal
          isVisible={isCategoryModalVisible}
          onClose={() => setIsCategoryModalVisible(false)}
          onApply={handleCategoryApply}
          initialCategory={category}
        />

        <ModalError
          visible={showError}
          title="Missing Information"
          description={errorMessage}
          buttonText="OK"
          onClose={() => setShowError(false)}
        />

        <ModalSuccess
          visible={showSuccess}
          title={isEditMode ? "Appointment Updated!" : "Appointment Added!"}
          description="Your appointment has been saved successfully."
          buttonText="Continue"
          onClose={() => setShowSuccess(false)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AppointmentForm;
