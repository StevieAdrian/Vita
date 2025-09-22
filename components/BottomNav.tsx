import { styles } from "@/styles/bottom-nav.styles";
import { BottomNavProps } from "@/types/nav";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function BottomNav({ items, activeId, onSelect }: BottomNavProps) {
    return (
        <View style={styles.container}>
            {items.map((item) => (
                <TouchableOpacity key={item.id} style={styles.item} onPress={() => onSelect(item.id, item.route)}>
                    <Image source={item.icon} style={styles.icon} />
                    <Text style={[styles.label, activeId === item.id && styles.activeLabel]}>
                        {item.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}