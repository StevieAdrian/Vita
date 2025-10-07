import InputField from "@/components/utils/InputField";
import { COLORS } from "@/constants/colors";
import { Relation, RELATION_OPTIONS } from "@/constants/relations";
import { useSignupContext } from "@/context/SignupContext";
import { useAuthState } from "@/hooks/useAuthState";
import { useSignup } from "@/hooks/useSignup";
import {
  EmergencyValues,
  validateForm,
  ValidationErrors,
} from "@/utils/emergencyValidation";
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
import Icon from "react-native-vector-icons/Feather";
import { styles } from "../../../styles/auth/signup/emergency.styles";

export default function EmergencyContact() {
  const [name, setName] = useState("");
  const [relations, setRelations] = useState<Relation | "">("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showRelationsDropdown, setShowRelationsDropdown] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { data, setField } = useSignupContext();
  const { signup, signupWithGoogle, loading, error } = useSignup();
  const { user } = useAuthState();

  const handleRelationsPress = () => {
    setShowRelationsDropdown(!showRelationsDropdown);
  };

  const selectRelation = (relation: Relation) => {
    setRelations(relation);
    setShowRelationsDropdown(false);
  };

  const handleContinue = async () => {
    const values: EmergencyValues = {
      name,
      phoneNumber,
      relation: relations,
    };
    const newErrors = validateForm(values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const finalContacts = [...(data.emergencyContacts || []), values];

      try {
        if (user) {
          const isGoogleUser = user.providerData.some(
            (provider) => provider.providerId === "google.com"
          );

          if (isGoogleUser) {
            await signupWithGoogle(user, {
              username: data.username!,
              firstName: data.firstName!,
              lastName: data.lastName!,
              phoneNumber: data.phoneNumber,
              dateOfBirth: data.dateOfBirth,
              gender: data.gender,
              bloodType: data.bloodType,
              allergies: data.allergies,
              chronicConditions: data.chronicConditions,
              emergencyContacts: finalContacts,
              avatarUrl: data.avatarUrl || user.photoURL || undefined,
            });
          } else {
            const uid = await signup({
              ...data,
              emergencyContacts: finalContacts,
            } as any);
            console.log("debug uid:", uid);
          }
          router.push("/");
        }
      } catch (err) {
        console.error("Signup failed:", err);
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
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
          <View style={styles.header}>
            <Image
              source={require("../../../assets/images/Logo Vita.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>Add Emergency{"\n"}Contacts</Text>

            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
            </View>
          </View>

          <View style={styles.formWrapper}>
            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>Emergency Contact</Text>
              <View style={styles.underline} />

              <InputField
                label="Name"
                placeholder="Doe"
                value={name}
                onChangeText={setName}
                required
                placeholderTextColor={COLORS.gray2}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <View style={styles.dropdownWrapper}>
                <Text style={styles.label}>
                  Relations <Text style={styles.required}>*</Text>
                </Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={handleRelationsPress}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      !relations && styles.placeholderText,
                    ]}
                  >
                    {relations || "Select relation"}
                  </Text>
                  <Icon
                    name={showRelationsDropdown ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={COLORS.black}
                  />
                </TouchableOpacity>

                {showRelationsDropdown && (
                  <View style={styles.dropdownMenu}>
                    <ScrollView
                      style={styles.dropdownScroll}
                      nestedScrollEnabled={true}
                    >
                      {RELATION_OPTIONS.map((option) => (
                        <TouchableOpacity
                          key={option}
                          style={styles.dropdownOption}
                          onPress={() => selectRelation(option)}
                          activeOpacity={0.7}
                        >
                          <Text style={styles.dropdownOptionText}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
                {errors.relation && (
                  <Text style={styles.errorText}>{errors.relation}</Text>
                )}
              </View>

              <InputField
                label="Phone Number"
                placeholder="087223627139"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                required
                placeholderTextColor={COLORS.gray2}
              />
              {errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}

              <TouchableOpacity
                style={styles.continueButton}
                activeOpacity={0.8}
                onPress={handleContinue}
                disabled={loading}
              >
                <Text style={styles.continueText}>
                  {loading ? "Saving..." : "Finish & Save"}
                </Text>
              </TouchableOpacity>

              {error && <Text style={{ color: "red" }}>{error}</Text>}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
