import React, { useState } from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./bloodtype.style";

interface BloodTypeProps {}

const BloodType: React.FC<BloodTypeProps> = () => {
  const [selectedBloodType, setSelectedBloodType] = useState<string>("");

  const bloodTypes = ["A", "B", "AB", "O"];

  const handleBloodTypeSelect = (bloodType: string) => {
    setSelectedBloodType(bloodType);
  };

  const handleContinue = () => {
    if (selectedBloodType) {
      // href kemana dan simpan kemana
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/Logo Vita.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>What is your{"\n"}Blood Type</Text>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "25%" }]} />
          </View>
        </View>

        <View style={styles.selectionContainer}>
          <View style={styles.optionsContainer}>
            {bloodTypes.map((bloodType) => (
              <TouchableOpacity
                key={bloodType}
                style={[
                  styles.optionButton,
                  selectedBloodType === bloodType && styles.selectedOption,
                ]}
                onPress={() => handleBloodTypeSelect(bloodType)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedBloodType === bloodType &&
                      styles.selectedOptionText,
                  ]}
                >
                  {bloodType}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedBloodType && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!selectedBloodType}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BloodType;
