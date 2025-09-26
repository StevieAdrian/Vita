import UpHeader from "@/components/hcd/UpHeader";
import { ReminderCard } from "@/components/Reminder";
import { Appointment } from "@/constants/appointment";
import { Reminder } from "@/constants/reminder";
import { useDatePickerStyles } from "@/hooks/useDatePicker.styles";
import { NAV_ITEMS } from "@/styles/bottom-nav.styles";
import { styles } from "@/styles/hcd/dashboard.style";
import { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";

const initialAppointments: Appointment[] = [
  {
    id: "app-1",
    title: "Control Checkup",
    provider: "Dr. Veni",
    location: "RS Brawijaya",
    dateLabel: "Sept, 16",
    timeLabel: "13:00 PM",
    status: "upcoming",
  },
  {
    id: "app-2",
    title: "Control Checkup",
    provider: "Dr. Veni",
    location: "RS Brawijaya",
    dateLabel: "Sept, 16",
    timeLabel: "13:00 PM",
    status: "upcoming",
  },
  {
    id: "app-3",
    title: "Control Checkup",
    provider: "Sept, 10 (13:00 PM)",
    location: "RS Brawijaya",
    dateLabel: "Sept, 1",
    timeLabel: "15:00 PM",
    status: "history",
  },
  {
    id: "app-4",
    title: "Consultation",
    provider: "Sept, 9 (13:00 PM)",
    location: "RS Brawijaya",
    dateLabel: "Sept, 1",
    timeLabel: "15:00 PM",
    status: "history",
  },
];
// Initial Data
const initialReminders: Reminder[] = [
  {
    id: "rem-1",
    title: "Panadol 20mg",
    description: "Pain relief",
    timeLabel: "Today, 12:00 PM",
    completed: false,
    category: "drug",
  },
  {
    id: "rem-2",
    title: "Panadol 20mg",
    description: "Pain relief",
    timeLabel: "Today, 20:00 PM",
    completed: false,
    category: "drug",
  },
  {
    id: "rem-3",
    title: "Control Checkup",
    description: "Dr. Veni",
    timeLabel: "Tomorrow, 13:00 PM",
    completed: false,
    category: "appointment",
  },
];
export default function DashboardHome() {
  const insets = useSafeAreaInsets();
  const datePickerStyle = useDatePickerStyles();
  const [selected, setSelected] = useState<DateType>();
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);

  const handleToggleReminder = useCallback((id: string) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  }, []);

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
            <Text style={styles.greetings}>Alicia Felisha!</Text>
          </View>

          <View style={styles.dateBg}>
            <DateTimePicker
              mode="single"
              date={selected}
              onChange={({ date }) => setSelected(date)}
              styles={datePickerStyle}
            />
          </View>

          <View>
            <View style={styles.containerReminder}>
              <View style={styles.captionSubtitle}>
                <Text style={styles.subtitle}>Upcoming Reminder</Text>
                <TouchableOpacity style={styles.subtitleContainerText}>
                  <Text style={styles.seeAllContainer}>See All</Text>

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

                <TouchableOpacity style={styles.updateButton}>
                  <Text style={styles.textUpdate}>Update Now</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 2 Health Early Warning */}
            <TouchableOpacity style={styles.containerHealthWarning}>
              <View style={styles.titleHealth}>
                <View style={styles.containerDigit}>
                  <Image source={require("@/assets/hcd/healthWarning.png")} />
                  <Text style={styles.titleDigitBio}>
                    2 Health Early Warning
                  </Text>
                </View>

                <Image
                  source={require("@/assets/utilsIcon/arrow-right-red.png")}
                />
              </View>

              <Text style={styles.descHealthWarning}>
                Check the warning that you should take attention. Don’t be late.
              </Text>
            </TouchableOpacity>

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
                <Image
                  source={require("@/assets/utilsIcon/arrow-left.png")}
                  style={styles.icon}
                />
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
