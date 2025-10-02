import Calender from "@/components/hcd/Calender";
import DrugsCategoryModal from "@/components/meditrack-forms/DrugCategory";
import DrugRepeatModal from "@/components/meditrack-forms/DrugRepeat";
import TimeDrug from "@/components/meditrack-forms/DrugTime";
import InputField from "@/components/utils/InputField";
import ModalError from "@/components/utils/ModalError";
import ModalSuccess from "@/components/utils/ModalSuccess";
import { COLORS } from "@/constants/colors";
import { DrugReminder } from "@/constants/drugs";
import { useAuth } from "@/context/AuthContext";
import { useDrugs } from "@/context/DrugContext";
import { getCategoryLabel, getRepeatLabel } from "@/utils/drugformValidation";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/meditrack/drugform.style";

interface DrugFormProps {
  initialData?: DrugReminder;
  onSubmit: (data: DrugReminder) => void;
  onDelete?: (id: string) => void;
  isEditMode?: boolean;
  onBack?: () => void;
}

const DrugForm: React.FC<DrugFormProps> = ({
  initialData,
  onSubmit,
  onDelete,
  isEditMode = false,
  onBack,
}) => {
  const params = useLocalSearchParams();
  const routeEditMode = params.editMode === "true";
  const routeDrugId = params.drugId as string;

  const { drugs, add, update, remove } = useDrugs();
  const { user } = useAuth();

  const [drugName, setDrugName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("August 25, 2025");
  const [category, setCategory] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>(["12:00"]);
  const [repeatDays, setRepeatDays] = useState<string[]>([]);

  useEffect(() => {
    if (routeEditMode && routeDrugId && drugs.length > 0) {
      const editingDrug = drugs.find((drug) => drug.id === routeDrugId);

      if (editingDrug) {
        setDrugName(editingDrug.drugName);
        setDescription(editingDrug.description);
        setDate(editingDrug.date);
        setCategory([editingDrug.category]);
        setTimes(editingDrug.times || []);
        setRepeatDays(editingDrug.repeatDays || []);
      }
    } else if (initialData) {
      setDrugName(initialData.drugName);
      setDescription(initialData.description);
      setDate(initialData.date);
      setCategory([initialData.category]);
      setTimes(initialData.times);
      setRepeatDays(initialData.repeatDays || []);
    }
  }, [routeEditMode, routeDrugId, drugs, initialData]);

  const actualEditMode = isEditMode || routeEditMode;
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isRepeatModalVisible, setIsRepeatModalVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isFormValid =
    drugName.trim() !== "" &&
    date.trim() !== "" &&
    category.length > 0 &&
    times.length > 0 &&
    times.every((time) => time.trim() !== "");

  const handleAddReminder = async () => {
    if (!isFormValid) {
      setErrorMessage("Please fill in all required fields correctly.");
      setShowError(true);
      return;
    }

    const newReminder: DrugReminder = {
      id: actualEditMode ? routeDrugId : Date.now().toString(),
      drugName,
      description,
      date,
      category: category[0] || "",
      times,
      repeatDays,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user?.uid || "",
    };

    try {
      if (actualEditMode && routeDrugId) {
        await update(routeDrugId, newReminder);
        setShowSuccess(true);
        onSubmit?.(newReminder);
      } else {
        await add(newReminder);
        setShowSuccess(true);
        onSubmit?.(newReminder);

        setDrugName("");
        setDescription("");
        setDate("August 25, 2025");
        setCategory([]);
        setTimes(["12:00"]);
        setRepeatDays([]);
      }
    } catch (err) {
      setErrorMessage("Failed to save reminder. Please try again.");
      setShowError(true);
    }
  };

  const handleDelete = async () => {
    if (!routeDrugId) return;

    try {
      await remove(routeDrugId);
      router.push("/meditrack/mediTrack");
    } catch (err) {
      setErrorMessage("Failed to delete. Please try again.");
      setShowError(true);
    }
  };

  const handleCategoryApply = (selectedCategories: string[]) => {
    setCategory(selectedCategories);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
          {actualEditMode ? "Edit Reminder" : "Drugs Reminder"}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 200 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.titleHeader}>
            <TextInput
              style={[styles.titleInput, { flex: 1, marginBottom: 0 }]}
              placeholder="What's Reminder?"
              value={drugName}
              onChangeText={setDrugName}
              editable={true}
            />
            {actualEditMode && (
              <TouchableOpacity onPress={handleDelete}>
                <Image source={require("../../assets/utilsIcon/delete.png")} />
              </TouchableOpacity>
            )}
          </View>

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
              />
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.dobWrapper}>
              <InputField
                label="Date"
                placeholder="August 25, 2025"
                value={date}
                onChangeText={setDate}
                editable={false}
                placeholderTextColor={COLORS.gray2}
                style={styles.inputLabel}
              />
              <Calender
                value={date}
                allowFutureDates={true}
                allowPastDates={true}
                onSelectDate={setDate}
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
                  styles.inputText,
                  category.length === 0 && styles.placeholderText,
                ]}
              >
                {getCategoryLabel(category)}
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
            <TimeDrug onTimesChange={setTimes} times={times} />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Repeat</Text>
            <TouchableOpacity
              style={styles.inputField}
              onPress={() => setIsRepeatModalVisible(true)}
            >
              <Text
                style={[
                  styles.inputText,
                  repeatDays.length === 0 && styles.placeholderText,
                ]}
              >
                {getRepeatLabel(repeatDays)}
              </Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color={COLORS.black}
                style={styles.chevronIcon}
              />
            </TouchableOpacity>
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
                onPress={handleAddReminder}
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
                onPress={handleAddReminder}
                disabled={!isFormValid}
              >
                <Ionicons name="add-outline" size={20} color={COLORS.white} />
                <Text style={styles.submitButtonText}>Add Reminder</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      <DrugsCategoryModal
        isVisible={isCategoryModalVisible}
        onClose={() => setIsCategoryModalVisible(false)}
        onApply={handleCategoryApply}
        initialCategories={category}
      />

      <DrugRepeatModal
        isVisible={isRepeatModalVisible}
        onClose={() => setIsRepeatModalVisible(false)}
        onApply={(selectedDays) => setRepeatDays(selectedDays)}
        initialRepeatDays={repeatDays}
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
        title={
          actualEditMode ? "Drug Reminder Updated!" : "Drug Reminder Added!"
        }
        description="Your drug reminder has been saved successfully."
        buttonText="Continue"
        onClose={() => {
          setShowSuccess(false);
          router.push("/meditrack/mediTrack");
        }}
      />
    </SafeAreaView>
  );
};

export default DrugForm;