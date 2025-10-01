import { NotificationItemProps } from "@/types/notification";
import { Image, Text, View } from "react-native";
import { styles } from "../../styles/profile/notifications.styles";

export default function NotificationItem({ icon, message, time}: NotificationItemProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconWrapper]}>
        <Image source={icon} style={styles.icon} />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.message}>{message}</Text>
      </View>

      <Text style={styles.time}>{time}</Text>
    </View>
  );
}