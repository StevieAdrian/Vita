import type { Appointment } from "@/constants/appointment";
import { COLORS } from "@/constants/colors";
import { styles } from "@/styles/meditrack/appointment-card.styles";
import { convertAppointment } from "@/components/utils/DateUtils";
import { Ionicons } from "@expo/vector-icons";
import type React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type AppointmentCardProps = {
  appointment: any;
  onPressDetail: (appointment: Appointment) => void;
};

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onPressDetail,
}) => {

  const normalizedAppointment = convertAppointment(appointment);

  const isUpcoming = normalizedAppointment.status === "upcoming";
  const backgroundColor = isUpcoming
    ? COLORS.secondary4th
    : "rgba(31, 41, 55, 0.08)";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.leftColumn}>
        <View style={styles.iconWrapper}>
          <Ionicons name="calendar-outline" size={18} color={COLORS.black} />
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.title} numberOfLines={1}>
            {normalizedAppointment.title}
          </Text>
          <Text style={styles.subtitle}>{normalizedAppointment.provider}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Location</Text>
              <Text style={styles.metaValue}>
                {normalizedAppointment.location}
              </Text>
            </View>
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Date</Text>
              <Text style={styles.metaValue}>
                {normalizedAppointment.dateLabel}
              </Text>
            </View>
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Time</Text>
              <Text style={styles.metaValue}>
                {normalizedAppointment.timeLabel}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.cta}
        onPress={() => onPressDetail(normalizedAppointment)}
        activeOpacity={0.82}
      >
        <Text style={styles.ctaLabel}>See Detail</Text>
      </TouchableOpacity>
    </View>
  );
};
