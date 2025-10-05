import { useFamilyView } from "@/context/FamilyViewContext";
import { useAuthState } from "@/hooks/useAuthState";
import { useHealthStats } from "@/hooks/useHealthStats";
import { useEarlyWarning } from "@/hooks/useEarlyWarning";
import { useFutureHealth } from "@/hooks/useFutureHealth";
import { useAIRecommendation } from "@/hooks/useAIRecommendation";
import { HEALTH_RECOMMENDATION_PROMPT } from "@/constants/prompt";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useFamilyMemberById } from "@/hooks/useFamilyMemberById"; // Ambil displayName & avatar
import { styles } from "@/styles/hcd/dashboard.style";
import { useDatePickerStyles } from "@/hooks/useDatePicker.styles";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { useState } from "react";
import { stylesMonitor } from "@/styles/utils/monitoring.styles"

export default function MonitorDashboard() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { viewingUid, setViewingUid } = useFamilyView();
  const { user } = useAuthState();
  const [selected, setSelected] = useState<DateType>(new Date());
  const monitoringUid = viewingUid || user?.uid || "";
  const isMonitoring = viewingUid && viewingUid !== user?.uid;
  const { stats, loading } = useHealthStats(monitoringUid);
  const { futureHealth } = useFutureHealth(monitoringUid);
  const datePickerStyle = useDatePickerStyles();

  function formatDateLocal(date: Date) {
    return date.toLocaleDateString("en-CA");
  }

  if (loading) return <Text>Loading...</Text>;

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 18,
        paddingTop: 28,
        paddingBottom: insets.bottom + 32,
        backgroundColor: "#f8fafd",
        flexGrow: 1,
      }}
    >
        {isMonitoring && (
        <TouchableOpacity
          style={stylesMonitor.banner}
          onPress={() => {
            setViewingUid(user!.uid);
            router.push("/family-mode/familyMode");
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center", fontSize: 16 }}>Back to my account</Text>
        </TouchableOpacity>
      )}

      <View style={styles.dateBg}>
        <DateTimePicker
            mode="single"
            date={selected}
            onChange={({ date }) => {
            if (date) {
                let jsDate: Date;

                if (date instanceof Date) {
                    jsDate = date;
                } else if (
                    typeof date === "string" ||
                    typeof date === "number"
                ) {
                    jsDate = new Date(date);
                } else {
                    jsDate = (date as dayjs.Dayjs).toDate();
                }

                setSelected(jsDate);

                const selectedDate = formatDateLocal(jsDate);

                router.push({
                    pathname: "/hcd/diary/viewHealthDiary",
                    params: { date: selectedDate, uid: monitoringUid, isMonitoring: isMonitoring ? "1" : "", },
                });
            }
            }}
            styles={datePickerStyle}
        />
        </View>
    </ScrollView>
  );
}
