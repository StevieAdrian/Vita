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

export default function MonthlyReport() {
  const insets = useSafeAreaInsets();
  const [month, setMonth] = useState("September");
  const { loading } = useUserProfile();

  const handleDownload = async () => {
    await generateReportPDF({
      name: "Alicia Felisha",
      dob: "August 25, 2005",
      age: 20,
      gender: "Female",
      bloodType: "B",
      period: "September 1, 2025 - September 30, 2025",
      bloodSugar: { avg: 120, high: 180, low: 60 },
      bloodPressure: {
        avg: "120/80 mmHg",
        high: "160/100 mmHg",
        low: "110/70 mmHg",
      },
      heartRate: { avg: 120, high: 180, low: 60 },
      weight: { avg: 65, high: 68, low: 64 },
      appointments: [
        {
          date: "September 1, 2025",
          desc: "Control Checkup Mata - RS Bravia | Dr. Veni | 13.00",
          status: "Confirmed",
        },
        {
          date: "September 5, 2025",
          desc: "Cabut Gigi - RS Bravia | Dr. Veni | 13.00",
          status: "Not Confirmed",
        },
      ],
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
                <MonthDropdown />
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
