import InputField from "@/components/utils/InputField";
import PrimaryButtonColorForm from "@/components/utils/PrimaryButtonColorForm";
import TitleBack from "@/components/utils/TitleBack";
import { COLORS } from "@/constants/colors";
import { Relation, RELATION_OPTIONS } from "@/constants/relations";
import { useUserProfile } from "@/hooks/useUserProfile";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import { styles } from "../../styles/profile/emergencyContact.styles";

export default function EmergencyContact() {
  const insets = useSafeAreaInsets();
  const { data, setData, loading, saveProfile } = useUserProfile();
  const [showRelationsDropdown, setShowRelationsDropdown] = useState(false);
  const [hasInput, setHasInput] = useState(false);
  const [originalData, setOriginalData] = useState<any>(null);

  const contact = data.emergencyContacts[0] || {
    name: "",
    phoneNumber: "",
    relation: "",
  };
  const handleChange = (field: keyof typeof contact, value: string) => {
    setData((prev) => ({
      ...prev,
      emergencyContacts: [{ ...contact, [field]: value }],
    }));
  };

  const handleRelationsPress = () => {
    setShowRelationsDropdown(!showRelationsDropdown);
  };

  const selectRelation = (relation: Relation) => {
    setData((prev) => ({
      ...prev,
      emergencyContacts: [{ ...contact, relation }],
    }));
    setShowRelationsDropdown(false);
  };

  useEffect(() => {
    if (!loading && data && !originalData) {
      setOriginalData({ ...data });
    }
  }, [loading, data, originalData]);

  useEffect(() => {
    if (originalData) {
      const changed = isProfileChanged(data, originalData);
      setHasInput(changed);
    }
  }, [data, originalData]);

  const handleSave = async () => {
    await saveProfile();
    setOriginalData({ ...data });
    setHasInput(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#E9F3FF", "#1A73E8"]}
        style={styles.dashboardContainerLinear}
      ></LinearGradient>
      <View style={styles.scrollWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: NAV_ITEMS + insets.bottom + 30,
          }}
        >
          <View style={styles.header}>
            <TitleBack title="Emergency Contact" />
          </View>

          <View style={styles.container}>
            <InputField
              label="Name"
              value={contact.name}
              onChangeText={(text) => handleChange("name", text)}
            />

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
                    !contact.relation && styles.placeholderText,
                  ]}
                >
                  {contact.relation || "Select relation"}
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
                        <Text style={styles.dropdownOptionText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
            <InputField
              label="Phone Number"
              value={contact.phoneNumber}
              keyboardType="phone-pad"
              required
              onChangeText={(text) => handleChange("phoneNumber", text)}
            />
          </View>

          <PrimaryButtonColorForm
            text="Save Changes"
            active={hasInput}
            onPress={handleSave}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function isProfileChanged(current: any, original: any) {
  if (!current || !original) return false;

  const currContact = current.emergencyContacts?.[0] || {};
  const originalContact = original.emergencyContacts?.[0] || {};

  const fieldsToCheck = ["name", "phoneNumber", "relation"];

  return fieldsToCheck.some(
    (field) => currContact[field] !== originalContact[field]
  );
}
