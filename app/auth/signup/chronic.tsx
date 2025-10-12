import OptionField from "@/components/utils/OptionField";
import { CHRONIC_OPTIONS } from "@/constants/chronic";
import { COLORS } from "@/constants/colors";
import { useSignupContext } from "@/context/SignupContext";
import { useChronic } from "@/utils/chronicValidation";
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
import { styles } from "../../../styles/auth/signup/chronic.style";

const Chronic: React.FC = () => {
  const {
    otherCondition,
    setOtherCondition,
    handleConditionSelect,
    isSelected,
    canContinue,
    handleContinue,
  } = useChronic();

  const { setField } = useSignupContext();
  const onContinue = () => {
    const chronicData = handleContinue();

    const finalChronics = chronicData.otherCondition
      ? [...chronicData.selectedConditions, chronicData.otherCondition]
      : chronicData.selectedConditions;
    setField("chronicConditions", finalChronics);

    console.log("debug data:", finalChronics);
    router.push("/auth/signup/emergency");
  };
  const handlePress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
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
          <TouchableOpacity style={styles.backButton} onPress={handlePress}>
            <Image
              source={require("@/assets/utilsIcon/arrow-left-white.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/logo-vita.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>
            Is there any{"\n"}Chronic Conditions?
          </Text>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "60%" }]} />
            </View>
          </View>

          <Text style={styles.subtitle}>You can choose multiple option</Text>

          <View style={styles.selectionContainer}>
            <View style={styles.optionsContainer}>
              {CHRONIC_OPTIONS.map((condition) => (
                <OptionField
                  key={condition}
                  label={condition}
                  isSelected={isSelected(condition)}
                  onPress={() => handleConditionSelect(condition)}
                  type="checkbox"
                />
              ))}

              <TextInput
                style={styles.otherInput}
                placeholder="Other Chronic Conditions...."
                placeholderTextColor={COLORS.gray2}
                value={otherCondition}
                onChangeText={setOtherCondition}
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

export default Chronic;
