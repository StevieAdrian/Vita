import Calender from "@/components/hcd/Calender";
import InputField from "@/components/utils/InputField";
import { COLORS } from "@/constants/colors";
import { useSignupContext } from "@/context/SignupContext";
import { useAuth } from "@/hooks/useAuth";
import { useCheckEmail } from "@/hooks/useCheckEmail";
import { useCheckUsername } from "@/hooks/useCheckUsername";
import { mapperSignupValues } from "@/utils/mapper";
import { SignupValues, validateField } from "@/utils/signUpValidation";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import { styles } from "../../../styles/auth/signup/singup.styles";

export default function Signup() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const { data, setField } = useSignupContext();
  const { signInWithGoogle, loading } = useAuth();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const {
    exists: usernameExists,
    isChecking: checkingUsername,
    verifyUsername,
  } = useCheckUsername();
  const {
    exists: emailExists,
    isChecking: checkingEmail,
    verifyEmail,
  } = useCheckEmail();

  const handleChange = (field: keyof SignupValues, value: string) => {
    if (field === "confirmPassword") {
      setConfirmPassword(value);
      const safeData = mapperSignupValues(data, value);
      const errMsg = validateField(field, value, safeData);
      setErrors((prev) => ({ ...prev, [field]: errMsg }));
    } else {
      setField(field as keyof typeof data, value);
      const safeData = mapperSignupValues(data, confirmPassword);
      const errMsg = validateField(field, value, safeData);
      setErrors((prev) => ({ ...prev, [field]: errMsg }));
    }
  };

  const handleContinue = () => {
    const safeData = mapperSignupValues(data, confirmPassword);

    let newErrors: { [key: string]: string } = {};
    (Object.keys(safeData) as (keyof SignupValues)[]).forEach((field) => {
      const errMsg = validateField(field, safeData[field], safeData);
      if (errMsg) {
        newErrors[field] = errMsg;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (usernameExists) {
        alert("Username is already taken");
        return;
      }

      if (emailExists) {
        alert("Email is already registered");
        return;
      }

      router.push("/auth/signup/profilesignup");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Image
              source={require("../../../assets/images/Logo Vita.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Get Started Now</Text>
            <Text style={styles.subtitle}>
              Create an account and start your{"\n"}healthy journey together.
            </Text>
          </View>

          <View style={styles.formWrapper}>
            <View style={styles.formContainer}>
              <InputField
                label="Username"
                placeholder="johndoe123"
                value={data.username}
                onChangeText={(text) => {
                  handleChange("username", text);
                  if (text.trim().length >= 3) {
                    verifyUsername(text.trim());
                  } else {
                    verifyUsername("");
                  }
                }}
                required
                error={errors.username}
                placeholderTextColor={COLORS.gray2}
                rightIcon={
                  checkingUsername ? (
                    <Icon name="loader" size={20} color={COLORS.gray2} />
                  ) : usernameExists === true ? (
                    <Icon name="x-circle" size={20} color="red" />
                  ) : usernameExists === false ? (
                    <Icon name="check-circle" size={20} color="green" />
                  ) : null
                }
              />

              <InputField
                label="First Name"
                placeholder="John"
                value={data.firstName}
                onChangeText={(text) => handleChange("firstName", text)}
                required
                error={errors.firstName}
                placeholderTextColor={COLORS.gray2}
              />
              <InputField
                label="Last Name"
                placeholder="Doe"
                value={data.lastName}
                onChangeText={(text) => handleChange("lastName", text)}
                required
                error={errors.lastName}
                placeholderTextColor={COLORS.gray2}
              />
              <InputField
                label="Email"
                placeholder="johndoe@gmail.com"
                value={data.email}
                onChangeText={(text) => {
                  handleChange("email", text);
                  if (text.includes("@")) {
                    verifyEmail(text.trim());
                  } else {
                    verifyEmail("");
                  }
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                required
                error={errors.email}
                placeholderTextColor={COLORS.gray2}
                rightIcon={
                  checkingEmail ? (
                    <Icon name="loader" size={20} color={COLORS.gray2} />
                  ) : emailExists === true ? (
                    <Icon name="x-circle" size={20} color="red" />
                  ) : emailExists === false ? (
                    <Icon name="check-circle" size={20} color="green" />
                  ) : null
                }
              />
              <InputField
                label="Password"
                placeholder="***********"
                value={data.password}
                onChangeText={(text) => handleChange("password", text)}
                secureTextEntry
                required
                error={errors.password}
                placeholderTextColor={COLORS.gray2}
              />
              <InputField
                label="Confirm Password"
                placeholder="***********"
                value={confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                secureTextEntry
                required
                error={errors.confirmPassword}
                placeholderTextColor={COLORS.gray2}
              />
              <InputField
                label="Phone Number"
                placeholder="087223627139"
                value={data.phoneNumber}
                onChangeText={(text) => handleChange("phoneNumber", text)}
                keyboardType="phone-pad"
                required
                error={errors.phoneNumber}
                placeholderTextColor={COLORS.gray2}
              />
              <View style={styles.dobWrapper}>
                <InputField
                  label="Date of Birth"
                  placeholder="August 25, 2005"
                  value={data.dateOfBirth}
                  onChangeText={(text) => handleChange("dateOfBirth", text)}
                  required
                  editable={false}
                  error={errors.dateOfBirth}
                  placeholderTextColor={COLORS.gray2}
                />
                <Calender
                  value={data.dateOfBirth}
                  onSelectDate={(date) => handleChange("dateOfBirth", date)}
                  allowFutureDates={false}
                  allowPastDates={true}
                />
              </View>
              <Text style={styles.label}>
                Gender <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={styles.genderOption}
                  onPress={() => handleChange("gender", "Male")}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.radioButton,
                      data.gender === "Male" && styles.radioButtonSelected,
                    ]}
                  >
                    {data.gender === "Male" && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles.genderText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.genderOption}
                  onPress={() => handleChange("gender", "Female")}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.radioButton,
                      data.gender === "Female" && styles.radioButtonSelected,
                    ]}
                  >
                    {data.gender === "Female" && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles.genderText}>Female</Text>
                </TouchableOpacity>
              </View>
              {errors.gender && (
                <Text style={styles.errorText}>{errors.gender}</Text>
              )}
              <TouchableOpacity
                style={styles.continueButton}
                activeOpacity={0.8}
                onPress={handleContinue}
              >
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>
              <Text style={styles.loginText}>
                Already have an account?{" "}
                <Text
                  style={styles.loginLink}
                  onPress={() => router.push("/auth/login/login")}
                >
                  Log In
                </Text>
              </Text>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or Continue With</Text>
                <View style={styles.dividerLine} />
              </View>
              <TouchableOpacity
                style={styles.googleButton}
                activeOpacity={0.7}
                onPress={signInWithGoogle}
                disabled={loading}
              >
                <Image
                  source={require("../../../assets/images/Logo Google.png")}
                  style={styles.googleIcon}
                />
                <Text style={styles.googleText}>Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
