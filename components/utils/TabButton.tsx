import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { TabButtonProps } from "@/types/tab"
import { styles } from "@/styles/tab-button.styles";

export default function TabButton({ title, icon, active, onPress }: TabButtonProps) {
  return (
    <TouchableOpacity style={[styles.tab, active ? styles.activeTab : styles.inactiveTab]} onPress={onPress} activeOpacity={0.7} >
      <Image source={icon} style={[ styles.icon, { tintColor: active ? COLORS.white : COLORS.black }]}/>
      <Text style={[ styles.text, { color: active ? COLORS.white : COLORS.black }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
