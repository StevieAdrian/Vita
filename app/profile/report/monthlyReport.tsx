import MonthDropdown from "@/components/profile/MonthDropdown";
import PrimaryButtonColorForm from "@/components/utils/PrimaryButtonColorForm";
import TitleBack from "@/components/utils/TitleBack";
import { useMonthlyReport } from "@/hooks/useMonthlyReport";
import { useUserProfile } from "@/hooks/useUserProfile";
import { styles } from "@/styles/profile/monthlyreport.styles";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { calculateAge } from "@/utils/dateUtils";
import { generateReportPDF } from "@/utils/generateReport";
import dayjs from "dayjs";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function MonthlyReport() {
  const insets = useSafeAreaInsets();
  const [month, setMonth] = useState(dayjs().format("MMMM"));
  const { data: user } = useUserProfile();
  const { reportData, loading } = useMonthlyReport(month);

  const handleDownload = async () => {
    if (!reportData) return;

    const age = calculateAge(user.dateOfBirth);
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    await generateReportPDF({
      name: `${user.firstName} ${user.lastName}`,
      dob: user.dateOfBirth ?? "—",
      age,
      today,
      gender: user.gender ?? "—",
      bloodType: user.bloodType ?? "—",
      allergics: user.allergies ?? "-",
      chronic: user.chronic ?? "-",
      updatedAt: reportData.update,
      period: reportData.period,
      bloodSugarHighDate: reportData.bloodSugarHighDate,
      bloodSugarLowDate: reportData.bloodSugarLowDate,
      systolicHighDate: reportData.systolicHighDate,
      systolicLowDate: reportData.systolicLowDate,
      diastolicHighDate: reportData.diastolicHighDate,
      diastolicLowDate: reportData.diastolicLowDate,
      heartRateHighDate: reportData.heartRateHighDate,
      heartRateLowDate: reportData.heartRateLowDate,
      weightHighDate: reportData.weightHighDate,
      weightLowDate: reportData.weightLowDate,
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
                <MonthDropdown onSelect={setMonth} />
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
