import { ReminderCard } from "@/components/meditrack-forms/Reminder";
import TitleBack from "@/components/utils/TitleBack";
import { useDrugs } from "@/context/DrugContext";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/meditrack/all-reminder-card.styles";
import { LinearGradient } from "expo-linear-gradient";

const AllRemindersScreen: React.FC = () => {
  const { drugs, remove } = useDrugs();

  const filteredReminders = useMemo(() => {
    const now = new Date();
    const remindersWithDateTime = drugs.map((drug) => {
      try {
        const drugDate = new Date(drug.date);
        const today = new Date();

        const drugDateOnly = new Date(
          drugDate.getFullYear(),
          drugDate.getMonth(),
          drugDate.getDate()
        );
        const todayOnly = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );

        const daysDiff = Math.floor(
          (drugDateOnly.getTime() - todayOnly.getTime()) / (1000 * 60 * 60 * 24)
        );

        return {
          ...drug,
          daysDiff,
          drugDate,
          times: drug.times || [],
        };
      } catch {
        return {
          ...drug,
          daysDiff: 999,
          drugDate: new Date(),
          times: drug.times || [],
        };
      }
    });

    const flattenedReminders = remindersWithDateTime.flatMap((drug) =>
      drug.times.map((time) => {
        const [hours, minutes] = time.split(":").map(Number);
        const totalMinutes = hours * 60 + minutes;

        return {
          id: `${drug.id}-${time}`,
          drugId: drug.id,
          drugName: drug.drugName,
          description: drug.description,
          date: drug.date,
          time: time,
          category: drug.category,
          daysDiff: drug.daysDiff,
          totalMinutes,
          isCompleted: drug.isCompleted,
          createdAt: drug.createdAt,
        };
      })
    );

    return flattenedReminders.sort((a, b) => {
      if (a.daysDiff === 0 && b.daysDiff === 0) {
        return a.totalMinutes - b.totalMinutes;
      }
      if (a.daysDiff === 0) return -1;
      if (b.daysDiff === 0) return 1;

      if (a.daysDiff !== b.daysDiff) {
        return a.daysDiff - b.daysDiff;
      }
      return a.totalMinutes - b.totalMinutes;
    });
  }, [drugs]);

  const handleToggleReminder = (id: string) => {
    console.log(id);
  };

  const handleDeleteReminder = async (reminder: any) => {
    Alert.alert(
      "Delete Reminder",
      `Are you sure you want to delete "${reminder.drugName}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await remove(reminder.drugId);
            } catch (err) {
              console.error(err);
            }
          },
        },
      ]
    );
  };

  const handleEditReminder = (reminder: any) => {
    router.push({
      pathname: "/meditrack/drugForm",
      params: {
        editMode: "true",
        drugId: reminder.drugId,
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#E9F3FF", "#1A73E8"]}
        style={styles.dashboardContainerLinear}
      ></LinearGradient>

      {/* Header */}
      <View style={styles.headerContainer}>
        <TitleBack title="All Medicine Reminder" />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.remindersContainer}>
          <Text style={styles.totalRem}>
            {filteredReminders.length} reminders
          </Text>
          {filteredReminders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No Reminders Yet</Text>
              <Text style={styles.emptyText}>
                You don&apos;t have any drug reminders yet.{"\n"}
                Start adding your medications to stay on track!
              </Text>
            </View>
          ) : (
            filteredReminders.map((reminder: any) => (
              <ReminderCard
                key={reminder.id}
                reminder={{
                  id: reminder.id,
                  title: reminder.drugName,
                  description: reminder.description,
                  date: reminder.date,
                  times: [reminder.time],
                  category: "drug",
                  drugCategory: reminder.category,
                  timeLabel: reminder.time,
                  completed: reminder.isCompleted,
                  repeatDays: [],
                  createdAt: reminder.createdAt,
                  updatedAt: reminder.createdAt,
                  userId: "",
                  drugId: reminder.drugId,
                }}
                onToggle={handleToggleReminder}
                onEdit={handleEditReminder}
                onDelete={handleDeleteReminder}
                showActions={true}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllRemindersScreen;
