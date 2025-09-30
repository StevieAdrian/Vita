import Calender from "@/components/hcd/Calender";
import DrugsCategoryModal from "@/components/meditrack-forms/DrugCategory";
import DrugRepeatModal from "@/components/meditrack-forms/DrugRepeat";
import TimeDrug from "@/components/meditrack-forms/DrugTime";
import InputField from "@/components/utils/InputField";
import ModalError from "@/components/utils/ModalError";
import ModalSuccess from "@/components/utils/ModalSuccess";
import { COLORS } from "@/constants/colors";
import { DrugReminder } from "@/constants/drugs";
import { useDrugForm } from "@/hooks/useDrug";
import { getCategoryLabel, getRepeatLabel } from "@/utils/drugformValidation";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
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
  const [drugName, setDrugName] = useState(initialData?.drugName || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [date, setDate] = useState(initialData?.date || "August 25, 2025");
  const [category, setCategory] = useState<string[]>(
    initialData?.category ? [initialData.category] : []
  );
  const [times, setTimes] = useState<string[]>(initialData?.times || ["12:00"]);
  const [repeatDays, setRepeatDays] = useState<string[]>(
    initialData?.repeatDays || []
  );

  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isRepeatModalVisible, setIsRepeatModalVisible] = useState(false);
  const { add, update, remove } = useDrugForm();
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
      id: initialData?.id || Date.now().toString(),
      drugName,
      description,
      date,
      category: category[0] || "",
      times,
      repeatDays,
      isCompleted: initialData?.isCompleted ?? false,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "",
    };

    if (isEditMode && initialData?.id) {
      await update(initialData.id, newReminder);
    } else {
      await add(newReminder);
    }

    onSubmit?.(newReminder);
    setShowSuccess(true);

    setDrugName("");
    setDescription("");
    setDate("");
    setCategory([]);
    setTimes(["12:00"]);
    setRepeatDays([]);
  };

  const handleTimesChange = (newTimes: string[]) => {
    setTimes(newTimes);
  };

  const handleCategoryApply = (selectedCategories: string[]) => {
    setCategory(selectedCategories);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Image
            source={require("../../assets/utilsIcon/arrow-left.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditMode ? "Edit Reminder" : "Drugs Reminder"}
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
          <TextInput
            style={styles.titleInput}
            placeholder="What's Reminder?"
            value={drugName}
            onChangeText={setDrugName}
            editable={true}
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
              <Calender value={date} onSelectDate={setDate} />
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
            <TimeDrug onTimesChange={handleTimesChange} initialTimes={times} />
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
            {isEditMode && onDelete && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDelete(initialData?.id || "")}
              >
                <Ionicons name="trash-outline" size={20} color={COLORS.white} />
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.submitButton,
                isEditMode && onDelete && styles.submitButtonSmall,
                isFormValid
                  ? { backgroundColor: COLORS.primary }
                  : { backgroundColor: COLORS.primary3rd },
              ]}
              onPress={handleAddReminder}
              disabled={!isFormValid}
            >
              <Ionicons
                name={isEditMode ? "checkmark-outline" : "add-outline"}
                size={20}
                color={COLORS.white}
              />
              <Text style={styles.submitButtonText}>
                {isEditMode ? "Update" : "Add Reminder"}
              </Text>
            </TouchableOpacity>
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
        title={isEditMode ? "Drug Reminer Updated!" : "Drug Reminder Added!"}
        description="Your drug reminder has been saved successfully."
        buttonText="Continue"
        onClose={() => setShowSuccess(false)}
      />
    </SafeAreaView>
  );
};

export default DrugForm;
