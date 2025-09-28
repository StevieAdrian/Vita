import { Image, Text, View } from "react-native";
import AvatarPicker from "../AvatarPicker";
import SectionCard from "../SectionCard";
import StatsRow from "../StatsRow";
import { TouchableOpacity } from "react-native";
import ListItem from "../ListItem";
import { router } from "expo-router";
import { styles } from "@/styles/profile/general-form.styles";
import { useAvatarPicker } from "@/hooks/useAvatarPicker";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAuth } from "@/hooks/useAuth";


export default function GeneralForm() {
    const { image, pickPhoto } = useAvatarPicker();
    const { data } = useUserProfile();
    const { logout } = useAuth();

    return (
        <>
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
              onPress={() => router.push("/family-mode/familyMode")}
            />
            <ListItem
              title="Emergency Contact"
              leftIcon={require("@/assets/images/emergency-icon.png")}
              onPress={() => router.push("/profile/emergencyContact")}
            />
            <ListItem
              title="Log Out"
              leftIcon={require("@/assets/images/logout-icon.png")}
              onPress={logout}
              danger
            />
          </View>
        </>
    )
}