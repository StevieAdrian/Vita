import OptionField from "@/components/OptionField";
import { ALLERGIC_OPTIONS } from "@/constants/allergic";
import { useAllergics } from "@/utils/allergicValidation";
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
import { styles } from "./allergics.style";

const Allergics: React.FC = () => {
  const {
    otherAllergics,
    setOtherAllergics,
    handleAllergicSelect,
    isSelected,
    canContinue,
    handleContinue,
  } = useAllergics();

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
              placeholderTextColor="#666"
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

export default Allergics;
