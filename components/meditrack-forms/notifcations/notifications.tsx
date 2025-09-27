import type { DrugReminder } from "@/constants/drugs";
import type React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "pills-tablet":
        return "💊";
      case "vitamin-supplement":
        return "🍊";
      case "capsule":
        return "💊";
      case "liquid-syrup":
        return "🧪";
      case "eye-ear-nasal-drops":
        return "👁️";
      case "inhaler-spray":
        return "💨";
      case "cream-ointment":
        return "🧴";
      default:
        return "❓";
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.title}>It's Medicine Reminder!</Text>

          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>
                {getCategoryIcon(reminder.category)}
              </Text>
            </View>
            <Text style={styles.iconLabel}>
              {reminder.category.replace(/-/g, " ")}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Description</Text>
            <Text style={styles.cardContent}>{reminder.description}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Time</Text>
            <View style={styles.timeContainer}>
              {reminder.times.map((time, index) => (
                <View key={index} style={styles.timeBubble}>
                  <Text style={styles.timeText}>🕒 {time}</Text>
                </View>
              ))}
            </View>
            <View style={styles.repeatDaysContainer}>
              {reminder.repeatDays.map((day, index) => (
                <View key={index} style={styles.dayBubble}>
                  <Text style={styles.dayText}>{day.substring(0, 3)}</Text>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.markAsDoneButton}
            onPress={() => onMarkAsDone(reminder.id)}
          >
            <Text style={styles.markAsDoneButtonText}>Mark As Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editReminderButton}
            onPress={() => onEditReminder(reminder.id)}
          >
            <Text style={styles.editReminderButtonText}>Edit Reminder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E0F2F7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    fontSize: 40,
  },
  iconLabel: {
    fontSize: 16,
    color: "#333",
    textTransform: "capitalize",
  },
  card: {
    backgroundColor: "#F0F4F7",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
    color: "#333",
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  timeBubble: {
    backgroundColor: "#D0E0F0",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  timeText: {
    fontSize: 14,
    color: "#333",
  },
  repeatDaysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  dayBubble: {
    backgroundColor: "#D0E0F0",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  dayText: {
    fontSize: 14,
    color: "#333",
  },
  markAsDoneButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  markAsDoneButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  editReminderButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  editReminderButtonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MedicineReminderCard;
