import TitleBack from "@/components/TitleBack";
import PrimaryButtonColorForm from "@/components/utils/PrimaryButtonColorForm";
import { useDatePickerStyles } from "@/hooks/useDatePicker.styles";
import { NAV_ITEMS } from "@/styles/bottom-nav.styles";
import { styles } from "@/styles/hcd/createDiary.style";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import DateTimePicker from "react-native-ui-datepicker";

export default function createDiary() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const datePickerStyles = useDatePickerStyles();
  const [hasInput, setHasInput] = useState(false);

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleInputChange = (text: string) => {
    setHasInput(text.trim().length > 0);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
                      onChangeText={handleInputChange}
                      keyboardType="numeric"
                    />
                    <Text style={styles.shadowContent}>Systolic</Text>
                  </View>
                  <View style={styles.bottomInputCont}>
                    <TextInput
                      style={styles.halfInput}
                      onChangeText={handleInputChange}
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
                    onChangeText={handleInputChange}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.bottomInputCont}>
                  <Text style={styles.inputTitle}>Blood Sugar (mg/dL)</Text>
                  <TextInput
                    style={styles.halfInput}
                    onChangeText={handleInputChange}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Weight */}
              <View style={styles.bottomInputCont}>
                <Text style={styles.inputTitle}>Weight (kg)</Text>
                <TextInput
                  style={styles.fullInput}
                  onChangeText={handleInputChange}
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
                  onChangeText={handleInputChange}
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
                  onChangeText={handleInputChange}
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
                  onChangeText={handleInputChange}
                />
              </View>
            </View>
          </View>

          <PrimaryButtonColorForm text="Save Changes" active={hasInput} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
