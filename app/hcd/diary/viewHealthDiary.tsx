import DiaryData from "@/components/hcd/DiaryData";
import { AppointmentCard } from "@/components/meditrack-forms/AppointmentCard";
import {
  convertDrugToReminder,
  ReminderCard,
} from "@/components/meditrack-forms/Reminder";
import { convertAppointment } from "@/components/utils/DateUtils";
import TitleBack from "@/components/utils/TitleBack";
import { initialReminders } from "@/constants/initialData";
import { Reminder } from "@/constants/reminder";
import { useAppointments } from "@/context/AppointmentContext";
import { useDrugs } from "@/context/DrugContext";
import { useFamilyView } from "@/context/FamilyViewContext";
import { useAuthState } from "@/hooks/useAuthState";
import { useDatePickerStyles } from "@/hooks/useDatePicker.styles";
import { useHealthDiary } from "@/hooks/useHealthDiary";
import { styles } from "@/styles/hcd/viewHealthDiary.style";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { stylesMonitor } from "@/styles/utils/monitoring.styles";
import { DiaryEntry } from "@/types/diary";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";

export default function HealthDiary() {
  const { uid: paramUid, isMonitoring } = useLocalSearchParams<{
    uid?: string;
    isMonitoring?: string;
  }>();
  const insets = useSafeAreaInsets();
  const { user } = useAuthState();
  const uid = paramUid || user?.uid;

  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [symptoms, setSymptoms] = useState("");
  const [mood, setMood] = useState("");
  const [activities, setActivities] = useState("");
  const [notes, setNotes] = useState("");
  const { date } = useLocalSearchParams<{ date?: string }>();
  const [selected, setSelected] = useState<DateType>(
    date ? new Date(date) : new Date()
  );
  const datePickerStyle = useDatePickerStyles(
    selected instanceof Date ? selected : new Date()
  );
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const { fetchDiariesByDate } = useHealthDiary();
  const [loading, setLoading] = useState(false);
  const { setViewingUid } = useFamilyView();
  const monitoring =
    isMonitoring === "1" || (paramUid && paramUid !== user?.uid);

  // Fetching data firebase

  const { drugs } = useDrugs();
  const { appointments, remove } = useAppointments();

  function formatDateLocal(date: Date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  const selectedDateKey = selected
    ? formatDateLocal(new Date(selected as Date))
    : formatDateLocal(new Date());

  const todayDrugReminders = drugs
    .filter((d) => d.date === selectedDateKey)
    .map(convertDrugToReminder);

  const todayAppointmentReminders: Reminder[] = appointments
    .filter((a) => a.date === selectedDateKey)
    .map((a) => ({
      ...convertAppointment(a),
      id: `appt-${a.id}`,
      category: "appointment",
      description: a.description ?? "",
      completed: a.status === "done",
    }));

  const todayReminders: Reminder[] = [
    ...todayDrugReminders,
    ...todayAppointmentReminders,
  ].sort((a, b) => a.timeLabel.localeCompare(b.timeLabel));
  // console.log(todayAppointmentReminders);
  console.log(selectedDateKey);
  console.log(todayDrugReminders);
  console.log("All drugs:", drugs);
  // console.log("All appointments:", appointments);

  // Fetching Diary
  useEffect(() => {
    if (!uid) return;

    const fetchDiary = async () => {
      setLoading(true);
      const res = await fetchDiariesByDate(selectedDateKey, uid);
      if (res.success && res.data) {
        setDiaries(res.data);
      } else {
        setDiaries([]);
      }
      setLoading(false);
    };

    fetchDiary();
  }, [selected, uid]);

  const diaryData = diaries[0];

  const handleEditDrug = useCallback((reminder: Reminder) => {
    router.push({
      pathname: "/meditrack/drugForm",
      params: {
        editMode: "true",
        drugId: reminder.id,
      },
    });
  }, []);

  const handleEditAppointment = useCallback((appointment: any) => {
    router.push({
      pathname: "/meditrack/appointmentForm",
      params: {
        editMode: "true",
        appointmentId: appointment.id,
      },
    });
  }, []);

  const handleSeeAll = useCallback((section: string) => {
    if (section === "today-reminders") {
      router.push("/meditrack/alltodayreminder");
    } else if (section === "all-medications") {
      router.push("/meditrack/allremindercard");
    } else if (section === "upcoming-appointments") {
      router.push("/meditrack/allupcomingappointment");
    } else if (section === "history-appointments") {
      router.push("/meditrack/allhistoryappointment");
    }
  }, []);
  const handleSeeDetail = useCallback((appointment: any) => {
    router.push({
      pathname: "/meditrack/appointmentForm",
      params: {
        editMode: "true",
        appointmentId: appointment.id,
      },
    });
  }, []);
  const handleToggleReminder = useCallback((id: string) => {
    console.log(id);
  }, []);
  const handleDeleteAppointment = async (appointment: any) => {
    Alert.alert("Delete Appointment", `Delete "${appointment.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await remove(appointment.id);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: NAV_ITEMS + insets.bottom + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {!monitoring && <TitleBack title="Health Diary" />}

        {monitoring && (
          <TouchableOpacity
            style={stylesMonitor.banner}
            onPress={() => {
              setViewingUid(user!.uid);
              router.push("/family-mode/familyMode");
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Back to my account
            </Text>
          </TouchableOpacity>
        )}

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
                    onPress={() => router.push("/meditrack/mediTrack")}
                  >
                    Add Event
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* --- Map Reminder--- */}
          <View style={styles.section}>
            {todayReminders.length === 0 ? (
              <Text style={{ textAlign: "center", color: "gray" }}>
                No reminders today
              </Text>
            ) : (
              todayReminders.map((reminder) => (
                <View key={reminder.id} style={styles.reminderRow}>
                  {/* Time label di kiri */}
                  <View style={styles.reminderTimesCard}>
                    <Text style={styles.reminderTime}>
                      {reminder.timeLabel}
                    </Text>
                  </View>

                  {/* Card */}
                  <View style={styles.reminderCardS}>
                    {reminder.category === "drug" ? (
                      <ReminderCard
                        key={reminder.id}
                        reminder={reminder}
                        onToggle={handleToggleReminder}
                        showActions={true}
                        onEdit={handleEditDrug}
                      />
                    ) : (
                      <AppointmentCard
                        key={reminder.id}
                        appointment={reminder}
                        onPressDetail={() => handleSeeDetail(reminder)}
                        onEdit={handleEditAppointment}
                        onDelete={handleDeleteAppointment}
                        showActions={true}
                        showTime={false}
                        showLocation={false}
                        showDetails={false}
                      />
                    )}
                  </View>
                </View>
              ))
            )}

            {/* View All */}
            {todayReminders.length > 0 && (
              <TouchableOpacity
                onPress={() => router.push("/hcd/diary/remindersAll")}
                style={{ marginTop: 8 }}
              >
                <Text style={styles.seeAllReminder}>View All</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Diary Data */}
          <View>
            {diaryData ? (
              <DiaryData
                diaryData={diaryData}
                selectedDateKey={selectedDateKey}
                setSymptoms={setSymptoms}
                setMood={setMood}
                setActivities={setActivities}
                setNotes={setNotes}
              />
            ) : (
              <View style={styles.containerContentDiary}>
                <Text style={styles.emptyText}>No diary entries yet</Text>
                <View style={styles.containerContentEmpty}>
                  <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => router.push("/hcd/diary/createDiary")}
                  >
                    <Text style={styles.createButtonText}>
                      + Create New Diary
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
