import { styles } from "@/styles/component/upheader";
import { UpHeaderProps } from "@/types/titlenav";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function UpHeader({ title, showProfile = true }: UpHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        {showProfile && (
          <TouchableOpacity style={styles.profilePict}>
            <Image
              source={require("@/assets/images/Vita.png")}
              style={{ width: 40, height: 40, borderRadius: 45 / 2 }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        <Text style={styles.textHeader}>{title}</Text>
      </View>
      <View>
        <View style={styles.amountNotif}>
          <Text style={styles.textNotif}>1</Text>
        </View>
        <TouchableOpacity style={styles.notifications}>
          <Image
            source={require("@/assets/utilsIcon/notification.png")}
            style={{ width: 41, height: 41 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
