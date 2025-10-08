import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "../../styles/utils/input.styles";

interface InputFieldProps extends TextInputProps {
  label: string;
  required?: boolean;
  error?: string;
  rightIcon?: React.ReactNode;
  onPressContainer?: () => void;
}

export default function InputField({
  label,
  required,
  error,
  rightIcon,
  onPressContainer,
  ...props
}: InputFieldProps) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
        <Pressable
          onPress={onPressContainer}
          style={({ pressed }) => [
            styles.innerContainer,
            pressed && { opacity: 0.8 },
          ]}
        >
          <TextInput
            {...props}
            style={[styles.input, { flex: 1 }]}
            pointerEvents="auto"
          />
          {rightIcon && <View style={{ marginLeft: 8 }}>{rightIcon}</View>}
        </Pressable>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </>
  );
}
