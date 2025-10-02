import { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
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
      const data: Notification[] = snap.docs.map((doc) => mapperNotification(doc.id, doc.data()))

      setNotifications(data);
      setLoading(false);
    });

    return () => unsub();
  }, [userUid]);

  return { notifications, loading };
}