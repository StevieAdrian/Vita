import OptionField from "@/components/OptionField";
import { useChronic } from "@/utils/chronicValidation";
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4285F4" />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/Logo Vita.png")}
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
              placeholderTextColor="#666"
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
            onPress={handleContinue}
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
