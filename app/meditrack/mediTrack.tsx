import { AppointmentCard } from "@/components/meditrack-forms/AppointmentCard";
import { ReminderToggle } from "@/components/meditrack-forms/HeaderMediTrack";
import {
  ReminderCard,
  convertDrugToReminder,
} from "@/components/meditrack-forms/Reminder";
import { SectionHeader } from "@/components/meditrack-forms/TextMediTrack";
import { useAppointments } from "@/hooks/useAppointment";
import { useDrugForm } from "@/hooks/useDrug";

import type { ReminderCategory } from "@/constants/reminder";
import type React from "react";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { styles } from "../../styles/meditrack/medistrack.style";

const ScheduleScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] =
    useState<ReminderCategory>("appointment");

  // INTEGRASI DATABASE
  const { drug: drugs, loading: drugsLoading } = useDrugForm();
  const { appointments: appointmentReminders, loading: appointmentsLoading } =
    useAppointments();

  // Convert drugs to reminders
  const drugReminders = useMemo(
    () => drugs.map(convertDrugToReminder),
    [drugs]
  );

 
  const upcomingAppointments = useMemo(() => {
    return appointmentReminders.filter((appt: any) => {
      if (appt.status === "upcoming") return true;
      if (appt.status === "history") return false;

      try {
        const appointmentDate = new Date(appt.date);
        return appointmentDate >= new Date();
      } catch {
        return true;
      }
    });
  }, [appointmentReminders]);

  const historyAppointments = useMemo(() => {
    return appointmentReminders.filter((appt: any) => {
      if (appt.status === "history") return true;
      if (appt.status === "upcoming") return false;

      try {
        const appointmentDate = new Date(appt.date);
        return appointmentDate < new Date();
      } catch {
        return false; 
      }
    });
  }, [appointmentReminders]);


  // Handle toggle reminder
  const handleToggleReminder = useCallback((id: string) => {
    // Logic toggle (bisa ditambahkan update ke DB jika needed)
    console.log("Toggle reminder:", id);
  }, []);

  const handleSeeDetail = useCallback((appointment: any) => {
    console.log("[ScheduleScreen] See detail tapped for:", appointment.id);
  }, []);

  const handleSeeAll = useCallback((section: string) => {
    console.log("[ScheduleScreen] See all for:", section);
  }, []);

  // Loading state
  if (drugsLoading || appointmentsLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View
          style={[
            styles.container,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={{ marginTop: 10, color: COLORS.gray2 }}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
        contentContainerStyle={{ paddingBottom: insets.bottom + 200 }}
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
            countLabel={
              drugReminders.length > 0
                ? `${drugReminders.length} Reminders`
                : ""
            }
          />
          {drugReminders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No reminders for today</Text>
            </View>
          ) : (
            drugReminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onToggle={handleToggleReminder}
              />
            ))
          )}
        </View>
        {/* UPCOMING APPOINTMENTS SECTION */}
        <View style={styles.section}>
          <SectionHeader
            title="Upcoming Appointment"
            subtitle="See All"
            countLabel={`${upcomingAppointments.length} Appointment${
              upcomingAppointments.length !== 1 ? "s" : ""
            }`}
            onPressSeeAll={() => handleSeeAll("upcoming-appointments")}
          />
          {upcomingAppointments.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No upcoming appointments</Text>
            </View>
          ) : (
            upcomingAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onPressDetail={handleSeeDetail}
              />
            ))
          )}
        </View>
        {/* APPOINTMENT HISTORY SECTION */}
        <View style={styles.section}>
          <SectionHeader
            title="Appointment History"
            subtitle="See All"
            onPressSeeAll={() => handleSeeAll("appointment-history")}
            countLabel={
              historyAppointments.length > 0
                ? `${historyAppointments.length} Appointment${
                    historyAppointments.length !== 1 ? "s" : ""
                  }`
                : ""
            }
          />
          {historyAppointments.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No appointment history</Text>
            </View>
          ) : (
            historyAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onPressDetail={handleSeeDetail}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScheduleScreen;
