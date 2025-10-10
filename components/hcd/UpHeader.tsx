import { useAuthState } from "@/hooks/useAuthState";
import { useNotifications } from "@/hooks/useNotifications";
import { useUserProfile } from "@/hooks/useUserProfile";
import { styles } from "@/styles/component/upheader";
import { UpHeaderProps } from "@/types/titlenav";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function UpHeader({ title, showProfile = true }: UpHeaderProps) {
  const { data } = useUserProfile();
  const { user } = useAuthState();
  const { notifications } = useNotifications(user?.uid ?? "");

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        {showProfile && (
          <TouchableOpacity
            style={styles.profilePict}
            onPress={() => router.push("/profile/profile")}
          >
            <Image
              source={
                data.avatarUrl
                  ? { uri: data.avatarUrl }
                  : require("@/assets/images/Vita.png")
              }
              style={{ width: 40, height: 40, borderRadius: 45 / 2 }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        <Text style={styles.textHeader}>{title}</Text>
      </View>
      <View>
        <View style={styles.amountNotif}>
          <Text style={styles.textNotif}>{unreadCount}</Text>
        </View>
        <TouchableOpacity
          style={styles.notifications}
          onPress={() => router.push("/profile/notifications")}
        >
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
