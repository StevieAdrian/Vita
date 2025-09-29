import TitleBack from "@/components/utils/TitleBack";
import { useAuthState } from "@/hooks/useAuthState";
import { useFamilyRequests } from "@/hooks/useFamilyRequests";
import { useIncomingRequests } from "@/hooks/useIncomingRequest";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { styles } from "../../styles/family-mode/requestList.styles";

export default function RequestList() {
  const { user } = useAuthState();
  const insets = useSafeAreaInsets();
  const { requests, loading } = useIncomingRequests();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"accept" | "decline" | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const { acceptRequest, declineRequest } = useFamilyRequests();

  const handleAccept = (req: any) => {
    setSelectedRequest(req);
    setModalType("accept");
    setModalVisible(true);
  };

  const handleDecline = (req: any) => {
    setSelectedRequest(req);
    setModalType("decline");
    setModalVisible(true);
  };

  const handleYes = async () => {
    if (modalType === "accept") {
      await acceptRequest(
        selectedRequest.id,
        selectedRequest.fromUid,
        user!.uid,
        selectedRequest.relation
      );
    } else if (modalType === "decline") {
      await declineRequest(selectedRequest.id);
    }

    setModalVisible(false);
    setModalType(null);
    setSelectedRequest(null);
  };

  const handleNo = () => {
    setModalVisible(false);
    setModalType(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: NAV_ITEMS + insets.bottom + 30,
        }}
      >
        <View style={styles.header}>
          <TitleBack title="Request List" />
        </View>

        {loading && <Text>Loading...</Text>}

        {!loading && requests.length === 0 && <Text>No requests found</Text>}

        {requests.map((r) => (
          <View key={r.id} style={styles.card}>
            <View style={styles.headerRow}>
              <Image source={{ uri: r.avatarUrl }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{r.displayName}</Text>
              </View>
            </View>

            {r.notes ? (
              <View style={{ marginTop: 8 }}>
                <Text style={styles.label}>Description</Text>
                <Text style={styles.value}>{r.notes}</Text>
              </View>
            ) : null}

            <View style={{ marginTop: 8 }}>
              <Text style={styles.label}>Request Relations</Text>
              <Text style={styles.value}>{r.relation}</Text>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => handleAccept(r)}
              >
                <View style={styles.actionContent}>
                  <Image
                    source={require("@/assets/family/accept-icon.png")}
                    style={styles.actionIcon}
                  />
                  <Text style={styles.acceptText}>Accept</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.declineBtn}
                onPress={() => handleDecline(r)}
              >
                <View style={styles.actionContent}>
                  <Image
                    source={require("@/assets/family/decline-icon.png")}
                    style={styles.actionIconDecline}
                  />
                  <Text style={styles.declineText}>Decline</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {modalType === "accept"
                  ? "Accept This Member?"
                  : "Decline This Member?"}
              </Text>
              <Text style={styles.modalSubtitle}>Confirmation Your Action</Text>
              <TouchableOpacity style={styles.modalYesBtn} onPress={handleYes}>
                <Text style={styles.modalYesText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalNoBtn} onPress={handleNo}>
                <Text style={styles.modalNoText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
