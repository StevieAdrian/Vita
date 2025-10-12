import AvatarPicker from "@/components/profile/AvatarPicker";
import { COLORS } from "@/constants/colors";
import { useSignupContext } from "@/context/SignupContext";
import { useAvatarPicker } from "@/hooks/useAvatarPicker";
import { LinearGradient } from "expo-linear-gradient";
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
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
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
  const handlePress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#1A73E8", "#21E2CF"]}
        style={styles.dashboardContainerLinear}
      ></LinearGradient>
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
          <View style={styles.mainWrapper}>
            <TouchableOpacity style={styles.backButton} onPress={handlePress}>
              <Image
                source={require("@/assets/utilsIcon/arrow-left-white.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../../assets/images/logo-vita.png")}
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
                style={[styles.continueButton]}
                onPress={handleContinue}
                activeOpacity={0.8}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileSignup;
