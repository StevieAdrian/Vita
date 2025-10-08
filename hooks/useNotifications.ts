import dayjs from "dayjs";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { Notification } from "../types/notification";
import { mapperNotification } from "../utils/mapper";

export function useNotifications(userUid: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userUid) return;

    const q = query(
      collection(db, "notifications"),
      where("toUid", "==", userUid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const now = dayjs();

      const data: Notification[] = snap.docs
        .map((doc) => mapperNotification(doc.id, doc.data()))
        .filter((n) => {
          const scheduled = n.extraData?.dateTime ? dayjs(n.extraData.dateTime) : null;

          if (!scheduled) return true;

          switch (n.type) {
            case "MEDICINE_REMINDER":
              return now.isAfter(scheduled);
            case "APPOINTMENT": {
              const diffDays = scheduled.diff(now, "day");
              return diffDays === 0 || diffDays === 1;
            }
            default:
              return true;
          }
        })
        .map((n) => ({
          ...n,
          message: formatNotificationMessage(n),
        }));

      setNotifications(data);
      setLoading(false);
    });

    return () => unsub();
  }, [userUid]);

  return { notifications, loading };
}

export function formatNotificationMessage(notification: any) {
  if (notification.type === "APPOINTMENT" && notification.extraData?.dateTime) {
    const dateTime = dayjs(notification.extraData.dateTime);
    const today = dayjs().startOf("day");
    const apptDay = dateTime.startOf("day");

    let dayLabel = `on ${apptDay.format("MMMM D, YYYY")}`;
    if (apptDay.isSame(today, "day")) {
      dayLabel = "today";
    } else if (apptDay.isSame(today.add(1, "day"), "day")) {
      dayLabel = "tomorrow";
    }

    return `You have a ${notification.extraData.category.toLowerCase()} appointment ${dayLabel} at ${notification.extraData.timeLabel}. Don’t miss it.`;
  }

  return notification.message;
}