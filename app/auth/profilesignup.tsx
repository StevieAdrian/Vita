import AvatarPicker from "@/components/AvatarPicker";
import { useAvatarPicker } from "@/hooks/useAvatarPicker";
import React, { useState } from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "./profilesignup.style";

interface ProfileSignupProps {}

const ProfileSignup: React.FC<ProfileSignupProps> = () => {
  const { image, uploading, pickPhoto } = useAvatarPicker();
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");

  const handleAvatarSelect = (avatarUri: string) => {
    setSelectedAvatar(avatarUri);
  };

  const handleContinue = () => {
    const profileData = {
      // username,
      avatar: selectedAvatar,
    };
    // href
  };

  // const canContinue = !!username;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4285F4" />

      <View style={styles.content}>
        <View style={styles.mainWrapper}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/Logo Vita.png")}
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
              // value={username}
              // value -> username ambil dr db / atau pindahin data dr signup
              editable={false}
              style={[styles.inputBox, { backgroundColor: "#eee" }]}
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
