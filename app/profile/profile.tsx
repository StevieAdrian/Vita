import TitleBack from "@/components/utils/TitleBack";
import { NAV_ITEMS } from "@/styles/bottom-nav.styles";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./profile.style";
import TabButton from "@/components/utils/TabButton";
import { useState } from "react";
import GeneralForm from "@/components/profile/GeneralForm";
import PasswordForm from "@/components/profile/PasswordForm";

export default function Profile() {

  const [activeTab, setActiveTab] = useState<"general" | "password">("general");
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: NAV_ITEMS + insets.bottom + 16 },
        ]}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TitleBack title="Profile Settings" />
          </View>

          <View style={styles.tabContainer}>
            <TabButton title="General" icon={require("@/assets/images/user-icon.png")} active={activeTab === "general"} onPress={() => setActiveTab("general")}/>
            <TabButton title="Edit Password" icon={require("@/assets/images/password-icon.png")} active={activeTab === "password"} onPress={() => setActiveTab("password")}/>
          </View>

          {activeTab === "general" ? (
            <GeneralForm />
          ) : (
            <PasswordForm />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
