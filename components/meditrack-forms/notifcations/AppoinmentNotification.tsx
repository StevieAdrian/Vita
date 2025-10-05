import { styles } from "@/styles/meditrack/appointment-notification.styles";
import type { AppointmentReminder } from "@/types/appointment";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AppointmentNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  onMarkAsDone: (id: string) => void;
  onEditAppointment: (id: string) => void;
  appointment: AppointmentReminder;
}

const AppointmentNotification: React.FC<AppointmentNotificationProps> = ({
  isVisible,
  onClose,
  onMarkAsDone,
  onEditAppointment,
  appointment,
}) => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      slideAnim.setValue(300);
      fadeAnim.setValue(0);

      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 300,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fadeAnim, isVisible, slideAnim]);

  if (!appointment) {
    return null;
  }
  
  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      "General Check-up": "General Check-up",
      "Doctor Follow-up / Control": "Doctor Follow-up",
      "Specialist Appointment": "Specialist",
      "Laboratory Test / Blood Test": "Laboratory Test",
      "Immunization / Vaccine": "Immunization",
      "Dental Appointment": "Dental",
      "Pregnancy / Pediatric Check-up": "Pregnancy/Pediatric",
      Other: "Other Appointment",
    };
    return labels[category] || category;
  };

  const handleMarkAsDone = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onMarkAsDone(appointment.id);
      onClose();
    });
  };

  const handleEditAppointment = () => {
    onEditAppointment(appointment.id);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.centeredView, { opacity: fadeAnim }]}>
        <Animated.View
          style={[styles.modalView, { transform: [{ translateY: slideAnim }] }]}
        >
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Appointment Time!</Text>

          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Image
                source={require("@/assets/mediTrack/medical-white.png")}
                style={styles.categoryImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.iconLabel}>
              {getCategoryLabel(appointment.category)}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Description</Text>
            <Text style={styles.cardContent}>
              {appointment.description || `Appointment: ${appointment.title}`}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Image
                source={require("@/assets/mediTrack/doctor-logo.png")}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>{appointment.medicalStaff}</Text>
            </View>

            <View style={styles.infoBox}>
              <Image
                source={require("@/assets/mediTrack/location-logo.png")}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>{appointment.location}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Time</Text>
            <View style={styles.timeBubble}>
              <Image
                source={require("@/assets/mediTrack/dark-clock.png")}
                style={styles.clockIcon}
              />
              <Text style={styles.timeText}>
                {appointment.startTime} - {appointment.endTime}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.markAsDoneButton}
            onPress={handleMarkAsDone}
          >
            <Text style={styles.markAsDoneButtonText}>Mark As Done</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editReminderButton}
            onPress={handleEditAppointment}
          >
            <Text style={styles.editReminderButtonText}>Edit Reminder</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default AppointmentNotification;
