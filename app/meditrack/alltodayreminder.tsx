import { AppointmentCard } from "@/components/meditrack-forms/AppointmentCard";
import { ReminderCard } from "@/components/meditrack-forms/Reminder";
import { SectionHeader } from "@/components/meditrack-forms/TextMediTrack";
import { convertAppointment } from "@/components/utils/DateUtils";
import { useAppointments } from "@/context/AppointmentContext";
import { useDrugs } from "@/context/DrugContext";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/meditrack/all-today-reminder.styles";

const AllTodayRemindersScreen: React.FC = () => {
  const { drugs, remove: removeDrug } = useDrugs();
  const { appointments, remove: removeAppointment } = useAppointments();

  const todayDrugs = useMemo(() => {
    const today = new Date();
    const todayString = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return drugs.filter((drug) => drug.date === todayString);
  }, [drugs]);

  const todayAppointments = useMemo(() => {
    const today = new Date();
    const todayString = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return appointments.filter((appt) => appt.date === todayString);
  }, [appointments]);

  const allTodayReminders = useMemo(() => {
    const drugItems = todayDrugs.map((drug) => ({
      ...drug,
      type: "drug" as const,
      displayDate: drug.date,
    }));

    const appointmentItems = todayAppointments.map((appt) => ({
      ...appt,
      type: "appointment" as const,
      displayDate: appt.date,
    }));

    return [...drugItems, ...appointmentItems].sort((a, b) => {
      const timeA = a.type === "drug" ? a.times[0] : a.startTime;
      const timeB = b.type === "drug" ? b.times[0] : b.startTime;

      const [hoursA, minutesA] = timeA.split(":").map(Number);
      const [hoursB, minutesB] = timeB.split(":").map(Number);

      return hoursA * 60 + minutesA - (hoursB * 60 + minutesB);
    });
  }, [todayDrugs, todayAppointments]);

  const handleToggleReminder = (id: string) => {
    console.log(id);
  };

  const handleDeleteDrug = async (drug: any) => {
    Alert.alert(
      "Delete Medication",
      `Are you sure you want to delete "${drug.drugName}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await removeDrug(drug.id);
            } catch (err) {
              console.error(err);
            }
          },
        },
      ]
    );
  };

  const handleDeleteAppointment = async (appointment: any) => {
    Alert.alert(
      "Delete Appointment",
      `Are you sure you want to delete "${appointment.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await removeAppointment(appointment.id);
            } catch (err) {
              console.error(err);
            }
          },
        },
      ]
    );
  };

  const handleEditDrug = (drug: any) => {
    router.push({
      pathname: "/meditrack/drugForm",
      params: {
        editMode: "true",
        drugId: drug.id,
      },
    });
  };

  const handleEditAppointment = (appointment: any) => {
    router.push({
      pathname: "/meditrack/appointmentForm",
      params: {
        editMode: "true",
        appointmentId: appointment.id,
      },
    });
  };

  const handleSeeDetail = (appointment: any) => {
    router.push({
      pathname: "/meditrack/appointmentForm",
      params: {
        editMode: "true",
        appointmentId: appointment.id,
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image
            source={require("../../assets/utilsIcon/arrow-left.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Today&apos;s Reminders</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeaderWrapper}>
          <SectionHeader
            title="Today's Reminders"
            subtitle=""
            onPressSeeAll={() => {}}
            countLabel={`${allTodayReminders.length} reminder${
              allTodayReminders.length !== 1 ? "s" : ""
            }`}
          />
        </View>

        <View style={styles.remindersContainer}>
          {allTodayReminders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No Reminders Today</Text>
              <Text style={styles.emptyText}>
                You don&apos;t have any reminders for today.{"\n"}
                Add medications or appointments to stay on track!
              </Text>
            </View>
          ) : (
            allTodayReminders.map((item) =>
              item.type === "drug" ? (
                <ReminderCard
                  key={`drug-${item.id}`}
                  reminder={{
                    id: item.id,
                    title: item.drugName,
                    description: item.description,
                    date: item.date,
                    times: item.times,
                    category: "drug",
                    drugCategory: item.category,
                    timeLabel: item.times.join(", "),
                    completed: item.isCompleted,
                    repeatDays: item.repeatDays || [],
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    userId: "",
                    drugId: item.id,
                  }}
                  onToggle={handleToggleReminder}
                  onEdit={() => handleEditDrug(item)}
                  onDelete={() => handleDeleteDrug(item)}
                  showActions={true}
                />
              ) : (
                <AppointmentCard
                  key={`appt-${item.id}`}
                  appointment={convertAppointment(item)}
                  onPressDetail={handleSeeDetail}
                  onEdit={() => handleEditAppointment(item)}
                  onDelete={() => handleDeleteAppointment(item)}
                  showActions={true}
                />
              )
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllTodayRemindersScreen;
