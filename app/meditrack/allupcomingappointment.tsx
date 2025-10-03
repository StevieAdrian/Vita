import { AppointmentCard } from "@/components/meditrack-forms/AppointmentCard";
import { SectionHeader } from "@/components/meditrack-forms/TextMediTrack";
import { convertAppointment } from "@/components/utils/DateUtils";
import { useAppointments } from "@/context/AppointmentContext";
import { router } from "expo-router";
import React, { useCallback, useMemo } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/meditrack/all-upcoming-appointment.styles";

const AllUpcomingAppointmentScreen: React.FC = () => {
  const { appointments, remove } = useAppointments();

  const upcomingAppointments = useMemo(() => {
    const now = new Date();

    return appointments
      .filter((appt) => {
        try {
          const appointmentDate = new Date(appt.date);
          const [hours, minutes] = appt.startTime.split(":");
          appointmentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          return appointmentDate >= now;
        } catch {
          return false;
        }
      })
      .sort((a, b) => {
        const dateA = new Date(a.date + "T" + a.startTime);
        const dateB = new Date(b.date + "T" + b.startTime);
        return dateA.getTime() - dateB.getTime();
      });
  }, [appointments]);

  const handleSeeDetail = useCallback((appointment: any) => {
    router.push({
      pathname: "/meditrack/appointmentForm",
      params: {
        editMode: "true",
        appointmentId: appointment.id,
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
        <Text style={styles.headerTitle}>Upcoming Appointments</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeaderWrapper}>
          <SectionHeader
            title="Upcoming Appointments"
            subtitle=""
            onPressSeeAll={() => {}}
            countLabel={`${upcomingAppointments.length} appointment${
              upcomingAppointments.length !== 1 ? "s" : ""
            }`}
          />
        </View>

        <View style={styles.appointmentsContainer}>
          {upcomingAppointments.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No Upcoming Appointments</Text>
              <Text style={styles.emptyText}>
                You don&apos;t have any upcoming appointments.{"\n"}
                Schedule new appointments to stay on track!
              </Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllUpcomingAppointmentScreen;
