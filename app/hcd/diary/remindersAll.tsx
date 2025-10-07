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
import { useAuthState } from "@/hooks/useAuthState";
import { useHealthDiary } from "@/hooks/useHealthDiary";
import { styles } from "@/styles/hcd/viewHealthDiary.style";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { DiaryEntry } from "@/types/diary";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { DateType } from "react-native-ui-datepicker";

export default function ReminderPageAll() {
  const insets = useSafeAreaInsets();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const { appointments, remove } = useAppointments();
  const { drugs } = useDrugs();
  const { date } = useLocalSearchParams<{ date?: string }>();
  const [selected, setSelected] = useState<DateType>(
    date ? new Date(date) : new Date()
  );
  const { user } = useAuthState();
  const { uid: paramUid, isMonitoring } = useLocalSearchParams<{
    uid?: string;
    isMonitoring?: string;
  }>();
  const uid = paramUid || user?.uid;
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const { fetchDiariesByDate } = useHealthDiary();
  const [loading, setLoading] = useState(false);

  function getStartTime(timeLabel: string) {
    const m = timeLabel.match(/\d{1,2}:\d{2}/);
    return m ? m[0] : "00:00";
  }

  const [selectedDateKey, setSelectedDateKey] = useState(
    date ? date : formatDateLocal(new Date())
  );

  function formatDateLocal(date: Date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Fetching Diary
  useEffect(() => {
    if (!uid) return;
    if (!selectedDateKey) return;

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

    const allReminders: Reminder[] = [
      ...todayDrugReminders,
      ...todayAppointmentReminders,
    ].sort((a, b) => a.timeLabel.localeCompare(b.timeLabel));

    setReminders(allReminders);

    // Optional: Fetch diary
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
  }, [uid, drugs, appointments, selectedDateKey]);

  const diaryData = diaries[0];
  const handleToggleReminder = useCallback((id: string) => {
    setReminders((prev) => {
      const existed = prev.find((r) => r.id === id);
      if (existed) {
        return prev.map((r) =>
          r.id === id ? { ...r, completed: !r.completed } : r
        );
      } else {
        return prev;
      }
    });
  }, []);
  const todaySchedules = initialReminders;
  const todayReminders = [...todaySchedules].sort((a, b) =>
    getStartTime(a.timeLabel).localeCompare(getStartTime(b.timeLabel))
  );
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

  const handleSeeDetail = useCallback((appointment: any) => {
    router.push({
      pathname: "/meditrack/appointmentForm",
      params: {
        editMode: "true",
        appointmentId: appointment.id,
      },
    });
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
        {/* Header */}
        <View style={styles.headerContainer}>
          <TitleBack title="All Reminder" />
        </View>

        <View style={styles.section}>
          {reminders.length === 0 ? (
            <Text style={{ textAlign: "center", color: "gray" }}>
              No reminders today
            </Text>
          ) : (
            reminders.map((reminder) => (
              <View key={reminder.id} style={styles.reminderRow}>
                {/* Time label di kiri */}
                <View style={styles.reminderTimesCard}>
                  <Text style={styles.reminderTime}>{reminder.timeLabel}</Text>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
