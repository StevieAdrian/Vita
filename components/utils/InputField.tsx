import { Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "../../styles/utils/input.styles";

interface InputFieldProps extends TextInputProps {
  label: string;
  required?: boolean;
  error?: string;
  rightIcon?: React.ReactNode;
}

export default function InputField({
  label,
  required,
  error,
  rightIcon,
  ...props
}: InputFieldProps) {
  return (
    <>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <View style={styles.innerContainer}>
        <TextInput {...props} style={styles.input} />
        {rightIcon && <View style={{ marginLeft: 8 }}>{rightIcon}</View>}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </>
  );
}
