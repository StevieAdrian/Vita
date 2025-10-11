import GeneralForm from "@/components/profile/GeneralForm";
import PasswordForm from "@/components/profile/PasswordForm";
import TabButton from "@/components/utils/TabButton";
import TitleBack from "@/components/utils/TitleBack";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { styles } from "../../styles/profile/profile.style";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"general" | "password">("general");
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#ECF4FF", "#1A73E8"]}
        style={styles.dashboardContainerLinear}
      ></LinearGradient>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: NAV_ITEMS + insets.bottom + 16 },
        ]}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TitleBack title="My Profile" />
          </View>

          <View style={styles.tabContainer}>
            <TabButton
              title="General"
              icon={require("@/assets/images/user-icon.png")}
              active={activeTab === "general"}
              onPress={() => setActiveTab("general")}
            />
            <TabButton
              title="Edit Password"
              icon={require("@/assets/images/password-icon.png")}
              active={activeTab === "password"}
              onPress={() => setActiveTab("password")}
            />
          </View>

          {activeTab === "general" ? <GeneralForm /> : <PasswordForm />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
