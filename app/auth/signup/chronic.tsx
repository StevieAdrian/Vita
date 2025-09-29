import OptionField from "@/components/utils/OptionField";
import { COLORS } from "@/constants/colors";
import { useSignupContext } from "@/context/SignupContext";
import { useChronic } from "@/utils/chronicValidation";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./chronic.style";

const Chronic: React.FC = () => {
  const {
    CHRONIC_OPTIONS,
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/images/Logo Vita.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Is there any{"\n"}Chronic Conditions?</Text>

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
      </View>
    </SafeAreaView>
  );
};

export default Chronic;
