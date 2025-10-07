import { useAuth } from "@/hooks/useAuth";
import { useAvatarPicker } from "@/hooks/useAvatarPicker";
import { useUserProfile } from "@/hooks/useUserProfile";
import { styles } from "@/styles/profile/general-form.styles";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ListItem from "../utils/ListItem";
import AvatarPicker from "./AvatarPicker";
import SectionCard from "./SectionCard";
import StatsRow from "./StatsRow";
import { useLastHealthSync } from "@/hooks/useLastHealthSync";
import { useRecordedDays } from "@/hooks/useRecordedDays";
import { useReminderRecords } from "@/hooks/useReminderRecords";

export default function GeneralForm() {
  const { image, pickPhoto } = useAvatarPicker();
  const { data } = useUserProfile();
  const { logout } = useAuth();
  const { lastSync, loading } = useLastHealthSync();
  const { recordedDays, loading: loadingRecorded } = useRecordedDays();
  const { reminderCount, loading: loadingReminder } = useReminderRecords();

  return (
    <>
      <View style={styles.center}>
        <AvatarPicker
          imageUrl={image || data.avatarUrl || undefined}
          onChangeImage={() => pickPhoto("gallery")}
          size={120}
        />
        <Text style={styles.name}>
          {data.firstName} {data.lastName}
        </Text>
        <Text style={styles.username}>{data.username}</Text>
      </View>

      <SectionCard
        title="Monthly Health Report"
        subtitle="See your health report this month."
        style={{ marginTop: 18 }}
      >
        <StatsRow
          stats={[
            { value: loadingRecorded ? "..." : recordedDays, label: "Recorded Days" },
            { value: loadingRecorded ? "..." : reminderCount, label: "Reminder Record" },
          ]}
        />
        <View style={{ height: 12 }} />
        <TouchableOpacity
          style={styles.downloadBtn}
          activeOpacity={1}
          onPress={() => router.push("/profile/report/monthlyReport")}
        >
          <Text style={styles.downloadText}>Download </Text>
          <Image
            source={require("@/assets/utilsIcon/arrow-left.png")}
            style={[styles.downloadIcon, { transform: [{ scaleX: -1 }] }]}
          />
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
          subtitle={loading ? "Loading..." : `Last sync ${lastSync}`}
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
  );
}
