import UpHeader from "@/components/hcd/UpHeader";
import { useDashDatePickerStyles } from "@/hooks/useDashDatePickerStyles";
import { styles } from "@/styles/hcd/dashboard.style";
import { useMemo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";

const ALL_REMINDERS = [
  {
    id: 1,
    type: "checkup",
    title: "Dr. Veni Checkup...",
    time: "Today, 13:00 PM",
    icon: require("@/assets/mediTrack/medicalCheckUp.png"),
    color: "#e6ffef",
  },
  {
    id: 2,
    type: "medication",
    title: "Panadol 20mg",
    time: "Today, 12:00 PM",
    icon: require("@/assets/mediTrack/pill.png"),
    color: "#edf7ff",
  },
  {
    id: 3,
    type: "medication",
    title: "Panadol 20mg",
    time: "Today, 20:00 PM",
    icon: require("@/assets/mediTrack/pill.png"),
    color: "#edf7ff",
  },
  {
    id: 4,
    type: "medication",
    title: "Vitamin C 500mg",
    time: "Today, 08:00 AM",
    icon: require("@/assets/mediTrack/pill.png"),
    color: "#fff0e5",
  },
  {
    id: 5,
    type: "medication",
    title: "Minum Air 2L",
    time: "Today, 10:00 AM",
    icon: require("@/assets/mediTrack/pill.png"),
    color: "#e6f7ff",
  },
];

export default function DashboardHome() {
  const defaultStyles = useDefaultStyles();
  const datePickerStyle = useDashDatePickerStyles();
  const [selected, setSelected] = useState<DateType>();

  //Untuk Show Reminder
  const [showAll, setShowAll] = useState(false);
  const reminderToShow = useMemo(() => {
    if (showAll) {
      return ALL_REMINDERS;
    }
    return ALL_REMINDERS.slice(0, 3);
  }, [showAll]);

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <ScrollView>
        <UpHeader title="" showProfile={true} />
        <View>
          <Text style={styles.greetings}>Hey! Alicia Felisha</Text>

          <View style={styles.dateBg}>
            <DateTimePicker
              mode="single"
              date={selected}
              onChange={({ date }) => setSelected(date)}
              styles={datePickerStyle}
            />
          </View>

          <View>
            <View>
              <View style={styles.captionSubtitle}>
                <Text style={styles.subtitle}>Upcoming Reminder</Text>
                <View style={styles.subtitleContainerText}>
                  <Text style={styles.seeAllContainer}>See All</Text>
                  <TouchableOpacity>
                    <Image
                      source={require("@/assets/utilsIcon/arrow-left.png")}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.reminderText}>2 Reminder</Text>
            </View>

            {/* --- Map Reminder Max 3--- */}
            {/* <View>
              {reminderToShow.map((reminder) => (
                <ReminderItem key={reminder.id} reminder={reminder} />
              ))}
            </View> */}

            {/* Untuk Tampilin See All */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
