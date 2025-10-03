import Calender from "@/components/hcd/Calender";
import AppointmentCategoryModal from "@/components/meditrack-forms/AppointmentPopUp";
import AppointmentTimeRange from "@/components/meditrack-forms/appointTime";
import { getAppointmentStatus } from "@/components/utils/DateUtils";
import InputField from "@/components/utils/InputField";
import ModalError from "@/components/utils/ModalError";
import ModalSuccess from "@/components/utils/ModalSuccess";
import { COLORS } from "@/constants/colors";
import { useAppointments } from "@/context/AppointmentContext";
import { useAuth } from "@/context/AuthContext";
import { AppointmentReminder } from "@/types/appointment";
import {
  validateAppointmentForm,
  validateTimeRange,
} from "@/utils/appointment-cartegoryValidation";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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
  const params = useLocalSearchParams();
  const routeEditMode = params.editMode === "true";
  const routeAppointmentId = params.appointmentId as string;

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
  const { appointments, add, update, remove } = useAppointments();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { user } = useAuth();

  const actualEditMode = isEditMode || routeEditMode;

  useEffect(() => {
    if (routeEditMode && routeAppointmentId && appointments.length > 0) {
      const editingAppointment = appointments.find(
        (appt) => appt.id === routeAppointmentId
      );

      if (editingAppointment) {
        setTitle(editingAppointment.title);
        setDescription(editingAppointment.description);
        setDate(editingAppointment.date);
        setCategory(editingAppointment.category);
        setMedicalStaff(editingAppointment.medicalStaff);
        setLocation(editingAppointment.location);
        setStartTime(editingAppointment.startTime);
        setEndTime(editingAppointment.endTime);
      }
    } else if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDate(initialData.date);
      setCategory(initialData.category);
      setMedicalStaff(initialData.medicalStaff);
      setLocation(initialData.location);
      setStartTime(initialData.startTime);
      setEndTime(initialData.endTime);
    }
  }, [routeEditMode, routeAppointmentId, appointments, initialData]);
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
      setErrorMessage(timeValidationError);
      setShowError(true);
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

    const calculatedStatus = getAppointmentStatus(date, startTime);

    const appointmentData: Omit<AppointmentReminder, "id"> = {
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
      userId: user?.uid || "",
      status: actualEditMode
        ? initialData?.status || calculatedStatus
        : calculatedStatus,
    };

    try {
      if (actualEditMode && routeAppointmentId) {
        await update(routeAppointmentId, appointmentData);
        setShowSuccess(true);
        onSubmit?.({
          ...appointmentData,
          id: routeAppointmentId,
        } as AppointmentReminder);
      } else {
        await add(appointmentData);
        setShowSuccess(true);
        onSubmit?.({
          ...appointmentData,
          id: Date.now().toString(),
        } as AppointmentReminder);

        if (!actualEditMode) {
          setTitle("");
          setDescription("");
          setDate("");
          setCategory("");
          setMedicalStaff("");
          setLocation("");
          setStartTime("09:00");
          setEndTime("10:00");
        }
      }
    } catch (err) {
      setErrorMessage("Failed to save appointment. Please try again.");
      setShowError(true);
    }
  };

  const handleDelete = async () => {
    if (!routeAppointmentId) return;

    try {
      await remove(routeAppointmentId);
      setTimeout(() => {
        router.push("/meditrack/mediTrack");
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to delete appointment. Please try again.");
      setShowError(true);
    }
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
            onPress={() => router.push("/meditrack/mediTrack")}
          >
            <Image
              source={require("../../assets/utilsIcon/arrow-left.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {actualEditMode ? "Edit Appointment" : "New Appointment"}
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
            <View style={styles.titleHeader}>
              <TextInput
                style={[styles.titleInput, { flex: 1, marginBottom: 0 }]}
                placeholder="What's Appointment?"
                placeholderTextColor={COLORS.gray2}
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                  clearFieldError("title");
                }}
              />
              {actualEditMode && (
                <TouchableOpacity onPress={handleDelete}>
                  <Image
                    source={require("../../assets/utilsIcon/delete.png")}
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.separator} />

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
              <View style={[styles.inputField]}>
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
              <View style={[styles.descriptionContainer]}>
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
              {actualEditMode ? (
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    {
                      width: "100%",
                      backgroundColor: isFormValid
                        ? COLORS.primary
                        : COLORS.primary3rd,
                    },
                  ]}
                  onPress={handleAddAppointment}
                  disabled={!isFormValid}
                >
                  <Text style={[styles.submitButtonText, { marginLeft: 0 }]}>
                    Done
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    isFormValid
                      ? { backgroundColor: COLORS.primary }
                      : { backgroundColor: COLORS.primary3rd },
                  ]}
                  onPress={handleAddAppointment}
                  disabled={!isFormValid}
                >
                  <Ionicons name="add-outline" size={20} color={COLORS.white} />
                  <Text style={styles.submitButtonText}>Add Reminder</Text>
                </TouchableOpacity>
              )}
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
          title={actualEditMode ? "Appointment Updated!" : "Appointment Added!"}
          description="Your appointment has been saved successfully."
          buttonText="Continue"
          onClose={() => {
            setShowSuccess(false);
            router.push("/meditrack/mediTrack");
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AppointmentForm;
