import { AppointmentCard } from "@/components/meditrack-forms/AppointmentCard";
import { ReminderToggle } from "@/components/meditrack-forms/HeaderMediTrack";
import {
  ReminderCard,
  convertDrugToReminder,
} from "@/components/meditrack-forms/Reminder";
import { SectionHeader } from "@/components/meditrack-forms/TextMediTrack";
import { convertAppointment } from "@/components/utils/DateUtils";
import type { Reminder, ReminderCategory } from "@/constants/reminder";
import { useAppointments } from "@/context/AppointmentContext";
import { useDrugs } from "@/context/DrugContext";
import { router } from "expo-router";
import type React from "react";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

  const { drugs, loading: drugsLoading } = useDrugs();
  const {
    appointments: appointmentReminders,
    loading: appointmentsLoading,
    remove,
  } = useAppointments();

  const drugReminders = useMemo(
    () => drugs.map(convertDrugToReminder),
    [drugs]
  );

  const upcomingAppointments = useMemo(() => {
    const now = new Date();

    return appointmentReminders.filter((appt) => {
      try {
        const appointmentDate = new Date(appt.date);
        const [hours, minutes] = appt.startTime.split(":");
        appointmentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        return appointmentDate >= now;
      } catch {
        return false;
      }
    });
  }, [appointmentReminders]);

  const historyAppointments = useMemo(() => {
    const now = new Date();

    return appointmentReminders.filter((appt) => {
      try {
        const appointmentDate = new Date(appt.date);
        const [hours, minutes] = appt.startTime.split(":");
        appointmentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        return appointmentDate < now;
      } catch {
        return false;
      }
    });
  }, [appointmentReminders]);

  const handleToggleReminder = useCallback((id: string) => {
    console.log(id);
  }, []);

  const handleSeeDetail = useCallback(
    (appointment: any) => {

      router.push({
        pathname: "/meditrack/appointmentForm",
        params: {
          editMode: "true",
          appointmentId: appointment.id,
        },
      });
    },
    []
  );

  const handleEditDrug = useCallback(
    (reminder: Reminder) => {
      router.push({
        pathname: "/meditrack/drugForm",
        params: {
          editMode: "true",
          drugId: reminder.id,
        },
      });
    },
    []
  );
  const limitedDrugReminders = useMemo(() => {
    return drugReminders.slice(0, 3);
  }, [drugReminders]);

  {
    limitedDrugReminders.map((reminder) => (
      <ReminderCard
        key={reminder.id}
        reminder={reminder}
        onToggle={handleToggleReminder}
        onEdit={handleEditDrug}
        showActions={true}
      />
    ));
  }

  const handleEditAppointment = useCallback(
    (appointment: any) => {
      router.push({
        pathname: "/meditrack/appointmentForm",
        params: {
          editMode: "true",
          appointmentId: appointment.id,
        },
      });
    },
    []
  );

  const handleSeeAll = useCallback((section: string) => {
    if (section === "today-reminders") {
      router.push("/meditrack/allremindercard");
    }
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
            subtitle="See All >"
            onPressSeeAll={() => handleSeeAll("today-reminders")}
            countLabel={
              drugReminders.length > 0
                ? `${drugReminders.length} Reminders`
                : ""
            }
          />

          {limitedDrugReminders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No reminders for today</Text>
            </View>
          ) : (
            limitedDrugReminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onToggle={handleToggleReminder}
                onEdit={handleEditDrug}
                showActions={true}
              />
            ))
          )}
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Upcoming Appointment"
            subtitle="See All >"
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
                appointment={convertAppointment(appointment)}
                onPressDetail={handleSeeDetail} 
                onEdit={handleEditAppointment} 
                onDelete={handleDeleteAppointment}
                showActions={true}
              />
            ))
          )}
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Appointment History"
            subtitle="See All >"
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
                appointment={convertAppointment(appointment)}
                onPressDetail={handleSeeDetail} 
                showActions={false} 
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScheduleScreen;
