import { toDateTimeISO, toTimeLabel } from "@/utils/dateUtils";
import dayjs from "dayjs";
import { Unsubscribe } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { DrugReminder } from "../constants/drugs";
import { addNotification } from "./notification.service";

const drugsCollection = collection(db, "drugs");

export const createDrug = async (data: Omit<DrugReminder, "id">) => {
  const docRef = await addDoc(drugsCollection, data);
  await updateDoc(docRef, { id: docRef.id });

  const normalizedDate = dayjs(data.date).isValid()
    ? dayjs(data.date).format("YYYY-MM-DD")
    : data.date;

  const timeLabel = toTimeLabel(data.times);
  const dateTimeISO = toDateTimeISO(normalizedDate, data.times);
  const message = `Time to take your medicine:\n${data.drugName} — ${data.description} at ${timeLabel}.`;

  try {
    await addNotification({
      toUid: data.userId ?? "",
      type: "MEDICINE_REMINDER",
      message,
      extraData: {
        drugName: data.drugName,
        description: data.description,
        timeLabel,
        ...(dateTimeISO ? { dateTime: dateTimeISO } : {}),
      },
    });
  } catch (err) {
    throw new Error();
  }

  return docRef.id;
};

export const getDrugByUser = async (userId: string) => {
  const q = query(drugsCollection, where("userId", "==", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as DrugReminder;
  });
};

export const listenDrugsByUser = (
  userId: string,
  onChange: (appointments: DrugReminder[]) => void,
  onError?: (error: any) => void
): Unsubscribe => {
  const q = query(drugsCollection, where("userId", "==", userId));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<DrugReminder, "id">),
      }));
      onChange(data);
    },
    (error) => {
      console.error("Error in listenDrugByUser:", error);
      if (onError) onError(error);
    }
  );

  return unsubscribe;
};

export const updateDrugs = async (id: string, data: Partial<DrugReminder>) => {
  try {
    const ref = doc(db, "drugs", id);
    await updateDoc(ref, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    console.log("update data:", data);
    return { success: true };
  } catch (err: any) {
    console.error("Error updating:", err.message);
  }
};

export const deleteDrugs = async (id: string) => {
  try {
    const ref = doc(db, "drugs", id);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      await deleteDoc(ref);
    } else {
    }
  } catch (err) {
    throw err;
  }
};
