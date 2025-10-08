import UpHeader from "@/components/hcd/UpHeader";
import { useFamilyView } from "@/context/FamilyViewContext";
import { useAuthState } from "@/hooks/useAuthState";
import { useEarlyWarning } from "@/hooks/useEarlyWarning";
import { useFamilyMembers } from "@/hooks/useFamilyMembers";
import { useIncomingRequests } from "@/hooks/useIncomingRequest";
import { useLatestHealthDiary } from "@/hooks/useLatestHealthDiary";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useFamilyActions } from "../../hooks/useFamilyActions";
import { styles } from "../../styles/family-mode/familyMode.styles";

export default function FamilyMode() {
  const insets = useSafeAreaInsets();
  const { members, loading } = useFamilyMembers();
  const { count } = useIncomingRequests();
  const [editMode, setEditMode] = useState(false);
  const { removeMember } = useFamilyActions();
  const { setViewingUid } = useFamilyView();
  const { user } = useAuthState();

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#E9F3FF", "#1A73E8"]}
        style={styles.dashboardContainerLinear}
      ></LinearGradient>
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
            source={require("@/assets/mediTrack/arrow-right.svg")}
            style={styles.chevron}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        {members.length > 0 ? (
          <>
            <View style={styles.container}>
              <Text style={styles.textHeader}>Your Member</Text>
              <View style={styles.imageContainer}>
                {editMode ? (
                  <TouchableOpacity onPress={() => setEditMode(false)}>
                    <Image
                      source={require("@/assets/mediTrack/remove.svg")}
                      style={styles.memberIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() => router.push("/family-mode/addFamily")}
                    >
                      <Image
                        source={require("@/assets/mediTrack/plus.svg")}
                        style={styles.memberIcon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setEditMode(true)}>
                      <Image
                        source={require("@/assets/mediTrack/edit.svg")}
                        style={styles.memberIcon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>

            {members.map((m) => (
              <MemberStatCard
                key={m.uid}
                m={m}
                editMode={editMode}
                removeMember={removeMember}
                setViewingUid={setViewingUid}
                router={router}
              />
            ))}
          </>
        ) : (
          <View style={styles.cont}>
            <Text style={styles.noMembers}> No Family Member Added</Text>
            <TouchableOpacity
              style={styles.addMember}
              onPress={() => router.push("/family-mode/addFamily")}
            >
              <Text style={styles.buttonAdd}>+ Add Member</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

type MemberStatCardProps = {
  m: any;
  editMode: boolean;
  removeMember: (uid: string, relation: string) => Promise<any>;
  setViewingUid: (uid: string) => void;
  router: any;
};

function MemberStatCard({
  m,
  editMode,
  removeMember,
  setViewingUid,
  router,
}: MemberStatCardProps) {
  const { data: latestDiary, loading: loadingDiary } = useLatestHealthDiary(
    m.uid
  );
  const { warnings = [], loading: loadingWarning } = useEarlyWarning(m.uid);

  const warningCount = warnings.filter(
    (warn) => warn.status && !warn.status.toLowerCase().includes("good")
  ).length;

  return (
    <View style={styles.memberCard}>
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

      {editMode && (
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={async () => {
            const res = await removeMember(m.uid, m.relation);
            if (!res?.success) console.log("debug err: ", res?.message);
          }}
        >
          <Image
            source={require("@/assets/family/delete-icon.png")}
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
      )}

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <View style={styles.dot} />
          <View>
            <Text style={styles.statValue}>
              {loadingDiary
                ? "-"
                : latestDiary
                ? `${latestDiary.systolic ?? "-"} / ${
                    latestDiary.diastolic ?? "-"
                  }`
                : "-"}
            </Text>
            <Text style={styles.statLabel}>Blood Pressure</Text>
          </View>
        </View>
        <View style={styles.statBox}>
          <View style={styles.dot} />
          <View>
            <Text style={styles.statValue}>
              {loadingDiary
                ? "-"
                : latestDiary
                ? `${latestDiary.heartRate ?? "-"} bpm`
                : "-"}
            </Text>
            <Text style={styles.statLabel}>Heart Rate</Text>
          </View>
        </View>
      </View>

      {warningCount > 0 && (
        <View style={styles.alertRow}>
          <Image
            source={require("@/assets/family/alert-icon.png")}
            style={styles.alertIcon}
          />
          <Text style={[styles.alertText, { color: "red" }]}>
            {loadingWarning ? "-" : `${warningCount} Alert Need Attentions`}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.monitorBtn}
        onPress={() => {
          setViewingUid(m.uid);
          router.push("/family-mode/monitorDashboard");
        }}
      >
        <Text style={styles.monitorBtnText}>Monitor Account</Text>
      </TouchableOpacity>
    </View>
  );
}
