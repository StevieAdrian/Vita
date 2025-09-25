import { COLORS } from "@/constants/colors";
import type { Reminder } from "@/constants/reminder";
import { styles } from "@/styles/reminder.styles";
import { Ionicons } from "@expo/vector-icons";
import type React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ReminderCardProps = {
  reminder: Reminder;
  onToggle: (id: string) => void;
};

export const ReminderCard: React.FC<ReminderCardProps> = ({
  reminder,
  onToggle,
}) => {
  const cardBackground =
    reminder.category === "drug" ? COLORS.primary4th : COLORS.primary5th;

  return (
    <View style={[styles.container, { backgroundColor: cardBackground }]}>
      <View style={styles.leftColumn}>
        <View style={styles.iconWrapper}>
          <Ionicons
            name={reminder.category === "drug" ? "medkit-outline" : "calendar"}
            size={18}
            color={COLORS.black}
          />
        </View>
        <View>
          <Text style={styles.title}>{reminder.title}</Text>
          <Text style={styles.subtitle}>{reminder.description}</Text>
          <Text style={styles.time}>{reminder.timeLabel}</Text>
        </View>
      </View>

      <TouchableOpacity
        accessibilityRole="checkbox"
        accessibilityState={{ checked: reminder.completed }}
        onPress={() => onToggle(reminder.id)}
        style={[
          styles.checkbox,
          reminder.completed && { backgroundColor: COLORS.primary },
        ]}
      >
        {reminder.completed ? (
          <Ionicons name="checkmark" size={18} color={COLORS.white} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};
