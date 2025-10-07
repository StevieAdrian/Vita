import { EarlyGoodCard } from "@/components/analysis/EarlyCard";
import UpHeader from "@/components/hcd/UpHeader";
import { AppointmentCard } from "@/components/meditrack-forms/AppointmentCard";
import {
  convertDrugToReminder,
  ReminderCard,
} from "@/components/meditrack-forms/Reminder";
import { convertAppointment } from "@/components/utils/DateUtils";
import { Reminder } from "@/constants/reminder";
import { useAppointments } from "@/context/AppointmentContext";
import { useDrugs } from "@/context/DrugContext";
import { useAuthState } from "@/hooks/useAuthState";
import { useDatePickerStyles } from "@/hooks/useDatePicker.styles";
import { useEarlyWarning } from "@/hooks/useEarlyWarning";
import { useFamilyMembers } from "@/hooks/useFamilyMembers";
import { useUserProfile } from "@/hooks/useUserProfile";
import { styles } from "@/styles/hcd/dashboard.style";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { getEarlyWarning } from "@/utils/getEarlyWarning";
import dayjs from "dayjs";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";

export default function DashboardHome() {
  const insets = useSafeAreaInsets();
  const { user } = useAuthState();
  const { uid: paramUid, isMonitoring } = useLocalSearchParams<{
    uid?: string;
    isMonitoring?: string;
  }>();
  const uid = paramUid || user?.uid;
  const [selected, setSelected] = useState<DateType>(new Date());
  const datePickerStyle = useDatePickerStyles(
    selected instanceof Date ? selected : new Date()
  );
  const { data } = useUserProfile();
  const { warnings, loading: loadingWarning } = useEarlyWarning(
    user?.uid ?? ""
  );
  const { members } = useFamilyMembers();
  const [familyStats, setFamilyStats] = useState({
    healthy: 0,
    attention: 0,
    total: 0,
  });

  const [reminders, setReminders] = useState<Reminder[]>([]);

  const { drugs } = useDrugs();
  const { appointments, remove } = useAppointments();
  function formatDateLocals(date: Date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  useEffect(() => {
    async function fetchFamilyStats() {
      if (!members || members.length === 0) {
        setFamilyStats({ healthy: 0, attention: 0, total: 0 });
        return;
      }

      let healthy = 0;
      let attention = 0;

      await Promise.all(
        members.map(async (m) => {
          const { warnings = [] } = await getEarlyWarning(m.uid);
          const count = warnings.filter(
            (warn) => warn.status && !warn.status.toLowerCase().includes("good")
          ).length;

          if (count > 0) attention++;
          else healthy++;
        })
      );
      setFamilyStats({ healthy, attention, total: members.length });
    }
    fetchFamilyStats();

    if (!uid) return;

    setSelectedDateKey(
      selected
        ? formatDateLocals(new Date(selected as Date))
        : formatDateLocals(new Date())
    );

    const allReminders: Reminder[] = [
      ...drugs.map(convertDrugToReminder),
      ...appointments.map(
        (a): Reminder => ({
          ...convertAppointment(a),
          id: `appt-${a.id}`,
          category: "appointment",
          description: a.description ?? "",
          completed: a.status === "done",
        })
      ),
    ];
    const now = new Date();
    const upcomingReminders = allReminders
      .filter((r) => {
        if (!r.date) return "No Date";

        const reminderDateTime = new Date(
          `${r.date} ${r.timeLabel ?? "00:00"}`
        );

        return !isNaN(reminderDateTime.getTime()) && reminderDateTime >= now;
      })
      .sort((a, b) => {
        const dateTimeA = new Date(
          `${a.date ?? ""} ${a.timeLabel ?? "00:00"}`
        ).getTime();
        const dateTimeB = new Date(
          `${b.date ?? ""} ${b.timeLabel ?? "00:00"}`
        ).getTime();
        return dateTimeA - dateTimeB;
      })
      .slice(0, 3);

    setReminders(upcomingReminders);
  }, [members, selected, uid, drugs, appointments]);

  const handleToggleReminder = useCallback((id: string) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  }, []);

  const warningCount = warnings.filter(
    (warn) => warn.status && !warn.status.toLowerCase().includes("good")
  ).length;

  function formatDateLocal(date: Date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  const handleEditDrug = useCallback((reminder: Reminder) => {
    router.push({
      pathname: "/meditrack/drugForm",
      params: {
        editMode: "true",
        drugId: reminder.id,
      },
    });
  }, []);

  const handleEditAppointment = useCallback((appointment: any) => {
    router.push({
      pathname: "/meditrack/appointmentForm",
      params: {
        editMode: "true",
        appointmentId: appointment.id,
      },
    });
  }, []);
  const handleSeeDetail = useCallback((appointment: any) => {
    router.push({
      pathname: "/meditrack/appointmentForm",
      params: {
        editMode: "true",
        appointmentId: appointment.id,
      },
    });
  }, []);
  const handleDeleteAppointment = async (appointment: any) => {
    Alert.alert("Delete Appointment", `Delete "${appointment.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await remove(appointment.id);
        },
      },
    ]);
  };
  const [selectedDateKey, setSelectedDateKey] = useState(
    selected
      ? formatDateLocal(new Date(selected as Date))
      : formatDateLocal(new Date())
  );

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: NAV_ITEMS + insets.bottom + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <UpHeader title="" showProfile={true} />
        <View>
          <View style={styles.greetingsContainer}>
            <Text style={styles.greetingsBlue}>Hey, </Text>
            <Text style={styles.greetings}>
              {data.firstName} {data.lastName}!
            </Text>
          </View>

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
                    params: { date: selectedDate },
                  });
                }
              }}
              styles={datePickerStyle}
            />
          </View>

          <View>
            <View style={styles.containerReminder}>
              <View style={styles.captionSubtitle}>
                <Text style={styles.subtitle}>Upcoming Reminders</Text>
                <TouchableOpacity style={styles.subtitleContainerText}>
                  <Text
                    style={styles.seeAllContainer}
                    onPress={() => router.push("/meditrack/mediTrack")}
                  >
                    See All
                  </Text>
                  <Image
                    source={require("@/assets/utilsIcon/arrow-left.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.reminderText}>
                {reminders.length} Reminders
              </Text>
            </View>

            {/* --- Map Reminder Max 3--- */}
            <View style={styles.containerContent}>
              {reminders.length === 0 ? (
                <Text style={{ textAlign: "center", color: "gray" }}>
                  No reminders today
                </Text>
              ) : (
                reminders.slice(0, 3).map((reminder) => (
                  <View key={reminder.id} style={styles.reminderRow}>
                    {/* Time label di kiri */}
                    <View style={styles.reminderTimesCard}>
                      <Text style={styles.reminderTime}>
                        {reminder.timeLabel}
                      </Text>
                    </View>

                    {/* Card */}
                    <View style={styles.reminderCardS}>
                      {reminder.category === "drug" ? (
                        <ReminderCard
                          key={reminder.id}
                          reminder={reminder}
                          onToggle={handleToggleReminder}
                          showActions={true}
                          onEdit={handleEditDrug}
                        />
                      ) : (
                        <AppointmentCard
                          key={reminder.id}
                          appointment={reminder}
                          onPressDetail={() => handleSeeDetail(reminder)}
                          onEdit={handleEditAppointment}
                          onDelete={handleDeleteAppointment}
                          showActions={true}
                          showTime={false}
                          showLocation={false}
                          showDetails={false}
                          showArrow={true}
                        />
                      )}
                    </View>
                  </View>
                ))
              )}

              {/* View All */}
              {reminders.length > 3 && (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/hcd/diary/remindersAll",
                      params: {
                        date: selectedDateKey,
                      },
                    })
                  }
                  style={{ marginTop: 8 }}
                >
                  <Text style={styles.seeAllReminder}>View All</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Digital Biomarker */}
            <View style={styles.containerAllDigitBio}>
              {/* Judul */}
              <View style={styles.containerDigit}>
                <Image source={require("@/assets/hcd/digitalBiomarker.png")} />
                <View style={styles.containerTitle}>
                  <Text style={styles.titleDigitBio}>Digital Biomarker</Text>
                  <Text style={styles.captionDigitBio}>
                    All indicators are in good condition
                  </Text>
                </View>
              </View>

              {/* Kotak */}
              <View style={styles.squaresContainer}>
                <View style={styles.subSquareContainer}>
                  {/* Blood Pressure */}
                  <View style={styles.containerStatus}>
                    <View style={styles.bulletin}></View>
                    <View>
                      <Text style={styles.captionNumber}>120/80 mmHg</Text>
                      <Text style={styles.captionName}>Blood Pressure</Text>
                    </View>
                  </View>

                  {/* Blood Sugar */}
                  <View style={styles.containerStatus}>
                    <View style={styles.bulletin}></View>
                    <View>
                      <Text style={styles.captionNumber}>72 mg/dL</Text>
                      <Text style={styles.captionName}>Blood Sugar</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.subSquareContainer}>
                  {/* Heart Rate */}
                  <View style={styles.containerStatus}>
                    <View style={styles.bulletin}></View>
                    <View>
                      <Text style={styles.captionNumber}>100 bpm</Text>
                      <Text style={styles.captionName}>Heart Rate</Text>
                    </View>
                  </View>

                  {/* Weight */}
                  <View style={styles.containerStatus}>
                    <View style={styles.bulletin}></View>
                    <View>
                      <Text style={styles.captionNumber}>60 kg</Text>
                      <Text style={styles.captionName}>Weight</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Latest Update */}
              <View style={styles.LatestContainer}>
                <Text style={styles.latestText}>Latest update 15/09/2025</Text>

                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => router.push("/profile/digitalBiomarker")}
                >
                  <Text style={styles.textUpdate}>Update Now</Text>
                </TouchableOpacity>
              </View>
            </View>

            {!loadingWarning &&
              (warningCount > 0 ? (
                <TouchableOpacity style={styles.containerHealthWarning}>
                  <View style={styles.titleHealth}>
                    <View style={styles.containerDigit}>
                      <Image
                        source={require("@/assets/hcd/healthWarning.png")}
                        style={{ width: 34, height: 35 }}
                      />
                      <Text style={styles.titleDigitBio}>
                        {warningCount > 0
                          ? `${warningCount} Health Early Warning`
                          : "No Health Early Warning"}
                      </Text>
                    </View>
                    <Image
                      source={require("@/assets/utilsIcon/arrow-right-red.png")}
                    />
                  </View>
                  <Text style={styles.descHealthWarning}>
                    {warningCount > 0
                      ? `Check the ${
                          warningCount > 1
                            ? warningCount + " warnings"
                            : "warning"
                        } that you should take attention. Don’t be late.`
                      : "All good! No early health warnings at the moment."}
                  </Text>
                </TouchableOpacity>
              ) : (
                <EarlyGoodCard
                  title="All Good"
                  status="Good"
                  description={[
                    {
                      text: "Maintain your lifestyle and keep your body healthy now and later.",
                    },
                  ]}
                />
              ))}

            {/* Family Mode */}
            <TouchableOpacity style={styles.containerAllDigitBio}>
              {/* Judul */}
              <View style={styles.titleHealth}>
                <View style={styles.containerDigit}>
                  <Image source={require("@/assets/hcd/familyMode.png")} />
                  <View style={styles.containerTitle}>
                    <Text style={styles.titleDigitBio}>Family Mode</Text>
                    <Text style={styles.captionDigitBio}>
                      Monitor your family health.
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => router.push("/family-mode/familyMode")}
                >
                  <Image
                    source={require("@/assets/utilsIcon/arrow-left.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.containerAmount}>
                <View style={styles.containerHealthAmount}>
                  <Text style={styles.amountNum}>{familyStats.healthy}</Text>
                  <Text style={styles.amountCat}>Healthy</Text>
                </View>
                <View style={styles.containerAlertAmount}>
                  <Text style={styles.amountNum}>{familyStats.attention}</Text>
                  <Text style={styles.amountCat}>Need Attention</Text>
                </View>
              </View>

              <View style={styles.divider} />
              <View>
                <Text style={styles.membersNum}>
                  {familyStats.total} Members Family
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
