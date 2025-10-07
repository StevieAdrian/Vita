import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import InputField from "@/components/utils/InputField";
import { COLORS } from "@/constants/colors";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { styles } from "../../../styles/auth/login/login.styles";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { resetPassword, loading } = useAuth();

  const handleReset = async () => {
    if (!email) return alert("Please enter your email");
    const success = await resetPassword(email);
    if (success) {
      alert("Password reset link has been sent to your email.");
      router.back();
    } else {
      alert("Failed to send reset email. Please check your email address.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/welcome-logo.png")}
        style={styles.welcomeImage}
      />

      <View style={styles.boxContainer}>
        <InputField
          label="Email"
          required
          onChangeText={setEmail}
          placeholder="johndoe@gmail.com"
          placeholderTextColor={COLORS.gray2}
        />

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleReset}
          disabled={loading}
        >
          <Text style={styles.continueText}>Send Reset Link</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
