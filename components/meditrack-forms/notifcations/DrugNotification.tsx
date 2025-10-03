import type { DrugReminder } from "@/constants/drugs";
import { styles } from "@/styles/meditrack/drug-notifcation.styles";
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

interface MedicineReminderCardProps {
  isVisible: boolean;
  onClose: () => void;
  onMarkAsDone: (id: string) => void;
  onEditReminder: (id: string) => void;
  reminder: DrugReminder;
}

const MedicineReminderCard: React.FC<MedicineReminderCardProps> = ({
  isVisible,
  onClose,
  onMarkAsDone,
  onEditReminder,
  reminder,
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

  
  if (!reminder) {
    return null;
  }

  const getCategoryImage = (category: string) => {
    switch (category) {
      case "pills-tablet":
        return require("@/assets/mediTrack/pills-white.png");
      case "vitamin-supplement":
        return require("@/assets/mediTrack/pills-white.png");
      case "capsule":
        return require("@/assets/mediTrack/pills-white.png");
      case "liquid-syrup":
        return require("@/assets/mediTrack/pills-white.png");
      case "eye-ear-nasal-drops":
        return require("@/assets/mediTrack/pills-white.png");
      case "inhaler-spray":
        return require("@/assets/mediTrack/pills-white.png");
      case "cream-ointment":
        return require("@/assets/mediTrack/pills-white.png");
      default:
        return require("@/assets/mediTrack/pills-white.png");
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      "pills-tablet": "Pills",
      "vitamin-supplement": "Vitamin",
      capsule: "Capsule",
      "liquid-syrup": "Liquid",
      "eye-ear-nasal-drops": "Drops",
      "inhaler-spray": "Inhaler",
      "cream-ointment": "Cream",
    };
    return labels[category] || category.replace(/-/g, " ");
  };

  const handleMarkAsDone = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onMarkAsDone(reminder.id);
      onClose();
    });
  };

  const handleEditReminder = () => {
    onEditReminder(reminder.id);
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

          <Text style={styles.title}>It&apos;s Medicine Reminder!</Text>

          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Image
                source={getCategoryImage(reminder.category)}
                style={styles.categoryImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.iconLabel}>
              {getCategoryLabel(reminder.category)}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Description</Text>
            <Text style={styles.cardContent}>
              {reminder.description || "Take your medicine as prescribed"}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Time</Text>
            <View style={styles.timeContainer}>
              {reminder.times.map((time, index) => (
                <View key={index} style={styles.timeBubble}>
                  <Image
                    source={require("@/assets/mediTrack/clock.png")}
                    style={styles.clockIcon}
                  />
                  <Text style={styles.timeText}>{time}</Text>
                </View>
              ))}
            </View>

            {reminder.repeatDays && reminder.repeatDays.length > 0 && (
              <>
                <Text style={styles.cardTitle}>Repeat Days</Text>
                <View style={styles.repeatDaysContainer}>
                  {reminder.repeatDays.map((day, index) => (
                    <View key={index} style={styles.dayBubble}>
                      <Text style={styles.dayText}>{day.substring(0, 3)}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>

          <TouchableOpacity
            style={styles.markAsDoneButton}
            onPress={handleMarkAsDone}
          >
            <Text style={styles.markAsDoneButtonText}>Mark As Done</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editReminderButton}
            onPress={handleEditReminder}
          >
            <Text style={styles.editReminderButtonText}>Edit Reminder</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default MedicineReminderCard;
