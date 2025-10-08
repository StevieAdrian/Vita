import OptionField from "@/components/utils/OptionField";
import { ALLERGIC_OPTIONS } from "@/constants/allergic";
import { COLORS } from "@/constants/colors";
import { useSignupContext } from "@/context/SignupContext";
import { useAllergics } from "@/utils/allergicValidation";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../../styles/auth/signup/allergics.style";

const Allergics: React.FC = () => {
  const {
    otherAllergics,
    setOtherAllergics,
    handleAllergicSelect,
    isSelected,
    canContinue,
    handleContinue,
  } = useAllergics();

  const { data, setField } = useSignupContext();

  const onContinue = () => {
    const allergicsData = handleContinue();

    const finalAllergics = allergicsData.otherAllergics
      ? [...allergicsData.selectedAllergics, allergicsData.otherAllergics]
      : allergicsData.selectedAllergics;

    setField("allergies", finalAllergics);
    console.log("debug data: ", data);
    router.push("/auth/signup/chronic");
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

          <Text style={styles.title}>Is there any{"\n"}Allergics?</Text>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "40%" }]} />
            </View>
          </View>

          <Text style={styles.subtitle}>You can choose multiple option</Text>

          <View style={styles.selectionContainer}>
            <View style={styles.optionsContainer}>
              {ALLERGIC_OPTIONS.map((allergic) => (
                <OptionField
                  key={allergic}
                  label={allergic}
                  isSelected={isSelected(allergic)}
                  onPress={() => handleAllergicSelect(allergic)}
                  type="checkbox"
                />
              ))}

              <TextInput
                style={styles.otherInput}
                placeholder="Other Allergics..."
                placeholderTextColor={COLORS.gray2}
                value={otherAllergics}
                onChangeText={setOtherAllergics}
                multiline
              />
            </View>

            <TouchableOpacity
              style={[
                styles.continueButton,
                !canContinue && styles.continueButtonDisabled,
              ]}
              onPress={onContinue}
              disabled={!canContinue}
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

export default Allergics;
