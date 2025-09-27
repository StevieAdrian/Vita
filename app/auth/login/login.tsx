import InputField from "@/components/InputField";
import { COLORS } from "@/constants/colors";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./login.styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loading } = useAuth();

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
        <InputField
          label="Password"
          required
          secureTextEntry
          onChangeText={setPassword}
          placeholder="********"
          placeholderTextColor={COLORS.gray2}
        />

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => signIn(email, password)}
          disabled={loading}
        >
          <Text style={styles.continueText}>Log in</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Haven't create an account?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => router.push("/auth/signup/signup")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
      <View style={styles.dividerWrapper}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or Continue With</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity style={styles.googleButton} activeOpacity={0.7}>
        <Image
          source={require("@/assets/images/google.png")}
          style={styles.googleLogo}
        />
      </TouchableOpacity>
    </View>
  );
}
