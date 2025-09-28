import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/buttonColor.style";
import { PrimaryButtonColorFormProps } from "@/types/button";

export default function PrimaryButtonColorForm({
  text,
  active = false,
  onPress,
}: PrimaryButtonColorFormProps & { active?: boolean }) {
  return (
    <View style={styles.containerButton}>
      <TouchableOpacity
        style={[styles.buttonStyle, active && styles.buttonActive]}
        onPress={onPress}
        disabled={!active}
      >
        <Text style={styles.textButton}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
