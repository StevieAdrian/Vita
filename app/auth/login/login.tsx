import InputField from "@/components/utils/InputField";
import { COLORS } from "@/constants/colors";
import { useAuth } from "@/hooks/useAuth";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../styles/auth/login/login.styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signInWithGoogle, loading } = useAuth();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1A73E8", "#21E2CF"]}
        style={styles.dashboardContainerLinear}
      ></LinearGradient>

      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo-vita.png")}
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

          <TouchableOpacity
            onPress={() => router.push("/auth/login/forgotPassword")}
            style={styles.forgotContainer}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Text style={styles.signupText}>
            Haven&apos;t create an account?{" "}
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
      </View>
    </View>
  );
}
