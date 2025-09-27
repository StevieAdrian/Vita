import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./emergencyContact.styles"
import { NAV_ITEMS } from "@/styles/bottom-nav.styles";
import TitleBack from "@/components/utils/TitleBack";
import InputField from "@/components/InputField";
import { useUserProfile } from "@/hooks/useUserProfile";
import React, { useEffect, useState } from "react";
import { Relation, RELATION_OPTIONS } from "@/constants/relations";
import { COLORS } from "@/constants/colors";
import Icon from "react-native-vector-icons/Feather";
import PrimaryButtonColorForm from "@/components/utils/PrimaryButtonColorForm";

export default function EmergencyContact() {
    const insets = useSafeAreaInsets();
    const { data, setData, loading, saveProfile } = useUserProfile();
    const [showRelationsDropdown, setShowRelationsDropdown] = useState(false);
    const [hasInput, setHasInput] = useState(false);
    const [originalData, setOriginalData] = useState<any>(null);

    const contact = data.emergencyContacts[0] || { name: "", phoneNumber: "", relation: "" };
    const handleChange = (field: keyof typeof contact, value: string) => {
        setData((prev) => ({ ...prev, emergencyContacts: [{ ...contact, [field]: value }] }));
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
            <View style={styles.scrollWrapper}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: NAV_ITEMS + insets.bottom + 30, }}>
                    <View style={styles.header}>
                        <TitleBack title="Emergency Contact" />
                    </View>

                    <View>
                        <InputField label="Name" value={contact.name} onChangeText={(text) => handleChange("name", text)}/>

                        <View style={styles.dropdownWrapper}>
                            <Text style={styles.label}>
                                Relations <Text style={styles.required}>*</Text>
                            </Text>
                            <TouchableOpacity
                                style={styles.dropdownButton}
                                onPress={handleRelationsPress}
                                activeOpacity={0.7}
                            >
                                <Text style={[ styles.dropdownText, !contact.relation && styles.placeholderText ]} >
                                    {contact.relation || "Select relation"}
                                </Text>
                                <Icon name={showRelationsDropdown ? "chevron-up" : "chevron-down"} size={20} color={COLORS.black} />
                            </TouchableOpacity>

                            {showRelationsDropdown && (
                                <View style={styles.dropdownMenu}>
                                    <ScrollView style={styles.dropdownScroll} nestedScrollEnabled={true}>
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
                    </View>

                    <InputField label="Phone Number" value={contact.phoneNumber} keyboardType="phone-pad" required onChangeText={(text) => handleChange("phoneNumber", text)} />
                    <PrimaryButtonColorForm text="Save Changes" active={hasInput} onPress={handleSave} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
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
