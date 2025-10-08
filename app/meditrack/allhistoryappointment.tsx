import { HistoryCard } from "@/components/meditrack-forms/HistoryCard";
import { convertAppointment } from "@/components/utils/DateUtils";
import TitleBack from "@/components/utils/TitleBack";
import { useAppointments } from "@/context/AppointmentContext";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/meditrack/all-history-appointment.styles";

const AllHistoryAppointmentScreen: React.FC = () => {
  const { appointments } = useAppointments();

  const historyAppointments = useMemo(() => {
    const now = new Date();

    return appointments
      .filter((appt) => {
        try {
          const appointmentDate = new Date(appt.date);
          const [hours, minutes] = appt.startTime.split(":");
          appointmentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          return appointmentDate < now;
        } catch {
          return false;
        }
      })
      .sort((a, b) => {
        const dateA = new Date(a.date + "T" + a.startTime);
        const dateB = new Date(b.date + "T" + b.startTime);
        return dateB.getTime() - dateA.getTime();
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
        <TitleBack title="Today's Reminders" />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.appointmentsContainer}>
          <Text style={styles.totalRem}>
            {historyAppointments.length} histories
          </Text>
          {historyAppointments.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No Appointment History</Text>
              <Text style={styles.emptyText}>
                Your appointment history will appear here.{"\n"}
                Completed appointments will be shown in this section.
              </Text>
            </View>
          ) : (
            historyAppointments.map((appointment) => (
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

export default AllHistoryAppointmentScreen;
