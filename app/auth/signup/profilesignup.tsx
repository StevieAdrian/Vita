import AvatarPicker from "@/components/profile/AvatarPicker";
import { COLORS } from "@/constants/colors";
import { useSignupContext } from "@/context/SignupContext";
import { useAvatarPicker } from "@/hooks/useAvatarPicker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "../../../styles/auth/signup/profilesignup.style";

const ProfileSignup: React.FC = () => {
  const { image, uploading, pickPhoto } = useAvatarPicker(undefined, (url) => {
    setField("avatarUrl", url);
  });
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const { data, setField } = useSignupContext();
  const handleContinue = () => {
    console.log("debug data:", data);
    router.push("/auth/signup/bloodtype");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <View style={styles.content}>
        <View style={styles.mainWrapper}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/Logo Vita.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.avatarContainer}>
            <AvatarPicker
              imageUrl={image ?? undefined}
              onChangeImage={() => pickPhoto("gallery")}
            />
          </View>

          <View style={styles.inputSection}>
            <TextInput
              placeholder="Doe Doe"
              value={data.username || ""}
              editable={false}
              style={[
                styles.inputBox,
                { backgroundColor: COLORS.background2nd },
              ]}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                // !canContinue && styles.continueButtonDisabled,
              ]}
              onPress={handleContinue}
              // disabled={!canContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileSignup;
