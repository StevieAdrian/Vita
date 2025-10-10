import type { Appointment } from "@/constants/appointment";
import { COLORS } from "@/constants/colors";
import { styles } from "@/styles/meditrack/appointment-card.styles";
import type React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type AppointmentCardProps = {
  appointment: any;
  onPressDetail: (appointment: Appointment) => void;
  onEdit?: (appointment: any) => void;
  onDelete?: (appointment: any) => void;
  showActions?: boolean;
  showTime?: boolean;
  showLocation?: boolean;
  showDetails?: boolean;
  showArrow?: boolean;
  showImage?: boolean;
};
const truncateText = (text: string, wordLimit: number) => {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};
export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onPressDetail,
  onEdit,
  onDelete,
  showActions = false,
  showTime = true,
  showLocation = true,
  showDetails = true,
  showArrow = false,
  showImage = true,
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
    <TouchableOpacity onPress={handleEditPress}>
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.leftColumn}>
          {showImage && (
            <View style={styles.iconWrapper}>
              <Image
                source={require("@/assets/mediTrack/medicalCheckUp.png")}
                style={{ width: 35, height: 35 }}
              />
            </View>
          )}
          <View style={styles.infoWrapper}>
            <Text style={styles.title} numberOfLines={1}>
              {truncateText(appointment.title, 8)}
            </Text>
            <Text style={styles.subtitle}>{appointment.provider}</Text>

            <View style={styles.metaRow}>
              {showLocation && appointment.location && (
                <View style={styles.metaBlock}>
                  <Text style={styles.metaLabel}>Location</Text>
                  <Text style={styles.metaValue}>{appointment.location}</Text>
                </View>
              )}
              {appointment.dateLabel && (
                <View style={styles.metaBlock}>
                  <Text style={styles.metaLabel}>Date</Text>
                  <Text style={styles.metaValue}>{appointment.dateLabel}</Text>
                </View>
              )}
              {showTime && appointment.timeLabel && (
                <View style={styles.metaBlock}>
                  <Text style={styles.metaLabel}>Time</Text>
                  <Text style={styles.metaValue}>{appointment.timeLabel}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.rightColumn}>
          {showDetails && (
            <TouchableOpacity
              style={styles.cta}
              onPress={handleSeeDetailPress}
              activeOpacity={0.82}
            >
              <Text style={styles.ctaLabel}>See Detail</Text>
            </TouchableOpacity>
          )}

          {showActions && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={handleEditPress}
                style={styles.actionButton}
              ></TouchableOpacity>
            </View>
          )}
        </View>

        {showArrow && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={handleEditPress}
              style={styles.actionButton}
            >
              <Image source={require("@/assets/utilsIcon/arrow-right.png")} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
