import InputField from "@/components/utils/InputField";
import PrimaryButtonColorForm from "@/components/utils/PrimaryButtonColorForm";
import TitleBack from "@/components/utils/TitleBack";
import { COLORS } from "@/constants/colors";
import { Relation, RELATION_OPTIONS } from "@/constants/relations";
import { useAuthState } from "@/hooks/useAuthState";
import { useCheckUsername } from "@/hooks/useCheckUsername";
import { useFamilyRequests } from "@/hooks/useFamilyRequests";
import { useUserProfile } from "@/hooks/useUserProfile";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import { styles } from "../../styles/family-mode/addFamily.styles";

export default function AddFamily() {
  const insets = useSafeAreaInsets();
  const [showRelationsDropdown, setShowRelationsDropdown] = useState(false);
  const { data, setData, loading, saveProfile } = useUserProfile();
  const { exists, isChecking, verifyUsername } = useCheckUsername();
  const { requestFamily } = useFamilyRequests();
  const { user } = useAuthState();

  const [form, setForm] = useState({
    name: "",
    relation: "",
    username: "",
    notes: "",
  });
  const handleRelationsPress = () => {
    setShowRelationsDropdown(!showRelationsDropdown);
  };

  const selectRelation = (relation: Relation) => {
    setForm((prev) => ({ ...prev, relation }));
    setShowRelationsDropdown(false);
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSend = async () => {
    if (!form.name || !form.relation || !form.username) {
      alert("Please fill all required fields");
      return;
    }
    if (!exists) {
      alert("Username not found");
      return;
    }

    const result = await requestFamily({
      fromUid: user!.uid,
      toUsername: form.username,
      relation: form.relation,
      notes: form.notes,
      displayName: form.name,
    });

    if (result.success) {
      setForm({ name: "", relation: "", username: "", notes: "" });
    } else {
      console.log("debug err: " + result.message);
    }
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
            <TitleBack title="Add Family Member" />
          </View>

          <InputField
            label="Name"
            placeholder={"John Doe"}
            onChangeText={(text) => handleChange("name", text)}
            required
          />

          <View>
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
                    !form.relation && styles.placeholderText,
                  ]}
                >
                  {form.relation || "Select relation"}
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
          </View>

          <InputField
            label="Account Username"
            placeholder={"John Doe"}
            onChangeText={(text) => {
              handleChange("username", text);
              if (text.trim().length >= 3) {
                verifyUsername(text.trim());
              } else {
                verifyUsername("");
              }
            }}
            required
            rightIcon={
              isChecking ? (
                <Icon name="loader" size={20} color={COLORS.gray2} />
              ) : exists === true ? (
                <Icon name="check-circle" size={20} color="green" />
              ) : exists === false ? (
                <Icon name="x-circle" size={20} color="red" />
              ) : null
            }
          />

          <Text style={styles.reqNotes}>
            Request Notes
            <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.otherInput}
            placeholder="Input your notes here..."
            placeholderTextColor={COLORS.gray2}
            multiline
            value={form.notes}
            onChangeText={(text) => handleChange("notes", text)}
          />

          <PrimaryButtonColorForm
            text={loading ? "Sending..." : "Send Request"}
            active={!!form.username && !!form.relation && !!form.name}
            onPress={handleSend}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
