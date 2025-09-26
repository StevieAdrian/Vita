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

export const ReminderCard: React.FC<ReminderCardProps> = ({
  reminder,
  onToggle,
  showDescription = true,
}) => {
  const cardBackground =
    reminder.category === "drug" ? COLORS.primary3rd : COLORS.secondary3rd;

  return (
    <View style={[styles.container, { backgroundColor: cardBackground }]}>
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
          <Text style={styles.title}>{reminder.title}</Text>
          {showDescription && (
            <Text style={styles.subtitle}>{reminder.description}</Text>
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
    </View>
  );
};
