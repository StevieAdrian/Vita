import { DrugReminder } from "../constants/drugs";
import { AppointmentReminder } from "../types/appointment";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface NotificationData {
  type: "drug" | "appointment";
  id: string;
  title: string;
  body: string;
  data?: any;
}

export function useRealTimeNotifications() {
  const notificationListener = useRef<Notifications.EventSubscription | null>(
    null
  );
  const responseListener = useRef<Notifications.EventSubscription | null>(null);
  const isWeb = Platform.OS === "web";

  const registerForPushNotifications = useCallback(async (): Promise<
    string | null
  > => {
    if (isWeb) {
      console.log("Push notifications not supported on web");
      return null;
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#1A73E8",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return null;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Push token:", token);
      return token;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return null;
  }, [isWeb]);

  const scheduleDrugNotification = useCallback(
    async (drug: DrugReminder) => {
      if (isWeb) {
        console.log("Drug notifications skipped on web");
        return;
      }

      try {
        await Notifications.cancelScheduledNotificationAsync(drug.id);

        for (const time of drug.times) {
          const [hours, minutes] = time.split(":").map(Number);

          const notificationDate = new Date(drug.date);
          notificationDate.setHours(hours, minutes, 0, 0);

          if (notificationDate < new Date() && drug.repeatDays.length === 0) {
            continue;
          }

          const triggerTimestamp = notificationDate.getTime();

          await Notifications.scheduleNotificationAsync({
            identifier: `${drug.id}-${time}`,
            content: {
              title: "Medication Time",
              body: `Time to take ${drug.drugName} at ${time}`,
              subtitle: `Don't forget your medication!`,
              sound: "default",
              data: {
                type: "drug",
                id: drug.id,
                drugName: drug.drugName,
                time: time,
                category: drug.category,
              },
              android: {
                channelId: "medication-reminders",
                largeIcon: "../assets/notifications/medicine-reminder.png", // ✅ KEEP
                color: "#1A73E8",
                priority: Notifications.AndroidImportance.HIGH,
              },
              ios: {
                sound: true,
                badge: 1,
              },
            },
            trigger: {
              timestamp: triggerTimestamp,
              repeats: drug.repeatDays.length > 0,
            },
          } as any);
        }
        console.log(
          `Scheduled ${drug.times.length} notifications for ${drug.drugName}`
        );
      } catch (error) {
        console.error("Error scheduling drug notification:", error);
      }
    },
    [isWeb]
  );

  const scheduleAppointmentNotification = useCallback(
    async (appointment: AppointmentReminder) => {
      if (isWeb) {
        console.log("Appointment notifications skipped on web");
        return;
      }

      try {
        await Notifications.cancelScheduledNotificationAsync(appointment.id);

        const appointmentDate = new Date(appointment.date);
        const [hours, minutes] = appointment.startTime.split(":").map(Number);
        appointmentDate.setHours(hours, minutes, 0, 0);

        const reminderDate = new Date(
          appointmentDate.getTime() - 60 * 60 * 1000
        );

        if (reminderDate > new Date()) {
          await Notifications.scheduleNotificationAsync({
            identifier: `${appointment.id}-reminder`,
            content: {
              title: "Appointment Reminder",
              body: `You have "${appointment.title}" in 1 hour with ${appointment.medicalStaff}`,
              subtitle: `Location: ${appointment.location}`,
              sound: "default",
              data: {
                type: "appointment",
                id: appointment.id,
                title: appointment.title,
                startTime: appointment.startTime,
                medicalStaff: appointment.medicalStaff,
                location: appointment.location,
                category: appointment.category,
              },
              android: {
                channelId: "appointment-reminders",
                color: "#1A73E8",
                priority: Notifications.AndroidImportance.HIGH,
                largeIcon: "../assets/notifications/appointment-reminder.png", // ✅ KEEP
              },
              ios: {
                sound: true,
                badge: 1,
              },
            },
            trigger: {
              timestamp: reminderDate.getTime(),
            },
          } as any);
        }

        if (appointmentDate > new Date()) {
          await Notifications.scheduleNotificationAsync({
            identifier: appointment.id,
            content: {
              title: "Appointment Starting Now",
              body: `"${appointment.title}" with ${appointment.medicalStaff} is starting now`,
              subtitle: `Location: ${appointment.location}`,
              sound: "default",
              data: {
                type: "appointment",
                id: appointment.id,
                title: appointment.title,
                medicalStaff: appointment.medicalStaff,
                location: appointment.location,
                category: appointment.category,
                startTime: appointment.startTime,
                endTime: appointment.endTime,
              },
              android: {
                channelId: "appointment-now",
                color: "#D1E3FA",
                priority: Notifications.AndroidImportance.MAX,
              },
              ios: {
                sound: true,
                badge: 1,
              },
            },
            trigger: {
              timestamp: appointmentDate.getTime(),
            },
          } as any);
        }

        console.log(
          `Scheduled notifications for appointment: ${appointment.title}`
        );
      } catch (error) {
        console.error("Error scheduling appointment notification:", error);
      }
    },
    [isWeb]
  );

  const cancelNotification = useCallback(
    async (id: string) => {
      if (isWeb) {
        console.log("Cancel notification skipped on web");
        return;
      }

      try {
        await Notifications.cancelScheduledNotificationAsync(id);
        console.log(`Cancelled notification: ${id}`);
      } catch (error) {
        console.error("Error cancelling notification:", error);
      }
    },
    [isWeb]
  );

  const cancelAllNotifications = useCallback(async () => {
    if (isWeb) {
      console.log("Cancel all notifications skipped on web");
      return;
    }

    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log("Cancelled all notifications");
    } catch (error) {
      console.error("Error cancelling all notifications:", error);
    }
  }, [isWeb]);

  const handleNotificationReceived = useCallback(
    (notification: Notifications.Notification) => {
      console.log("Notification received:", notification);
    },
    []
  );

  const handleNotificationResponse = useCallback(
    (response: Notifications.NotificationResponse) => {
      const data = response.notification.request.content.data;
      router.push("/meditrack/mediTrack");
    },
    [router]
  );

  useEffect(() => {
    if (isWeb) {
      console.log("Notification listeners skipped on web");
      return;
    }

    registerForPushNotifications();

    notificationListener.current =
      Notifications.addNotificationReceivedListener(handleNotificationReceived);
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, [
    isWeb,
    handleNotificationReceived,
    handleNotificationResponse,
    registerForPushNotifications,
  ]);

  if (isWeb) {
    return {
      registerForPushNotifications: async () => null,
      scheduleDrugNotification: async () => {},
      scheduleAppointmentNotification: async () => {},
      cancelNotification: async () => {},
      cancelAllNotifications: async () => {},
    };
  }

  return {
    registerForPushNotifications,
    scheduleDrugNotification,
    scheduleAppointmentNotification,
    cancelNotification,
    cancelAllNotifications,
  };
}