import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { AppointmentReminder } from "../types/appointment";
import { addNotification } from "./notification.service";
import { Unsubscribe } from "firebase/auth";

dayjs.extend(utc);
dayjs.extend(timezone);

const appointmentCollection = collection(db, "appointments");

export const createAppointment = async (
  data: Omit<AppointmentReminder, "id">
): Promise<string> => {
  const docRef = await addDoc(collection(db, "appointments"), data);

  const dateTime = dayjs(`${data.date} ${data.startTime}`).toISOString();
  const timeLabel = dayjs(`${data.startTime}`, ["HH:mm", "H:mm"]).format(
    "hh:mm A"
  );

  const message = `You have a ${data.category.toLowerCase()} appointment at ${timeLabel}. Don’t miss it.`;

  await addNotification({
    toUid: data.userId ?? "",
    type: "APPOINTMENT",
    message,
    extraData: {
      category: data.category,
      dateTime,
      timeLabel,
    },
  });

  return docRef.id;
};

export const getAppointmentsByUser = async (userId: string) => {
  const q = query(appointmentCollection, where("userId", "==", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<AppointmentReminder, "id">;
    return {
      id: doc.id,
      ...data,
    };
  });
};
export const listenAppointmentsByUser = (
  userId: string,
  onChange: (appointments: AppointmentReminder[]) => void,
  onError?: (error: any) => void
): Unsubscribe => {
  const q = query(appointmentCollection, where("userId", "==", userId));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<AppointmentReminder, "id">),
      }));
      onChange(data);
    },
    (error) => {
      console.error("Error in listenAppointmentsByUser:", error);
      if (onError) onError(error);
    }
  );

  return unsubscribe;
};

export const updateAppointment = async (
  id: string,
  data: Partial<AppointmentReminder>
) => {
  const ref = doc(db, "appointments", id);
  await updateDoc(ref, data);
};

export const deleteAppointment = async (id: string) => {
  const ref = doc(db, "appointments", id);
  await deleteDoc(ref);
};
