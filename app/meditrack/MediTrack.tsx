import { AppointmentCard } from "@/components/meditrack-forms/AppointmentCard";
import { ReminderToggle } from "@/components/meditrack-forms/HeaderMediTrack";
import { HistoryCard } from "@/components/meditrack-forms/HistoryCard";
import { ReminderCard } from "@/components/meditrack-forms/Reminder";
import { SectionHeader } from "@/components/meditrack-forms/TextMediTrack";
import type { Appointment } from "@/constants/appointment";

import {
  initialAppointments,
  initialReminders,
} from "@/./constants/initialData";
import type { Reminder, ReminderCategory } from "@/constants/reminder";
import type React from "react";
import { useCallback, useMemo, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { styles } from "../../styles/meditrack/medistrack.style";

const ScheduleScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const [selectedCategory, setSelectedCategory] =
    useState<ReminderCategory>("appointment");
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  // Filter upcoming and history appointments
  const upcomingAppointments = useMemo(
    () =>
      appointments.filter((appointment) => appointment.status === "upcoming"),
    [appointments]
  );
  const historyAppointments = useMemo(
    () =>
      appointments.filter((appointment) => appointment.status === "history"),
    [appointments]
  );

  const handleToggleReminder = useCallback((id: string) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  }, []);

  const handleSeeDetail = useCallback((appointment: Appointment) => {
    console.log("[ScheduleScreen] See detail tapped for:", appointment.id);
  }, []);

  const handleSeeAll = useCallback((section: string) => {
    console.log("[ScheduleScreen] See all for:", section);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background2nd}
      />
      <ScrollView
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 200,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.title}>Schedule</Text>
          <TouchableOpacity style={styles.notifications}>
            <Image
              source={require("@/assets/utilsIcon/notification.png")}
              style={{ width: 41, height: 41 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <ReminderToggle
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <View style={styles.section}>
          <SectionHeader
            title="Today Reminder"
            subtitle="See All"
            onPressSeeAll={() => handleSeeAll("today-reminders")}
            countLabel={""}
          />
          {reminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onToggle={handleToggleReminder}
            />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Upcoming Appointment"
            subtitle="See All"
            countLabel={`${upcomingAppointments.length} Appointment`}
            onPressSeeAll={() => handleSeeAll("upcoming-appointments")}
          />
          {upcomingAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onPressDetail={handleSeeDetail}
            />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Appointment History"
            subtitle="See All"
            onPressSeeAll={() => handleSeeAll("appointment-history")}
            countLabel={""}
          />
          {historyAppointments.map((appointment) => (
            <HistoryCard
              key={appointment.id}
              appointment={appointment}
              onPressDetail={handleSeeDetail}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScheduleScreen;
