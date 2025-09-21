import { Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "../styles/input.styles";

interface InputFieldProps extends TextInputProps {
    label: string;
    required?: boolean;
}

export default function InputField({ label, required, ...props }: InputFieldProps) {
  return (
    <>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <View style={styles.innerContainer}>
        <TextInput {...props} style={styles.input} />
      </View>
    </>
  );
}