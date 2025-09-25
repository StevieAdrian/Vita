import React, { useState } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { COLORS } from "@/constants/colors";

export default function FullWidthInput(props: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      {...props}
      style={[
        styles.input,
        props.style,
        { borderColor: isFocused ? COLORS.primary : COLORS.gray2 },
      ]}
      placeholderTextColor="#828282"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 44,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 0.497,
  },
});
