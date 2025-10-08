import { COLORS } from "@/constants/colors";
import { styles } from "@/styles/utils/list-item.styles";
import { ListItemProps } from "@/types/list-item";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
export default function ListItem({
  title,
  subtitle,
  leftIcon,
  onPress,
  danger,
}: ListItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.wrapper}
    >
      <View style={styles.container}>
        <View style={styles.container}>
          <Image source={leftIcon} style={styles.leftIcon} />
          <View style={styles.texts}>
            <Text style={[styles.title, danger && { color: COLORS.red }]}>
              {title}
            </Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        </View>
        <Image
          source={require("@/assets/images/chevron-right-icon.png")}
          style={styles.chevron}
        />
      </View>
    </TouchableOpacity>
  );
}
