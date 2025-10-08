import { AppointmentCard } from "@/components/meditrack-forms/AppointmentCard";
import { convertAppointment } from "@/components/utils/DateUtils";
import TitleBack from "@/components/utils/TitleBack";
import { useAppointments } from "@/context/AppointmentContext";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/meditrack/all-upcoming-appointment.styles";

const AllUpcomingAppointmentScreen: React.FC = () => {
  const { appointments, remove } = useAppointments();

  const upcomingAppointments = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return appointments
      .filter((appt) => {
        try {
          const appointmentDate = new Date(appt.date);
          appointmentDate.setHours(0, 0, 0, 0);

          return appointmentDate >= tomorrow;
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
      <LinearGradient
        colors={["#E9F3FF", "#1A73E8"]}
        style={styles.dashboardContainerLinear}
      ></LinearGradient>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TitleBack title="Upcoming Reminder" />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.appointmentsContainer}>
          <Text style={styles.totalRem}>
            {upcomingAppointments.length} upcoming appointments
          </Text>
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
