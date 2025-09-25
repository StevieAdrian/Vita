import type { Appointment } from "@/constants/appointment";
import { styles } from "@/styles/history-card.styles";
import type React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type HistoryCardProps = {
  appointment: Appointment;
  onPressDetail: (appointment: Appointment) => void;
};

export const HistoryCard: React.FC<HistoryCardProps> = ({
  appointment,
  onPressDetail,
}) => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.cardTitle}>{appointment.title}</Text>
        <Text style={styles.cardDate}>
          {appointment.dateLabel} ({appointment.timeLabel})
        </Text>
      </View>
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => onPressDetail(appointment)}
      >
        <Text style={styles.detailButtonText}>See Detail</Text>
      </TouchableOpacity>
    </View>
  );
};
