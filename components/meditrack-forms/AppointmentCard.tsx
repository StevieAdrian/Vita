import type { Appointment } from "@/constants/appointment";
import { COLORS } from "@/constants/colors";
import { styles } from "@/styles/meditrack/appointment-card.styles";
import { Ionicons } from "@expo/vector-icons";
import type React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type AppointmentCardProps = {
  appointment: any;
  onPressDetail: (appointment: Appointment) => void;
  onEdit?: (appointment: any) => void;
  onDelete?: (appointment: any) => void;
  showActions?: boolean;
};

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onPressDetail,
  onEdit,
  onDelete,
  showActions = false,
}) => {
  const isUpcoming = appointment.status === "upcoming";
  const backgroundColor = isUpcoming
    ? COLORS.secondary4th
    : "rgba(31, 41, 55, 0.08)";

  const handleSeeDetailPress = () => {
    onPressDetail(appointment);
  };

  const handleEditPress = () => {
    onEdit?.(appointment);
  };

  const handleDeletePress = () => {
    onDelete?.(appointment);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.leftColumn}>
        <View style={styles.iconWrapper}>
          <Ionicons name="calendar-outline" size={18} color={COLORS.black} />
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.title} numberOfLines={1}>
            {appointment.title}
          </Text>
          <Text style={styles.subtitle}>{appointment.provider}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Location</Text>
              <Text style={styles.metaValue}>{appointment.location}</Text>
            </View>
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Date</Text>
              <Text style={styles.metaValue}>{appointment.dateLabel}</Text>
            </View>
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Time</Text>
              <Text style={styles.metaValue}>{appointment.timeLabel}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.rightColumn}>
        <TouchableOpacity
          style={styles.cta}
          onPress={handleSeeDetailPress}
          activeOpacity={0.82}
        >
          <Text style={styles.ctaLabel}>See Detail</Text>
        </TouchableOpacity>

        {showActions && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={handleEditPress}
              style={styles.actionButton}
            ></TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
