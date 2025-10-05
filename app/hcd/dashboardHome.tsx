import { initialReminders } from "@/./constants/initialData";
import UpHeader from "@/components/hcd/UpHeader";
import { ReminderCard } from "@/components/meditrack-forms/Reminder";
import { Reminder } from "@/constants/reminder";
import { useDatePickerStyles } from "@/hooks/useDatePicker.styles";
import { useUserProfile } from "@/hooks/useUserProfile";
import { styles } from "@/styles/hcd/dashboard.style";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import dayjs from "dayjs";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { useEarlyWarning } from "@/hooks/useEarlyWarning"; 
import { useAuthState } from "@/hooks/useAuthState";
import { EarlyGoodCard } from "@/components/analysis/EarlyCard";

export default function DashboardHome() {
  const insets = useSafeAreaInsets();
  const datePickerStyle = useDatePickerStyles();
  const [selected, setSelected] = useState<DateType>(new Date());
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const { data } = useUserProfile();
  const { user } = useAuthState();
  const { warnings, loading: loadingWarning } = useEarlyWarning(user?.uid ?? "");
  const handleToggleReminder = useCallback((id: string) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  }, []);

  function formatDateLocal(date: Date) {
    return date.toLocaleDateString("en-CA");
  }

  const warningCount = warnings.filter(
    warn => warn.status && !warn.status.toLowerCase().includes("good")
  ).length;

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
                <Text style={styles.subtitle}>Upcoming Reminder</Text>
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

              <Text style={styles.reminderText}>2 Reminder</Text>
            </View>

            {/* --- Map Reminder Max 3--- */}
            <View style={styles.containerContent}>
              {reminders.map((reminder) => (
                <ReminderCard
                  key={reminder.id}
                  reminder={reminder}
                  onToggle={handleToggleReminder}
                  showDescription={false}
                />
              ))}
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

            {!loadingWarning && (
              warningCount > 0 ? (
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
                      ? `Check the ${warningCount > 1 ? warningCount + " warnings" : "warning"} that you should take attention. Don’t be late.`
                      : "All good! No early health warnings at the moment."}
                  </Text>
                </TouchableOpacity>
              ) : (
                <EarlyGoodCard
                  title="All Good"
                  status="Good"
                  description={[
                    { text: "Maintain your lifestyle and keep your body healthy now and later." }
                  ]}
                />
              )
            )}

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

              {/* Kotak */}
              <View style={styles.containerAmount}>
                <View style={styles.containerHealthAmount}>
                  <Text style={styles.amountNum}>1</Text>
                  <Text style={styles.amountCat}>Healthy</Text>
                </View>
                <View style={styles.containerAlertAmount}>
                  <Text style={styles.amountNum}>2</Text>
                  <Text style={styles.amountCat}>Need Attention</Text>
                </View>
              </View>

              <View style={styles.divider} />
              <View>
                <Text style={styles.membersNum}>3 Members Family</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
