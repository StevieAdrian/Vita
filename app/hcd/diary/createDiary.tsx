import ModalError from "@/components/utils/ModalError";
import ModalSuccess from "@/components/utils/ModalSuccess";
import PrimaryButtonColorForm from "@/components/utils/PrimaryButtonColorForm";
import TitleBack from "@/components/utils/TitleBack";
import { useAuthState } from "@/hooks/useAuthState";
import { useDatePickerStyles } from "@/hooks/useDatePicker.styles";
import { useHealthDiary } from "@/hooks/useHealthDiary";
import { useUserProfile } from "@/hooks/useUserProfile";
import { styles } from "@/styles/hcd/createDiary.style";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { DiaryInput } from "@/types/diary";
import { validateDiary } from "@/utils/validateDiary";
import { LinearGradient } from "expo-linear-gradient";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import DateTimePicker from "react-native-ui-datepicker";

export default function CreateDiary() {
  const { user } = useAuthState();
  const { addDiary } = useHealthDiary();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const datePickerStyles = useDatePickerStyles(selected instanceof Date ? selected : new Date());
  const [hasInput, setHasInput] = useState(false);
  const { loading } = useUserProfile();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [mood, setMood] = useState("");
  const [bloodSugar, setBloodSugar] = useState("");
  const [weight, setWeight] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [activities, setActivities] = useState("");
  const [notes, setNotes] = useState("");

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  function formatDateLocal(date: Date) {
    return date.toLocaleDateString("en-CA");
  }

  const checkHasInput = () => {
    if (
      systolic.trim() ||
      diastolic.trim() ||
      heartRate.trim() ||
      bloodSugar.trim() ||
      weight.trim() ||
      mood.trim() ||
      symptoms.trim() ||
      activities.trim() ||
      notes.trim()
    ) {
      setHasInput(true);
    } else {
      setHasInput(false);
    }
  };

  const saveDiary = async () => {
    if (!user?.uid) {
      setErrorMessage("You must be logged in to save a diary");
      setShowError(true);
      return;
    }

    const input: DiaryInput = {
      systolic,
      diastolic,
      heartRate,
      bloodSugar,
      weight,
      mood,
      symptoms,
      activities,
      notes,
    };

    const error = validateDiary(input);
    if (error) {
      setErrorMessage(error);
      setShowError(true);
      return;
    }

    const diaryEntry = {
      fromUid: user.uid,
      systolic: Number(systolic),
      diastolic: Number(diastolic),
      heartRate: Number(heartRate),
      bloodSugar: Number(bloodSugar),
      weight: Number(weight),
      mood,
      symptoms,
      activities,
      notes,
      date: selected
        ? Timestamp.fromDate(selected)
        : Timestamp.fromDate(new Date()),
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    };

    const result = await addDiary(diaryEntry);

    if (result.success) {
      setSystolic("");
      setDiastolic("");
      setHeartRate("");
      setBloodSugar("");
      setWeight("");
      setMood("");
      setSymptoms("");
      setActivities("");
      setNotes("");
      setShowSuccess(true);
      setHasInput(false);
    } else {
      setErrorMessage(result.message || "Failed to save diary");
      setShowError(true);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#E9F3FF", "#1A73E8"]}
        style={styles.dashboardContainerLinear}
      ></LinearGradient>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: NAV_ITEMS + insets.bottom + 16 },
        ]}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <TitleBack title="Add Health Diary" />
          </View>

          {/* Content */}
          <View style={styles.formContainer}>
            <View style={styles.formHeaderContainer}>
              <Text style={styles.titleForm}>{formatDate(selected)}</Text>
              <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
                <Image
                  source={require("@/assets/utilsIcon/calendar.png")}
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.calenderContainer}>
              {showPicker && (
                <DateTimePicker
                  mode="single"
                  date={selected ?? new Date()}
                  onChange={({ date }) => {
                    if (date) {
                      setSelected(date as Date);
                    }
                    setShowPicker(false);
                  }}
                  styles={datePickerStyles}
                />
              )}
            </View>
            <View style={styles.divider} />

            {/* VitalSign */}
            <View style={styles.subformContainer}>
              <Text style={styles.subtitle}>Vital Signs</Text>

              {/* Blood Pressure */}
              <View style={styles.bottomInputCont}>
                <Text style={styles.inputTitle}>Blood Pressure (mm Hg)</Text>
                <View style={styles.separatedInput}>
                  <View style={styles.bottomInputCont}>
                    <TextInput
                      style={styles.halfInput}
                      value={systolic}
                      onChangeText={(text) => {
                        setSystolic(text);
                        checkHasInput();
                      }}
                      keyboardType="numeric"
                    />
                    <Text style={styles.shadowContent}>Systolic</Text>
                  </View>
                  <View style={styles.bottomInputCont}>
                    <TextInput
                      style={styles.halfInput}
                      value={diastolic}
                      onChangeText={(text) => {
                        setDiastolic(text);
                        checkHasInput();
                      }}
                      keyboardType="numeric"
                    />
                    <Text style={styles.shadowContent}>Diastolic</Text>
                  </View>
                </View>
              </View>

              {/* Heart Rate and Blood Sugar */}
              <View style={styles.separatedInput}>
                <View style={styles.bottomInputCont}>
                  <Text style={styles.inputTitle}>Heart Rate(bpm)</Text>
                  <TextInput
                    style={styles.halfInput}
                    value={heartRate}
                    onChangeText={(text) => {
                      setHeartRate(text);
                      checkHasInput();
                    }}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.bottomInputCont}>
                  <Text style={styles.inputTitle}>Blood Sugar (mg/dL)</Text>
                  <TextInput
                    style={styles.halfInput}
                    value={bloodSugar}
                    onChangeText={(text) => {
                      setBloodSugar(text);
                      checkHasInput();
                    }}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Weight */}
              <View style={styles.bottomInputCont}>
                <Text style={styles.inputTitle}>Weight (kg)</Text>
                <TextInput
                  style={styles.fullInput}
                  value={weight}
                  onChangeText={(text) => {
                    setWeight(text);
                    checkHasInput();
                  }}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.divider} />

            {/* Symptoms and Mood */}
            <View style={styles.fullContainer}>
              <Text style={styles.subtitle}>Symptoms and Mood</Text>
              {/* Symptoms */}
              <View style={styles.bottomInputCont}>
                <Text style={styles.inputTitle}>Symptoms</Text>
                <TextInput
                  style={styles.descInput}
                  placeholder="Describe any symptoms....."
                  placeholderTextColor="#828282"
                  multiline
                  value={symptoms}
                  onChangeText={(text) => {
                    setSymptoms(text);
                    checkHasInput();
                  }}
                />
              </View>

              {/* Mood */}
              <View style={styles.bottomInputCont}>
                <Text style={styles.inputTitle}>Mood</Text>
                <TextInput
                  style={styles.descInput}
                  placeholder="Describe your mood today....."
                  placeholderTextColor="#828282"
                  multiline
                  value={mood}
                  onChangeText={(text) => {
                    setMood(text);
                    checkHasInput();
                  }}
                />
              </View>

              {/* Physical Activities */}
              <View style={styles.bottomInputCont}>
                <Text style={styles.inputTitle}>Physical Activities</Text>
                <TextInput
                  style={styles.descInput}
                  placeholder="Describe your physical activities today....."
                  placeholderTextColor="#828282"
                  multiline
                  value={activities}
                  onChangeText={(text) => {
                    setActivities(text);
                    checkHasInput();
                  }}
                />
              </View>

              {/* Additional Notes */}
              <View style={styles.bottomInputCont}>
                <Text style={styles.inputTitle}>Additional Notes</Text>
                <TextInput
                  style={styles.descInput}
                  placeholder="Any notes about your health..."
                  placeholderTextColor="#828282"
                  multiline
                  value={notes}
                  onChangeText={(text) => {
                    setNotes(text);
                    checkHasInput();
                  }}
                />
              </View>
            </View>
          </View>

          <PrimaryButtonColorForm
            text={loading ? "Saving..." : "Save Changes"}
            active={hasInput}
            onPress={saveDiary}
          />
          <ModalSuccess
            visible={showSuccess}
            title="Success"
            description="Your diary has been saved successfully."
            buttonText="Continue"
            onClose={() => setShowSuccess(false)}
          />

          <ModalError
            visible={showError}
            title="Error"
            description={errorMessage}
            buttonText="Close"
            onClose={() => setShowError(false)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
