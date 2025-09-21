import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
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
            <Text style={styles.label}>
              First Name <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="John"
                placeholderTextColor="#999"
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <Text style={styles.label}>
              Last Name <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Doe"
                placeholderTextColor="#999"
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>

            <Text style={styles.label}>
              Email <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="johndoe@gmail.com"
                placeholderTextColor="#999"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>
              Password <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="***********"
                placeholderTextColor="#999"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <Text style={styles.label}>
              Confirm Password <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="***********"
                placeholderTextColor="#999"
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <Text style={styles.label}>
              Phone Number <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="087223627139"
                placeholderTextColor="#999"
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View>

            <Text style={styles.label}>
              Date of Birth <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.dobContainer}>
              <TextInput
                placeholder="August 25, 2005"
                placeholderTextColor="#999"
                style={styles.dobInput}
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                editable={true} 
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