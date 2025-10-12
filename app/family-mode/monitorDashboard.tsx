import { EarlyGoodCard } from "@/components/analysis/EarlyCard";
import { AppointmentCard } from "@/components/meditrack-forms/AppointmentCard";
import {
  convertDrugToReminder,
  ReminderCard,
} from "@/components/meditrack-forms/Reminder";
import { convertAppointment } from "@/components/utils/DateUtils";
import { Reminder } from "@/constants/reminder";
import { useFamilyView } from "@/context/FamilyViewContext";
import { useAppointmentsByUid } from "@/hooks/useAppointmentsByUid";
import { useAuthState } from "@/hooks/useAuthState";
import { useDatePickerStyles } from "@/hooks/useDatePicker.styles";
import { useDrugsByUid } from "@/hooks/useDrugsByUid";
import { useEarlyWarning } from "@/hooks/useEarlyWarning";
import { useLastHealthSync } from "@/hooks/useLastHealthSync";
import { useLatestHealthDiary } from "@/hooks/useLatestHealthDiary";
import { styles } from "@/styles/hcd/dashboard.style";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { stylesMonitor } from "@/styles/utils/monitoring.styles";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";

export default function MonitorDashboard() {
  const insets = useSafeAreaInsets();
  const { user } = useAuthState();
  const { viewingUid, setViewingUid } = useFamilyView();
  const monitoringUid = viewingUid || user?.uid || "";
  const [selected, setSelected] = useState<DateType>(new Date());
  
  const datePickerStyle = useDatePickerStyles(
    selected instanceof Date ? selected : new Date()
  );

  const formatDateLocal = (date: Date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const [selectedDateKey, setSelectedDateKey] = useState(
    formatDateLocal(new Date())
  );

  const { warnings, loading: loadingWarning } = useEarlyWarning(monitoringUid);
  const { data: biomarker, loading: loadingBiomarker } =
    useLatestHealthDiary(monitoringUid);
  const { lastSync, loading: loadingSync } = useLastHealthSync();
  const { drugs } = useDrugsByUid(monitoringUid);
  const { appointments } = useAppointmentsByUid(monitoringUid);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    if (!monitoringUid) return;

    setSelectedDateKey(
      selected
        ? formatDateLocal(new Date(selected as Date))
        : formatDateLocal(new Date())
    );

    const todayDrugReminders = drugs
      .filter((d) => d.date === selectedDateKey)
      .map(convertDrugToReminder);

    const todayAppointmentReminders: Reminder[] = appointments
      .filter((a) => a.date === selectedDateKey)
      .map((a) => ({
        ...convertAppointment(a),
        id: a.id,
        category: "appointment" as const,
        description: a.description ?? "",
        completed: a.status === "done",
      }));

    const allReminders: Reminder[] = [
      ...todayDrugReminders,
      ...todayAppointmentReminders,
    ].sort((a, b) => a.timeLabel.localeCompare(b.timeLabel));

    setReminders(allReminders);
  }, [selected, drugs, appointments, monitoringUid]);

  const handleToggleReminder = useCallback((id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  }, []);

  const handleEditDrug = useCallback((reminder: Reminder) => {
    router.push({
      pathname: "/meditrack/drugForm",
      params: { editMode: "true", drugId: reminder.id },
    });
  }, []);

  const handleEditAppointment = useCallback((appointment: any) => {
    router.push({
      pathname: "/meditrack/appointmentForm",
      params: { editMode: "true", appointmentId: appointment.id },
    });
  }, []);

  const handleSeeDetail = useCallback((appointment: any) => {
    router.push({
      pathname: "/meditrack/appointmentForm",
      params: { editMode: "true", appointmentId: appointment.id },
    });
  }, []);

  const warningCount =
    warnings?.filter(
      (warn) => warn.status && !warn.status.toLowerCase().includes("good")
    ).length || 0;

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <LinearGradient
        colors={["#E9F3FF", "#1A73E8"]}
        style={styles.dashboardContainerLinear}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: NAV_ITEMS + insets.bottom + 16 },
        ]}
        style={{ flex: 1, backgroundColor: "transparent" }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={stylesMonitor.banner}
          onPress={() => {
            if (!user) return;
            setViewingUid(user.uid);
            router.push("/family-mode/familyMode");
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center", fontSize: 16 }}>
            Back to my account
          </Text>
        </TouchableOpacity>

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
                  params: { date: selectedDate, uid: monitoringUid, isMonitoring: "1", },
                });
              }
            }}
            styles={datePickerStyle}
          />

          <View style={styles.remCont}>
            <View style={styles.containerReminder}>
              <View style={styles.captionSubtitle}>
                <Text style={styles.subtitle}>Upcoming Reminders</Text>
                <TouchableOpacity
                  style={styles.subtitleContainerText}
                  onPress={() =>
                    router.push({
                      pathname: "/hcd/diary/remindersAll",
                      params: { uid: monitoringUid, isMonitoring: "1" },
                    })}>
                  <Text style={styles.seeAllContainer}>See All</Text>
                  <Image source={require("@/assets/utilsIcon/arrow-right-white.svg")} />
                </TouchableOpacity>
              </View>
              <Text style={styles.reminderText}>{reminders.length} Reminders</Text>
            </View>
            <View style={styles.containerContent}>
              {reminders.length === 0 ? (
                <Text style={{ textAlign: "center", color: "white" }}>
                  No reminders today
                </Text>
              ) : (
                reminders.slice(0, 3).map((reminder) => (
                  <View key={reminder.id} style={styles.reminderRow}>
                    <View style={styles.reminderTimesCard}>
                      <Text style={styles.reminderTime}>{reminder.timeLabel}</Text>
                    </View>
                    <View style={styles.reminderCardS}>
                      {reminder.category === "drug" ? (
                        <ReminderCard
                          key={reminder.id}
                          reminder={reminder}
                          onToggle={handleToggleReminder}
                          showActions={true}
                          onEdit={handleEditDrug}
                          showImages={false}
                        />
                      ) : (
                        <AppointmentCard
                          key={reminder.id}
                          appointment={reminder}
                          onPressDetail={() => handleSeeDetail(reminder)}
                          onEdit={handleEditAppointment}
                          showActions={true}
                          showTime={false}
                          showLocation={false}
                          showDetails={false}
                          showArrow={true}
                          showImage={false}
                        />
                      )}
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>
        </View>

        {!loadingWarning && (
          warningCount > 0 ? (
            <TouchableOpacity
              style={styles.containerHealthWarning}
              onPress={() => router.push("/analysis/analysis")}
            >
              <View style={styles.titleHealth}>
                <View style={styles.containerDigit}>
                  <Image source={require("@/assets/hcd/healthWarning.png")} style={{ width: 34, height: 35 }} />
                  <Text style={styles.titleDigitWarning}>
                    {warningCount} Health Early Warning
                  </Text>
                </View>
                <Image source={require("@/assets/utilsIcon/arrow-right-red.png")} />
              </View>
              <Text style={styles.descHealthWarning}>
                Check the warnings that need your attention.
              </Text>
            </TouchableOpacity>
          ) : (
            <EarlyGoodCard
              title="All Good"
              status="Good"
              description={[
                { text: "Maintain your lifestyle and keep your body healthy." },
              ]}
            />
          )
        )}

        <View style={styles.containerAllDigitBio}>
          <View style={styles.containerDigit}>
            <Image source={require("@/assets/hcd/digitalBiomarker.png")} />
            <View style={styles.containerTitle}>
              <Text style={styles.titleDigitBio}>Digital Biomarker</Text>
              <Text style={styles.captionDigitBio}>
                {loadingBiomarker
                  ? "Loading..."
                  : !biomarker
                  ? "No data"
                  : "All indicators are in good condition"}
              </Text>
            </View>
          </View>

          <View style={styles.squaresContainer}>
            <View style={styles.subSquareContainer}>
              <View style={styles.containerStatus}>
                <View style={styles.bulletin}></View>
                <View>
                  <Text style={styles.captionNumber}>
                    {biomarker
                      ? `${biomarker.systolic ?? "-"} / ${biomarker.diastolic ?? "-"} mmHg`
                      : "-"}
                  </Text>
                  <Text style={styles.captionName}>Blood Pressure</Text>
                </View>
              </View>

              <View style={styles.containerStatus}>
                <View style={styles.bulletin}></View>
                <View>
                  <Text style={styles.captionNumber}>
                    {biomarker ? `${biomarker.bloodSugar ?? "-"} mg/dL` : "-"}
                  </Text>
                  <Text style={styles.captionName}>Blood Sugar</Text>
                </View>
              </View>
            </View>

            <View style={styles.subSquareContainer}>
              <View style={styles.containerStatus}>
                <View style={styles.bulletin}></View>
                <View>
                  <Text style={styles.captionNumber}>
                    {biomarker ? `${biomarker.heartRate ?? "-"} bpm` : "-"}
                  </Text>
                  <Text style={styles.captionName}>Heart Rate</Text>
                </View>
              </View>

              <View style={styles.containerStatus}>
                <View style={styles.bulletin}></View>
                <View>
                  <Text style={styles.captionNumber}>
                    {biomarker ? `${biomarker.weight ?? "-"} kg` : "-"}
                  </Text>
                  <Text style={styles.captionName}>Weight</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.LatestContainer}>
            <Text style={styles.latestText}>
              Latest update {loadingSync ? "Loading..." : lastSync || "—"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
