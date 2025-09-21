import OptionField from "@/components/OptionField";
import React, { useState } from "react";
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

interface AllergicsProps {}

const Allergics: React.FC<AllergicsProps> = () => {
  const [selectedAllergics, setSelectedAllergics] = useState<string[]>([]);
  const [otherAllergics, setOtherAllergics] = useState<string>("");

  const allergicOptions = [
    "There is no Allergics",
    "Peanuts",
    "Seafood",
    "Tree Nuts",
    "Milk",
  ];

  const handleAllergicSelect = (allergic: string) => {
    if (allergic === "There is no Allergics") {
      setSelectedAllergics(
        selectedAllergics.includes(allergic) ? [] : [allergic]
      );
    } else {
      const filteredAllergics = selectedAllergics.filter(
        (item) => item !== "There is no Allergics"
      );

      if (selectedAllergics.includes(allergic)) {
        setSelectedAllergics(
          filteredAllergics.filter((item) => item !== allergic)
        );
      } else {
        setSelectedAllergics([...filteredAllergics, allergic]);
      }
    }
  };

  const isSelected = (allergic: string) => selectedAllergics.includes(allergic);

  const handleContinue = () => {
    const allergicsData = {
      selectedAllergics,
      otherAllergics: otherAllergics.trim(),
    };

    console.log("Allergics data:", allergicsData);
    // href kemana dan simpan kemana
  };

  const canContinue = selectedAllergics.length > 0;

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

        <Text style={styles.title}>Is there any{"\n"}Allergics?</Text>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "40%" }]} />
          </View>
        </View>

        <Text style={styles.subtitle}>You can choose multiple option</Text>

        <View style={styles.selectionContainer}>
          <View style={styles.optionsContainer}>
            {allergicOptions.map((allergic) => (
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
