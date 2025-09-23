import Calender from "@/components/Calender";
import InputField from "@/components/InputField";
import { COLORS } from "@/constants/colors";
import { SignupValues, validateField } from "@/utils/signUpValidation";
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
import { styles } from "./singup.styles";

export default function Signup({ navigation }) {
  const [values, setValues] = useState<SignupValues>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: keyof SignupValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    const errMsg = validateField(field, value, { ...values, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: errMsg }));
  };

  const handleContinue = () => {
    let newErrors: { [key: string]: string } = {};
    (Object.keys(values) as (keyof SignupValues)[]).forEach((field) => {
      const errMsg = validateField(field, values[field], values);
      if (errMsg) {
        newErrors[field] = errMsg;
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // navigate ke profilesignup
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
              source={require("../../assets/images/Logo Vita.png")}
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
                value={values.username}
                onChangeText={(text) => handleChange("username", text)}
                required
                error={errors.username}
                placeholderTextColor={COLORS.gray2}
              />

              <InputField
                label="First Name"
                placeholder="John"
                value={values.firstName}
                onChangeText={(text) => handleChange("firstName", text)}
                required
                error={errors.firstName}
                placeholderTextColor={COLORS.gray2}
              />
              <InputField
                label="Last Name"
                placeholder="Doe"
                value={values.lastName}
                onChangeText={(text) => handleChange("lastName", text)}
                required
                error={errors.lastName}
                placeholderTextColor={COLORS.gray2}
              />
              <InputField
                label="Email"
                placeholder="johndoe@gmail.com"
                value={values.email}
                onChangeText={(text) => handleChange("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
                required
                error={errors.email}
                placeholderTextColor={COLORS.gray2}
              />
              <InputField
                label="Password"
                placeholder="***********"
                value={values.password}
                onChangeText={(text) => handleChange("password", text)}
                secureTextEntry
                required
                error={errors.password}
                placeholderTextColor={COLORS.gray2}
              />
              <InputField
                label="Confirm Password"
                placeholder="***********"
                value={values.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                secureTextEntry
                required
                error={errors.confirmPassword}
                placeholderTextColor={COLORS.gray2}
              />
              <InputField
                label="Phone Number"
                placeholder="087223627139"
                value={values.phoneNumber}
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
                  value={values.dateOfBirth}
                  onChangeText={(text) => handleChange("dateOfBirth", text)}
                  required
                  editable={false}
                  error={errors.dateOfBirth}
                  placeholderTextColor={COLORS.gray2}
                />
                <Calender
                  value={values.dateOfBirth}
                  onSelectDate={(date) => handleChange("dateOfBirth", date)}
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
                      values.gender === "Male" && styles.radioButtonSelected,
                    ]}
                  >
                    {values.gender === "Male" && (
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
                      values.gender === "Female" && styles.radioButtonSelected,
                    ]}
                  >
                    {values.gender === "Female" && (
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
                  onPress={() => navigation.navigate("Login")}
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
              <TouchableOpacity style={styles.googleButton} activeOpacity={0.7}>
                <Image
                  source={require("../../assets/images/Logo Google.png")}
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
