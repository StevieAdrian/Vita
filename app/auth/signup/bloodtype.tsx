import { BLOODTYPE_OPTIONS, bloodType } from "@/constants/bloodType";
import { COLORS } from "@/constants/colors";
import { useSignupContext } from "@/context/SignupContext";
import { LinearGradient } from "expo-linear-gradient";
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
import { styles } from "../../../styles/auth/signup/bloodtype.style";

const BloodType: React.FC = () => {
  const [selectedBloodType, setSelectedBloodType] = useState<bloodType | "">(
    ""
  );
  const [error, setError] = useState<string>("");
  const { data, setField } = useSignupContext();

  const handleBloodTypeSelect = (type: bloodType) => {
    setSelectedBloodType(type);
    setField("bloodType", type);
    setError("");
  };

  const handleContinue = () => {
    if (!selectedBloodType) {
      setError("Please select your blood type");
      return;
    }
    console.log("debug data: ", data);
    router.push("/auth/signup/allergics");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#1A73E8", "#21E2CF"]}
        style={styles.dashboardContainerLinear}
      ></LinearGradient>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/Logo Vita.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>What is your{"\n"}Blood Type</Text>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "20%" }]} />
            </View>
          </View>

          <View style={styles.selectionContainer}>
            <View style={styles.optionsContainer}>
              {BLOODTYPE_OPTIONS.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.optionButton,
                    selectedBloodType === type && styles.selectedOption,
                  ]}
                  onPress={() => handleBloodTypeSelect(type)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedBloodType === type && styles.selectedOptionText,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={[
                styles.continueButton,
                !selectedBloodType && styles.continueButtonDisabled,
              ]}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BloodType;
