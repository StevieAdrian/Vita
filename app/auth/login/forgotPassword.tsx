import InputField from "@/components/utils/InputField";
import { COLORS } from "@/constants/colors";
import { useAuth } from "@/hooks/useAuth";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
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
      <LinearGradient
        colors={["#1A73E8", "#21E2CF"]}
        style={styles.dashboardContainerLinear}
      ></LinearGradient>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/Logo Vita.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Let's continue your health journey{"\n"}with us.
        </Text>
      </View>
      <View style={styles.upCont}>
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

          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.forgotContainer}
          >
            <Text style={styles.forgotText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
