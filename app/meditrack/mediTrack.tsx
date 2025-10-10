import UpHeader from "@/components/hcd/UpHeader";
import { AppointmentCard } from "@/components/meditrack-forms/AppointmentCard";
import { ReminderToggle } from "@/components/meditrack-forms/HeaderMediTrack";
import { HistoryCard } from "@/components/meditrack-forms/HistoryCard";
import AppointmentNotification from "@/components/meditrack-forms/notifcations/AppoinmentNotification";
import DrugNotification from "@/components/meditrack-forms/notifcations/DrugNotification";
import {
  ReminderCard,
  convertDrugToReminder,
} from "@/components/meditrack-forms/Reminder";
import { SectionHeader } from "@/components/meditrack-forms/TextMediTrack";
import { convertAppointment } from "@/components/utils/DateUtils";
import type { Reminder, ReminderCategory } from "@/constants/reminder";
import { useAppointments } from "@/context/AppointmentContext";
import { useDrugs } from "@/context/DrugContext";
import { useRealTimeNotifications } from "@/hooks/useRealTimeNotification";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { AppointmentReminder } from "@/types/appointment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  Text,
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

  const { drugs, loading: drugsLoading, removeExpiredDrugs } = useDrugs();
  const {
    appointments: appointmentReminders,
    loading: appointmentsLoading,
    remove,
  } = useAppointments();
  const {
    scheduleDrugNotification,
    scheduleAppointmentNotification,
    registerForPushNotifications,
  } = useRealTimeNotifications();

  const [showDrugNotification, setShowDrugNotification] = useState(false);
  const [showAppointmentNotification, setShowAppointmentNotification] =
    useState(false);
  const [currentDrugReminder, setCurrentDrugReminder] = useState<any>(null);
  const [currentAppointment, setCurrentAppointment] = useState<any>(null);

  const drugReminders = useMemo(
    () => drugs.map(convertDrugToReminder),
    [drugs]
  );

  const todayString = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const todayDrugReminders = useMemo(() => {
    return drugReminders.filter((reminder) => reminder.date === todayString);
  }, [drugReminders, todayString]);

  const todayAppointments = useMemo(() => {
    const today = new Date();
    const todayString = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return appointmentReminders.filter((appt) => {
      return appt.date === todayString;
    });
  }, [appointmentReminders]);

  const upcomingAppointments = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return appointmentReminders.filter((appt) => {
      try {
        const appointmentDate = new Date(appt.date);
        appointmentDate.setHours(0, 0, 0, 0);
        return appointmentDate > today;
      } catch {
        return false;
      }
    });
  }, [appointmentReminders]);

  const historyAppointments = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return appointmentReminders.filter((appt) => {
      try {
        const appointmentDate = new Date(appt.date);
        appointmentDate.setHours(0, 0, 0, 0);
        return appointmentDate < today;
      } catch {
        return false;
      }
    });
  }, [appointmentReminders]);

  const todayReminders = useMemo(() => {
    const drugItems = todayDrugReminders.map((reminder) => ({
      ...reminder,
      type: "drug" as const,
    }));

    const appointmentItems = todayAppointments.map((appt) => ({
      ...convertAppointment(appt),
      type: "appointment" as const,
      id: `appt-${appt.id}`,
      isAppointment: true,
    }));

    return [...drugItems, ...appointmentItems];
  }, [todayDrugReminders, todayAppointments]);

  const limitedTodayReminders = useMemo(() => {
    return todayReminders.slice(0, 3);
  }, [todayReminders]);

  const limitedAllDrugs = useMemo(() => {
    return drugReminders.slice(0, 3);
  }, [drugReminders]);

  const limitedUpcomingAppointments = useMemo(() => {
    return upcomingAppointments.slice(0, 3);
  }, [upcomingAppointments]);

  const limitedHistoryAppointments = useMemo(() => {
    return historyAppointments.slice(0, 3);
  }, [historyAppointments]);

  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      const currentDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      drugs.forEach((drug) => {
        if (drug.date === currentDate && !drug.isCompleted) {
          drug.times.forEach((time) => {
            const [hours, minutes] = time.split(":").map(Number);
            const reminderTime = hours * 60 + minutes;

            if (Math.abs(currentTime - reminderTime) <= 1) {
              setCurrentDrugReminder(drug);
              setShowDrugNotification(true);
            }
          });
        }
      });

      todayAppointments.forEach((appointment) => {
        if (!appointment.isCompleted) {
          const [hours, minutes] = appointment.startTime.split(":").map(Number);
          const appointmentTime = hours * 60 + minutes;

          if (Math.abs(currentTime - appointmentTime) <= 1) {
            setCurrentAppointment(appointment);
            setShowAppointmentNotification(true);
          }
        }
      });
    };

    const interval = setInterval(checkNotifications, 60000);
    checkNotifications();

    return () => clearInterval(interval);
  }, [drugs, todayAppointments]);

  useEffect(() => {
    const checkDaily = async () => {
      try {
        const today = new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const lastCheck = await AsyncStorage.getItem("lastExpiredCheck");

        if (lastCheck !== today) {
          await removeExpiredDrugs();
          await AsyncStorage.setItem("lastExpiredCheck", today);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const interval = setInterval(checkDaily, 60 * 60 * 1000);
    checkDaily();
    return () => clearInterval(interval);
  }, [removeExpiredDrugs]);

  useEffect(() => {
    registerForPushNotifications();

    drugs.forEach((drug) => {
      if (!drug.isCompleted) {
        scheduleDrugNotification(drug);
      }
    });

    appointmentReminders.forEach((appointment: AppointmentReminder) => {
      if (!appointment.isCompleted) {
        scheduleAppointmentNotification(appointment);
      }
    });
  }, [
    drugs,
    appointmentReminders,
    scheduleDrugNotification,
    scheduleAppointmentNotification,
    registerForPushNotifications,
  ]);


  const handleToggleReminder = useCallback((id: string) => {
    console.log(id);
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

  const handleMarkAsDoneDrug = (id: string) => {
    setShowDrugNotification(false);
  };

  const handleMarkAsDoneAppointment = (id: string) => {
    setShowAppointmentNotification(false);
  };

  const handleEditDrugFromNotification = (id: string) => {
    setShowDrugNotification(false);
    router.push({
      pathname: "/meditrack/drugForm",
      params: {
        editMode: "true",
        drugId: id,
      },
    });
  };

  const handleEditAppointmentFromNotification = (id: string) => {
    setShowAppointmentNotification(false);
    router.push({
      pathname: "/meditrack/appointmentForm",
      params: {
        editMode: "true",
        appointmentId: id,
      },
    });
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
      <LinearGradient
        colors={["#E9F3FF", "#1A73E8"]}
        style={styles.dashboardContainerLinear}
      ></LinearGradient>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background2nd}
      />

      <DrugNotification
        isVisible={showDrugNotification && currentDrugReminder !== null}
        onClose={() => setShowDrugNotification(false)}
        onMarkAsDone={handleMarkAsDoneDrug}
        onEditReminder={handleEditDrugFromNotification}
        reminder={currentDrugReminder}
      />

      <AppointmentNotification
        isVisible={showAppointmentNotification && currentAppointment !== null}
        onClose={() => setShowAppointmentNotification(false)}
        onMarkAsDone={handleMarkAsDoneAppointment}
        onEditAppointment={handleEditAppointmentFromNotification}
        appointment={currentAppointment}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: NAV_ITEMS + insets.bottom + 16 },
        ]}
      >
        <View style={styles.header}>
          <UpHeader title="Schedule" showProfile={false} />
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
              todayReminders.length > 0
                ? `${todayReminders.length} Reminders`
                : ""
            }
          />

          {limitedTodayReminders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No reminders for today</Text>
            </View>
          ) : (
            limitedTodayReminders.map((item) =>
              item.type === "drug" ? (
                <ReminderCard
                  key={item.id}
                  reminder={item}
                  onToggle={handleToggleReminder}
                  onEdit={handleEditDrug}
                  showActions={true}
                />
              ) : (
                <AppointmentCard
                  key={item.id}
                  appointment={item}
                  onPressDetail={handleSeeDetail}
                  onEdit={handleEditAppointment}
                  onDelete={handleDeleteAppointment}
                  showActions={true}
                />
              )
            )
          )}
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="All Medications"
            subtitle="See All >"
            onPressSeeAll={() => handleSeeAll("all-medications")}
            countLabel={
              drugReminders.length > 0
                ? `${drugReminders.length} Medications`
                : ""
            }
          />
          {limitedAllDrugs.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No medications added</Text>
            </View>
          ) : (
            limitedAllDrugs.map((reminder) => (
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
          {limitedUpcomingAppointments.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No upcoming appointments</Text>
            </View>
          ) : (
            limitedUpcomingAppointments.map((appointment) => (
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
            onPressSeeAll={() => handleSeeAll("history-appointments")}
            countLabel={""}
          />
          {limitedHistoryAppointments.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No appointment history</Text>
            </View>
          ) : (
            limitedHistoryAppointments.map((appointment) => (
              <HistoryCard
                key={appointment.id}
                appointment={convertAppointment(appointment)}
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
