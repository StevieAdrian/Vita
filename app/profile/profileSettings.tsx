import AvatarPicker from "@/components/AvatarPicker";
import InputField from "@/components/InputField";
import { NAV_ITEMS } from "@/styles/bottom-nav.styles";
import { useAvatarPicker } from "@/hooks/useAvatarPicker";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./profileSettings.style";
import TitleBack from "@/components/utils/TitleBack";
import { BLOODTYPE_OPTIONS, bloodType } from "@/constants/bloodType";
import { COLORS } from "@/constants/colors";
import { useAllergics } from "@/utils/allergicValidation";
import FormLabel from "@/components/FormLabel";
import { useUserProfile } from "@/hooks/useUserProfile"
import Calender from "@/components/Calender";

export default function ProfileSettings() {
  const { image, pickPhoto } = useAvatarPicker();
  const insets = useSafeAreaInsets();
  const { data, setData, loading, saveProfile } = useUserProfile();
  const { otherAllergics, setOtherAllergics } = useAllergics();

  const handleChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.scrollWrapper}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          paddingHorizontal: 20, paddingBottom: NAV_ITEMS + insets.bottom + 30,
        }}>
          <View style={styles.header}>
            <TitleBack title="Profile Settings" />
          </View>

          <View style={styles.avatarContainer}>
            <AvatarPicker
              imageUrl={image || data.avatarUrl || undefined}
              onChangeImage={() => pickPhoto("gallery")}
              size={100}
            />
          </View>

          <View>
            <InputField label="Username" value={data.username} />
            <InputField label="First Name" value={data.firstName} required onChangeText={(text) => handleChange("firstName", text)} />
            <InputField label="Last Name" value={data.lastName} required onChangeText={(text) => handleChange("lastName", text)}/>
            <InputField label="Phone Number" value={data.phoneNumber} keyboardType="phone-pad" required onChangeText={(text) => handleChange("phoneNumber", text)} />
            
            <View style={styles.dobWrapper}>
              <InputField label="Date of Birth" value={data.dateOfBirth} required onChangeText={(text) => handleChange("dateOfBirth", text)} />
              <Calender
                value={data.dateOfBirth}
                onSelectDate={(date) => handleChange("dateOfBirth", date)}
              />
            </View>

            <View style={styles.radioGroup}>
              <FormLabel label="Gender" required />
            </View>

            <View style={styles.genderContainer}>
              <TouchableOpacity style={styles.genderOption} onPress={() => handleChange("gender", "Male")} activeOpacity={0.7} >
                <View style={[ styles.radioButton, data.gender === "Male" && styles.radioButtonSelected ]} >
                  {data.gender === "Male" && ( <View style={styles.radioButtonInner} /> )}
                </View>
                <Text style={styles.genderText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.genderOption} onPress={() => handleChange("gender", "Female")} activeOpacity={0.7} >
                <View style={[ styles.radioButton, data.gender === "Female" && styles.radioButtonSelected ]}>
                  {data.gender === "Female" && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={styles.genderText}>Female</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.radioGroup}>
              <FormLabel label="Blood Type" required />
            </View>

            <View style={styles.genderContainer}>
              {BLOODTYPE_OPTIONS.map((i) => (
                <TouchableOpacity key={i} style={styles.genderOption} onPress={() => handleChange("bloodType", i)} activeOpacity={0.7}>
                  <View
                    style={[ styles.radioButton, data.bloodType === i && styles.radioButtonSelected ]} >
                    {data.bloodType === i && ( 
                      <View style={styles.radioButtonInner} /> 
                    )}
                  </View>
                  <Text style={styles.genderText}>{i}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.radioGroup}>
              <FormLabel label="Allergics" required />
            </View>
            <View style={styles.genderContainer}>
              {["No", "Yes"].map((i) => (
                <TouchableOpacity key={i} style={styles.genderOption} onPress={() => handleChange("hasAllergics", i)} activeOpacity={0.7}>
                  <View style={[ styles.radioButton, data.hasAllergics === i && styles.radioButtonSelected ]} >
                    {data.hasAllergics === i && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles.genderText}>{i}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {data.hasAllergics === "Yes" && (
              <TextInput
                style={styles.otherInput}
                placeholder="Other Allergics..."
                placeholderTextColor= {COLORS.gray2}
                value={data.allergics}
                onChangeText={(text) => handleChange("allergics", text)}
                multiline
              />
            )}
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}
