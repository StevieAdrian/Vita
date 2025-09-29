import PrimaryButtonColorForm from "@/components/utils/PrimaryButtonColorForm";
import TitleBack from "@/components/utils/TitleBack";
import { useUserProfile } from "@/hooks/useUserProfile";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { styles } from "../../styles/profile/digitalBiomarker.styles";

export default function DigitalBiomarker() {
  const insets = useSafeAreaInsets();
  const [hasInput, setHasInput] = useState(false);
  const { data, setData, loading, saveProfile } = useUserProfile();

  const [formValues, setFormValues] = useState({
    systolic: "",
    diastolic: "",
    heartRate: "",
    bloodSugar: "",
    weight: "",
  });

  const handleInputChange = (field: keyof typeof formValues, value: string) => {
    setFormValues((prev) => {
      const updated = { ...prev, [field]: value };
      // cek apakah ada salah satu field yg terisi
      const anyFilled = Object.values(updated).some((v) => v.trim().length > 0);
      setHasInput(anyFilled);
      return updated;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.scrollWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: NAV_ITEMS + insets.bottom + 30,
          }}
        >
          <View style={styles.header}>
            <TitleBack title="Digital Biomarker" />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.bottomInputCont}>
              <Text style={styles.inputTitle}>Blood Pressure (mm Hg)</Text>
              <View style={styles.bpContainer}>
                <View style={styles.bpInputWrapper}>
                  <TextInput
                    style={styles.bpInput}
                    onChangeText={(text) => handleInputChange("systolic", text)}
                    keyboardType="numeric"
                  />
                  <Text style={styles.bpLabel}>Systolic</Text>
                </View>
                <View style={styles.bpInputWrapper}>
                  <TextInput
                    style={styles.bpInput}
                    onChangeText={(text) =>
                      handleInputChange("diastolic", text)
                    }
                    keyboardType="numeric"
                  />
                  <Text style={styles.bpLabel}>Diastolic</Text>
                </View>
              </View>
            </View>

            <View style={styles.bottomInputCont}>
              <Text style={styles.inputTitle}>Heart Rate (bpm)</Text>
              <TextInput
                style={styles.fullInput}
                onChangeText={(text) => handleInputChange("heartRate", text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.bottomInputCont}>
              <Text style={styles.inputTitle}>Blood Sugar (mg/dL)</Text>
              <TextInput
                style={styles.fullInput}
                onChangeText={(text) => handleInputChange("bloodSugar", text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.bottomInputCont}>
              <Text style={styles.inputTitle}>Weight (kg)</Text>
              <TextInput
                style={styles.fullInput}
                onChangeText={(text) => handleInputChange("weight", text)}
                keyboardType="numeric"
              />
            </View>
          </View>

          <PrimaryButtonColorForm text="Save Changes" active={hasInput} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
