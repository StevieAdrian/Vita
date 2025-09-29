import { ReminderCard } from "@/components/Reminder";
import TitleBack from "@/components/utils/TitleBack";
import { COLORS } from "@/constants/colors";
import { initialReminders } from "@/constants/initialData";
import { Reminder } from "@/constants/reminder";
import { useDatePickerStyles } from "@/hooks/useDatePicker.styles";
import { NAV_ITEMS } from "@/styles/bottom-nav.styles";
import { styles } from "@/styles/hcd/viewHealthDiary.style";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";

export default function HealthDiary() {
  const insets = useSafeAreaInsets();
  const datePickerStyle = useDatePickerStyles();
  const [selected, setSelected] = useState<DateType>();
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [symptoms, setSymptoms] = useState("Headache since this morning");
  const [mood, setMood] = useState("Feeling a bit tired but okay");
  const [activities, setActivities] = useState("Jogging for 20 minutes");
  const [notes, setNotes] = useState("Need to drink more water today");

  const schedules: Record<string, Reminder[]> = {
    "2025-09-29": [
      {
        id: "1",
        title: "Panadol 200mg",
        timeLabel: "09:00",
        description: "Take after meal",
        category: "drug",
        completed: false,
      },
      {
        id: "2",
        title: "Dr. Veni Checkupsssssss",
        timeLabel: "09:00 - 11:00",
        description: "Routine checkup",
        category: "appointment",
        completed: false,
      },
      {
        id: "3",
        title: "Panadol 200mg",
        timeLabel: "13:00",
        description: "Take after lunch",
        category: "drug",
        completed: false,
      },
    ],
    "2025-09-02": [
      {
        id: "4",
        title: "Vitamin C 500mg",
        timeLabel: "08:00",
        description: "Morning supplement",
        category: "drug",
        completed: false,
      },
      {
        id: "5",
        title: "Dr. Budi Consultation",
        timeLabel: "10:00 - 11:00",
        description: "Consultation",
        category: "appointment",
        completed: false,
      },
    ],
  };

  // Today SelectedDate
  function formatDateLocal(date: Date) {
    return date.toLocaleDateString("en-CA");
  }

  const selectedDateKey = selected
    ? formatDateLocal(new Date(selected as Date))
    : formatDateLocal(new Date());

  const todaySchedules = schedules[selectedDateKey] ?? [];

  function getStartTime(timeLabel: string) {
    const m = timeLabel.match(/\d{1,2}:\d{2}/);
    return m ? m[0] : "00:00";
  }

  const displayedSchedules = todaySchedules.map((s) => {
    const r = reminders.find((x) => x.id === s.id);
    return r ? { ...s, completed: r.completed } : s;
  });

  const todayReminders = [...displayedSchedules].sort((a, b) =>
    getStartTime(a.timeLabel).localeCompare(getStartTime(b.timeLabel))
  );

  const handleToggleReminder = useCallback(
    (id: string) => {
      setReminders((prev) => {
        const existed = prev.find((r) => r.id === id);
        if (existed) {
          // toggle existing
          return prev.map((r) =>
            r.id === id ? { ...r, completed: !r.completed } : r
          );
        } else {
          const source = displayedSchedules.find((s) => s.id === id);
          return [
            ...prev,
            {
              id,
              title: source?.title ?? "Untitled",
              timeLabel: source?.timeLabel ?? "00:00",
              description: source?.description ?? "",
              category: source?.category ?? "other",
              completed: true,
            },
          ];
        }
      });
    },
    [displayedSchedules]
  );
  console.log("Selected raw:", selected);
  console.log("SelectedDateKey:", selectedDateKey);
  console.log("Schedules keys:", Object.keys(schedules));
  console.log("TodaySchedules:", todaySchedules);
  console.log("DisplayedSchedules:", displayedSchedules);
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: NAV_ITEMS + insets.bottom + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <TitleBack title="Health Diary"></TitleBack>
        <View>
          <View style={styles.dateBg}>
            <DateTimePicker
              mode="single"
              date={selected}
              onChange={({ date }) => setSelected(date)}
              styles={datePickerStyle}
            />
          </View>

          <View>
            {/* Schedeule */}
            <View style={styles.containerReminder}>
              <View style={styles.captionSubtitle}>
                <Text style={styles.subtitle}>Schedule</Text>
                <TouchableOpacity style={styles.subtitleContainerText}>
                  <Text
                    style={styles.seeAllContainer}
                    onPress={() => router.push("/hcd/diary/createDiary")}
                  >
                    Add Event
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* --- Map Reminder--- */}
          <View style={styles.section}>
            <View>
              {todayReminders.length === 0 ? (
                <Text style={{ textAlign: "center", color: "gray" }}>
                  No reminders today
                </Text>
              ) : (
                todayReminders.map((reminder) => (
                  <View key={reminder.id} style={styles.reminderRow}>
                    <View style={styles.reminderTimesCard}>
                      <Text style={styles.reminderTime}>
                        {reminder.timeLabel}
                      </Text>
                    </View>
                    <View style={styles.reminderCardS}>
                      <ReminderCard
                        key={reminder.id}
                        reminder={reminder}
                        onToggle={() => handleToggleReminder(reminder.id)}
                        showDescription={false}
                      />
                    </View>
                  </View>
                ))
              )}
            </View>
            <View>
              <Text style={styles.seeAllReminder}>View All</Text>
            </View>
          </View>

          {/* Vital Sign */}
          <TouchableOpacity style={styles.containerAllDigitBio}>
            {/* Judul */}
            <View style={styles.titleHealth}>
              <View style={styles.containerDigit}>
                <View style={styles.containerTitle}>
                  <Text style={styles.titleDigitBio}>Vital Signs</Text>
                  <Text style={styles.captionDigitBio}>
                    Latest update 15/09/2025 13:00
                  </Text>
                </View>
              </View>
              <Image
                source={require("@/assets/utilsIcon/arrow-left.png")}
                style={styles.icon}
              />
            </View>

            {/* Kotak */}
            <View style={styles.squaresContainer}>
              <View style={styles.subSquareContainer}>
                {/* Blood Pressure */}
                <View style={styles.containerStatus}>
                  <View style={styles.bulletin}></View>
                  <View style={styles.captCont1}>
                    <Text style={styles.captionNumber}>Blood Pressure</Text>
                    <View style={styles.captCont}>
                      <Text style={styles.captionName}>120/80</Text>
                      <Text style={styles.captionNumber}>mmHg</Text>
                    </View>
                  </View>
                </View>

                {/* Blood Sugar */}
                <View style={styles.containerStatus}>
                  <View style={styles.bulletin}></View>
                  <View style={styles.captCont1}>
                    <Text style={styles.captionNumber}>Blood Sugar</Text>
                    <View style={styles.captCont}>
                      <Text style={styles.captionName}>72</Text>
                      <Text style={styles.captionNumber}>mg/dL</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.subSquareContainer}>
                {/* Heart Rate */}
                <View style={styles.containerStatus}>
                  <View style={styles.bulletin}></View>
                  <View style={styles.captCont1}>
                    <Text style={styles.captionNumber}>Heart Rate</Text>
                    <View style={styles.captCont}>
                      <Text style={styles.captionName}>100</Text>
                      <Text style={styles.captionNumber}>bpm</Text>
                    </View>
                  </View>
                </View>

                {/* Blood Sugar */}
                <View style={styles.containerStatus}>
                  <View style={styles.bulletin}></View>
                  <View style={styles.captCont1}>
                    <Text style={styles.captionNumber}>Weight</Text>
                    <View style={styles.captCont}>
                      <Text style={styles.captionName}>60</Text>
                      <Text style={styles.captionNumber}>kg</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Your Diary */}
          <View>
            <View style={styles.containerReminder}>
              <View style={styles.captionSubtitle}>
                <Text style={styles.subtitle}>Your Diary</Text>
                <TouchableOpacity style={styles.subtitleContainerText}>
                  <Text style={styles.seeAllContainer}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.formContainer}>
                {/* Form */}
                <View style={styles.containerForm}>
                  {/* Symptoms */}
                  <View style={styles.containerInput}>
                    <View style={styles.flexInput}>
                      <Image
                        source={require("@/assets/hcd/symptoms.svg")}
                        style={{ width: 25, height: 25 }}
                        resizeMode="contain"
                      />
                      <Text style={styles.textTitle}>Symptoms</Text>
                    </View>
                    <TextInput
                      style={[
                        styles.descInput,
                        {
                          backgroundColor: COLORS.primary5th,
                        },
                      ]}
                      value={symptoms}
                      onChangeText={setSymptoms}
                      multiline
                    />
                  </View>
                  {/* Mood */}
                  <View style={styles.containerInput}>
                    <View style={styles.flexInput}>
                      <Image
                        source={require("@/assets/hcd/mood.svg")}
                        style={{ width: 25, height: 25 }}
                        resizeMode="contain"
                      />
                      <Text style={styles.textTitle}>Mood</Text>
                    </View>
                    <TextInput
                      style={[
                        styles.descInput,
                        {
                          backgroundColor: COLORS.red3rd,
                        },
                      ]}
                      value={mood}
                      onChangeText={setMood}
                      multiline
                    />
                  </View>
                  {/* Physical Activities */}
                  <View style={styles.containerInput}>
                    <View style={styles.flexInput}>
                      <Image
                        source={require("@/assets/hcd/physicalAct.svg")}
                        style={{ width: 25, height: 25 }}
                        resizeMode="contain"
                      />
                      <Text style={styles.textTitle}>Physical Activities</Text>
                    </View>
                    <TextInput
                      style={[
                        styles.descInput,
                        {
                          backgroundColor: COLORS.secondary5th,
                        },
                      ]}
                      value={activities}
                      onChangeText={setActivities}
                      multiline
                    />
                  </View>
                  {/* Additional Notes */}
                  <View style={styles.containerInput}>
                    <View style={styles.flexInput}>
                      <Image
                        source={require("@/assets/hcd/additionalNotes.svg")}
                        style={{ width: 25, height: 25 }}
                        resizeMode="contain"
                      />
                      <Text style={styles.textTitle}>Additional Notes</Text>
                    </View>
                    <TextInput
                      style={[
                        styles.descInput,
                        {
                          backgroundColor: "#EAEAEA",
                        },
                      ]}
                      value={notes}
                      onChangeText={setNotes}
                      multiline
                    />
                  </View>
                </View>
                <View style={styles.divider} />
                {/* Latest Update */}
                <View style={styles.LatestContainer}>
                  <Text style={styles.latestText}>
                    Latest update 15/09/2025
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
