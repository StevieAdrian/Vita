import MonthDropdown from "@/components/profile/MonthDropdown";
import PrimaryButtonColorForm from "@/components/utils/PrimaryButtonColorForm";
import TitleBack from "@/components/utils/TitleBack";
import { useUserProfile } from "@/hooks/useUserProfile";
import { styles } from "@/styles/profile/monthlyreport.styles";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { generateReportPDF } from "@/utils/generateReport";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useMonthlyReport } from "@/hooks/useMonthlyReport";
import { calculateAge } from "@/utils/dateUtils";
import dayjs from "dayjs";

export default function MonthlyReport() {
  const insets = useSafeAreaInsets();
  const [month, setMonth] = useState(dayjs().format("MMMM"));
  const { data: user } = useUserProfile();
  const { reportData, loading } = useMonthlyReport(month);

  const handleDownload = async () => {
    if (!reportData) return;

    const age = calculateAge(user.dateOfBirth);

    await generateReportPDF({
      name: `${user.firstName} ${user.lastName}`,
      dob: user.dateOfBirth ?? "—",
      age,
      gender: user.gender ?? "—",
      bloodType: user.bloodType ?? "—",
      period: reportData.period,
      ...reportData,
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: NAV_ITEMS + insets.bottom + 16 },
          ]}
        >
          <View style={styles.headerContainer}>
            <TitleBack title="My Report" />
          </View>

          <View style={styles.contentWrapper}>
            <View style={styles.formContainer}>
              <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Month</Text>
                <MonthDropdown onSelect={setMonth}/>
              </View>

              <View style={styles.previewSection}>
                <Text style={styles.warningText}>Preview Content</Text>
                <Image
                  source={require("@/assets/images/report-preview.png")}
                  style={styles.previewImage}
                />
              </View>

              <View style={styles.textPdf}>
                <Text style={styles.warningText}>Download Full PDF</Text>
                <PrimaryButtonColorForm
                  text={loading ? "Loading..." : "Download"}
                  active={true}
                  onPress={handleDownload}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
