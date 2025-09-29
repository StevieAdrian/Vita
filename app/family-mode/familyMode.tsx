import UpHeader from "@/components/hcd/UpHeader";
import { useFamilyMembers } from "@/hooks/useFamilyMembers";
import { useIncomingRequests } from "@/hooks/useIncomingRequest";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { styles } from "../../styles/family-mode/familyMode.styles";

export default function FamilyMode() {
  const insets = useSafeAreaInsets();
  const { members, loading } = useFamilyMembers();
  const { count } = useIncomingRequests();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: NAV_ITEMS + insets.bottom + 16 },
        ]}
      >
        <UpHeader title="Family Health Control" showProfile={false} />
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.requestContainer}
          onPress={() => router.push("/family-mode/requestList")}
        >
          <View>
            <Text style={styles.requestTitle}>Request List</Text>
            <Text style={styles.requestSubtitle}>{count} Request(s)</Text>
          </View>
          <Image
            source={require("@/assets/utilsIcon/chevron-right-black.png")}
            style={styles.chevron}
          />
        </TouchableOpacity>

        <View style={styles.separator} />
        <View style={styles.container}>
          <Text style={styles.textHeader}>Your Member</Text>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => router.push("/family-mode/addFamily")}
            >
              <Image
                source={require("@/assets/utilsIcon/add-icon.png")}
                style={styles.memberIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Image
              source={require("@/assets/utilsIcon/edit-icon.png")}
              style={styles.memberIcon}
              resizeMode="contain"
            />
          </View>
        </View>

        {members.map((m) => (
          <View key={m.uid} style={styles.memberCard}>
            <View style={styles.memberHeader}>
              <Image
                source={{
                  uri:
                    m.avatarUrl ||
                    "https://ui-avatars.com/api/?name=" + m.displayName,
                }}
                style={styles.memberAvatar}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.memberName}>{m.displayName}</Text>
                <Text style={styles.memberRelation}>{m.relation}</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <View style={styles.dot} />
                <View>
                  <Text style={styles.statValue}>120/80</Text>
                  <Text style={styles.statLabel}>Blood Pressure</Text>
                </View>
              </View>
              <View style={styles.statBox}>
                <View style={styles.dot} />
                <View>
                  <Text style={styles.statValue}>80 bpm</Text>
                  <Text style={styles.statLabel}>Heart Rate</Text>
                </View>
              </View>
            </View>

            <View style={styles.alertRow}>
              <Image
                source={require("@/assets/family/alert-icon.png")}
                style={styles.alertIcon}
              />
              <Text style={styles.alertText}>1 Alert Need Attentions</Text>
            </View>

            <TouchableOpacity style={styles.monitorBtn}>
              <Text style={styles.monitorBtnText}>Monitor Account</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
