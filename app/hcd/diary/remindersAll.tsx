import { ReminderCard } from "@/components/meditrack-forms/Reminder";
import TitleBack from "@/components/utils/TitleBack";
import { initialReminders } from "@/constants/initialData";
import { Reminder } from "@/constants/reminder";
import { styles } from "@/styles/hcd/viewHealthDiary.style";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function ReminderPageAll() {
  const insets = useSafeAreaInsets();
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);

  function getStartTime(timeLabel: string) {
    const m = timeLabel.match(/\d{1,2}:\d{2}/);
    return m ? m[0] : "00:00";
  }

  const handleToggleReminder = useCallback((id: string) => {
    setReminders((prev) => {
      const existed = prev.find((r) => r.id === id);
      if (existed) {
        return prev.map((r) =>
          r.id === id ? { ...r, completed: !r.completed } : r
        );
      } else {
        return prev;
      }
    });
  }, []);
  const todaySchedules = initialReminders;
  const todayReminders = [...todaySchedules].sort((a, b) =>
    getStartTime(a.timeLabel).localeCompare(getStartTime(b.timeLabel))
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
        {/* Header */}
        <View style={styles.headerContainer}>
          <TitleBack title="All Reminder" />
        </View>

        <View style={styles.section}>
          <View>
            {todayReminders.length === 0 ? (
              <Text style={{ textAlign: "center", color: "gray" }}>
                No reminders today
              </Text>
            ) : (
              todayReminders.map((reminder) => (
                <View key={reminder.id} style={styles.reminderRow}>
                  <View style={styles.reminderTimesCard}>
                    <Text style={styles.reminderTime}>
                      {reminder.timeLabel}
                    </Text>
                  </View>
                  <View style={styles.reminderCardS}>
                    <ReminderCard
                      key={reminder.id}
                      reminder={reminder}
                      onToggle={() => handleToggleReminder(reminder.id)}
                      showDescription={false}
                    />
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
