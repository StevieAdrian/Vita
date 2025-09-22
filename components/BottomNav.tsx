import { styles } from "@/styles/bottom-nav.styles";
import { BottomNavProps } from "@/types/nav";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function BottomNav({
  items,
  activeId,
  onSelect,
}: BottomNavProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.item, item.id === "notes" && styles.notesItem]}
          onPress={() => onSelect(item.id, item.route)}
        >
          <Image
            source={activeId === item.id ? item.activeIcon : item.icon}
            style={[styles.icon, item.id === "notes" && styles.notesIcon]}
          />
          <Text
            style={[styles.label, activeId === item.id && styles.activeLabel, item.id === "notes" && styles.notesLabel]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
