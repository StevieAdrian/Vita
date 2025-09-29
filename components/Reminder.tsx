import { COLORS } from "@/constants/colors";
import type { Reminder } from "@/constants/reminder";
import { styles } from "@/styles/reminder.styles";
import type React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type ReminderCardProps = {
  reminder: Reminder;
  onToggle: (id: string) => void;
  showDescription?: boolean;
};
const truncateText = (text: string, wordLimit: number) => {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

export const ReminderCard: React.FC<ReminderCardProps> = ({
  reminder,
  onToggle,
  showDescription = true,
}) => {
  const cardBackground =
    reminder.category === "drug" ? COLORS.primary4th : COLORS.secondary4th;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: cardBackground }]}
    >
      <View style={styles.leftColumn}>
        <View>
          <Image
            source={
              reminder.category === "drug"
                ? require("@/assets/mediTrack/pill.png")
                : require("@/assets/mediTrack/medicalCheckUp.png")
            }
            style={{ width: 35, height: 35 }}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text
            style={[styles.title, { maxWidth: 100 }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {reminder.title}
          </Text>
          {showDescription && (
            <Text style={styles.subtitle}>
              {truncateText(reminder.description, 10)}
            </Text>
          )}
          <Text style={styles.time}>{reminder.timeLabel}</Text>
        </View>
      </View>

      <TouchableOpacity>
        <Image
          source={require("@/assets/utilsIcon/arrow-left.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
