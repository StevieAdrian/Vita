import AvatarPicker from "@/components/AvatarPicker";
import ListItem from "@/components/ListItem";
import SectionCard from "@/components/SectionCard";
import StatsRow from "@/components/StatsRow";
import TitleBack from "@/components/utils/TitleBack";
import { useAvatarPicker } from "@/hooks/useAvatarPicker";
import { NAV_ITEMS } from "@/styles/bottom-nav.styles";
import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./profile.style";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function Profile() {
  const { image, pickPhoto } = useAvatarPicker();
  const { data } = useUserProfile();
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
            <TitleBack title="Profile" />
          </View>

          <View style={styles.center}>
            <AvatarPicker
              imageUrl={image || data.avatarUrl || undefined}
              onChangeImage={() => pickPhoto("gallery")}
              size={120}
            />
            <Text style={styles.name}>{data.firstName} {data.lastName}</Text>
            <Text style={styles.username}>{data.username}</Text>
          </View>

          <SectionCard
            title="Monthly Health Report"
            subtitle="See your health report this month."
            style={{ marginTop: 18 }}
          >
            <StatsRow
              stats={[
                { value: 28, label: "Recorded Days" },
                { value: 30, label: "Reminder Record" },
              ]}
            />
            <View style={{ height: 12 }} />
            <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.8}>
              <Image
                source={require("@/assets/images/download-icon.png")}
                style={styles.downloadIcon}
              />
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
          </SectionCard>

          <View style={{ gap: 10, marginTop: 18 }}>
            <ListItem
              title="Profile Settings"
              leftIcon={require("@/assets/images/settings-icon.png")}
              onPress={() => router.push("/profile/profileSettings")}
            />
            <ListItem
              title="Digital Biomarker"
              subtitle="Last sync 15/09/2025"
              leftIcon={require("@/assets/images/digital-bio-icon.png")}
              onPress={() => router.push("/profile/digitalBiomarker")}
            />
            <ListItem
              title="Family Mode"
              leftIcon={require("@/assets/images/family-mode-icon.png")}
              onPress={() => {}}
            />
            <ListItem
              title="Emergency Contact"
              leftIcon={require("@/assets/images/emergency-icon.png")}
              onPress={() => router.push("/profile/emergencyContact")}
            />
            <ListItem
              title="Log Out"
              leftIcon={require("@/assets/images/logout-icon.png")}
              onPress={() => {}}
              danger
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
