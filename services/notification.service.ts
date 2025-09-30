import { db } from "../config/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Notification } from "../types/notification";
import { NotificationType } from "@/constants/notification";

export async function sendNotification( toUid: string, fromUid: string | null, type: NotificationType, message: string, extraData: Record<string, any> = {}) {
  const notif: Notification = {
    toUid,
    fromUid: fromUid || undefined,
    type,
    message,
    createdAt: serverTimestamp(),
    read: false,
    extraData,
  };

  await addDoc(collection(db, "notifications"), notif);
  return { success: true };
}
