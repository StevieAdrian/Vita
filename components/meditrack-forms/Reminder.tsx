import { COLORS } from "@/constants/colors";
import { DRUG_CATEGORIES, DrugReminder } from "@/constants/drugs";
import type { Reminder, ReminderCategory } from "@/constants/reminder";
import { styles } from "@/styles/meditrack/reminder.styles";
import type React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type ReminderCardProps = {
  reminder: Reminder;
  onToggle: (id: string) => void;
  onEdit?: (reminder: Reminder) => void;
  onDelete?: (reminder: Reminder) => void;
  showDescription?: boolean;
  showActions?: boolean;
};

const truncateText = (text: string, wordLimit: number) => {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

export const convertDrugToReminder = (drugReminder: DrugReminder): Reminder => {
  return {
    id: drugReminder.id,
    title: drugReminder.drugName,
    description: drugReminder.description,
    category: "drug",
    drugCategory: drugReminder.category,
    timeLabel: formatTimesToTimeLabel(drugReminder.times),
    date: drugReminder.date,
    times: drugReminder.times,
    repeatDays: drugReminder.repeatDays || [],
    completed: drugReminder.isCompleted,
    createdAt: drugReminder.createdAt,
    updatedAt: drugReminder.updatedAt,
    userId: drugReminder.userId,
  };
};

const formatTimesToTimeLabel = (times: string[]): string => {
  if (!times || times.length === 0) return "No time set";
  if (times.length === 1) return times[0];
  return times.join(", ");
};

const getCardBackground = (reminderType: ReminderCategory | "other") => {
  switch (reminderType) {
    case "drug":
      return COLORS.primary4th;
    case "appointment":
      return COLORS.secondary4th;
    default:
      return COLORS.primary4th;
  }
};

const getReminderIcon = (reminderType: ReminderCategory | "other") => {
  switch (reminderType) {
    case "drug":
      return require("@/assets/mediTrack/pill.png");
    case "appointment":
      return require("@/assets/mediTrack/medicalCheckUp.png");
    default:
      return require("@/assets/mediTrack/pill.png");
  }
};

export const ReminderCard: React.FC<ReminderCardProps> = ({
  reminder,
  onToggle,
  onEdit,
  onDelete,
  showDescription = true,
  showActions = false,
}) => {
  const reminderType = reminder.category;
  const cardBackground = getCardBackground(reminderType);
  const reminderIcon = getReminderIcon(reminderType);

  const handleToggle = () => {
    onToggle(reminder.id);
  };

  const handleEditPress = () => {
    onEdit?.(reminder);
  };

  const handleDeletePress = () => {
    onDelete?.(reminder);
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: cardBackground }]}
      onPress={() => {
        handleToggle();
        handleEditPress();
      }}
    >
      <View style={styles.leftColumn}>
        <View>
          {reminderIcon && (
            <Image
              source={reminderIcon}
              style={[
                { width: 35, height: 35 },
                reminder.completed && { opacity: 0.5 },
              ]}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              { maxWidth: 120 },
              reminder.completed && styles.completedText,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {truncateText(reminder.description, 10)}
          </Text>

          {showDescription && (
            <Text
              style={[
                styles.subtitle,
                reminder.completed && styles.completedText,
              ]}
            >
              {truncateText(reminder.description, 15)}
            </Text>
          )}

          <Text style={styles.time}>{reminder.timeLabel}</Text>

          {reminder.repeatDays && reminder.repeatDays.length > 0 && (
            <Text style={styles.repeatDays}>
              Repeats: {reminder.repeatDays.join(", ")}
            </Text>
          )}

          {reminderType === "drug" &&
            reminder.drugCategory &&
            reminder.drugCategory !== "other" && (
              <Text style={styles.categoryDetail}>
                {DRUG_CATEGORIES.find(
                  (cat) => cat.value === reminder.drugCategory
                )?.label || reminder.drugCategory}
              </Text>
            )}
        </View>
      </View>

      {showActions && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={handleEditPress}
            style={styles.actionButton}
          >
            <Image source={require("@/assets/utilsIcon/arrow-right.svg")} />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};
