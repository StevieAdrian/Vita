import { styles } from "@/styles/profile/form-label.styles";
import { Text, View } from "react-native";

interface FormLabelProps {
  label: string;
  required?: boolean;
}

export default function FormLabel({ label, required }: FormLabelProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {required && <Text style={styles.required}>*</Text>}
    </View>
  );
}
