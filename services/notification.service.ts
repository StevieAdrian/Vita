import { db } from "../config/firebaseConfig";
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { Notification } from "../types/notification";
import { NotificationType } from "@/constants/notification";

export async function addNotification({toUid, fromUid = null, type, message, extraData}: { toUid: string; fromUid?: string | null; type: NotificationType; message: string; extraData?: Record<string, any> }) {
  return await sendNotification(toUid, fromUid, type, message, extraData);
}

export async function sendNotification( toUid: string, fromUid: string | null, type: NotificationType, message: string, extraData: Record<string, any> = {}) {
  const cleanExtraData = Object.fromEntries(
    Object.entries(extraData || {}).filter(([_, v]) => v !== undefined)
  );
  
  const notif: Notification = {
    toUid,
    ...(fromUid ? { fromUid } : {}),
    type,
    message,
    createdAt: serverTimestamp(),
    read: false,
    extraData: cleanExtraData,
  };

  await addDoc(collection(db, "notifications"), notif);
  return { success: true };
}

export async function markAsRead(id: string) {
  await updateDoc(doc(db, "notifications", id), {
    read: true,
  });
}