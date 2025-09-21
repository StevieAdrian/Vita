import InputField from "@/components/InputField";
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
import Icon from "react-native-vector-icons/Feather";
import { styles } from "./singup.styles";

export default function Signup({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCalendarPress = () => {
    setDateOfBirth("August 25, 2005");
    setShowDatePicker(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <StatusBar barStyle="light-content" backgroundColor="#4285F4" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/Logo Vita.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Get Started Now</Text>
          <Text style={styles.subtitle}>
            Create an account and start your{"\n"}healthy journey together.
          </Text>
        </View>

        <View style={styles.formWrapper}>
          <View style={styles.formContainer}>
            <InputField
              label="First Name"
              placeholder="John"
              value={firstName}
              onChangeText={setFirstName}
              required
            />

            <InputField
              label="Last Name"
              placeholder="Doe"
              value={lastName}
              onChangeText={setLastName}
              required
            />

            <InputField
              label="Email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              required
            />

            <InputField
              label="Password"
              placeholder="***********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              required
            />

            <InputField
              label="Confirm Password"
              placeholder="***********"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              required
            />

            <InputField
              label="Phone Number"
              placeholder="087223627139"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              required
            />

            <View style={styles.dobWrapper}>
              <InputField
                label="Date of Birth"
                placeholder="August 25, 2005"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                required
              />
              <TouchableOpacity
                style={styles.calendarIcon}
                onPress={handleCalendarPress}
                activeOpacity={0.7}
              >
                <Icon name="calendar" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>
              Gender <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={styles.genderOption}
                onPress={() => setGender("Male")}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.radioButton,
                    gender === "Male" && styles.radioButtonSelected,
                  ]}
                >
                  {gender === "Male" && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={styles.genderText}>Male</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.genderOption}
                onPress={() => setGender("Female")}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.radioButton,
                    gender === "Female" && styles.radioButtonSelected,
                  ]}
                >
                  {gender === "Female" && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={styles.genderText}>Female</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.continueButton} activeOpacity={0.8}>
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
  );
}
