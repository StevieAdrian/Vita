import InputField from "@/components/InputField";
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
import { styles } from "./emergency.styles";

export default function EmergencyContacts({ navigation }) {
  const [name, setName] = useState("");
  const [relations, setRelations] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showRelationsDropdown, setShowRelationsDropdown] = useState(false);

  const relationOptions = [
    "Grandparents",
    "Grandchildren",
    "Parents",
    "Cousins",
    "Children",
    "Others",
  ];

  const handleRelationsPress = () => {
    setShowRelationsDropdown(!showRelationsDropdown);
  };

  const selectRelation = (relation) => {
    setRelations(relation);
    setShowRelationsDropdown(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <StatusBar barStyle="light-content" backgroundColor="#4285F4" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/Logo Vita.png")}
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

            <InputField
              label="Name"
              placeholder="Doe"
              value={name}
              onChangeText={setName}
              required
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
                    !relations && styles.placeholderText,
                  ]}
                >
                  {relations || "Select relation"}
                </Text>
                <Icon
                  name={showRelationsDropdown ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>

              {showRelationsDropdown && (
                <View style={styles.dropdownMenu}>
                  <ScrollView
                    style={styles.dropdownScroll}
                    nestedScrollEnabled={true}
                  >
                    {relationOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
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
              placeholder="087223627139"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              required
            />

            <TouchableOpacity style={styles.continueButton} activeOpacity={0.8}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
