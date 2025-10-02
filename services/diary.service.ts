import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { DiaryEntry } from "../types/diary";

export const addHealthDiary = async (payload: DiaryEntry) => {
  console.log(payload);
  if (!payload.fromUid) {
    throw new Error("Missing user UID");
  }
  const diaryData = {
    systolic: payload.systolic,
    diastolic: payload.diastolic,
    heartRate: payload.heartRate,
    bloodSugar: payload.bloodSugar,
    mood: payload.mood,
    weight: payload.weight,
    symptoms: payload.symptoms,
    activities: payload.activities,
    notes: payload.notes,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    date:
      payload.date instanceof Date
        ? Timestamp.fromDate(payload.date)
        : payload.date,
  };
  console.log("payload:", diaryData);
  const reqRef = await addDoc(collection(db, "healthDiaries"), diaryData);
  return { success: true, id: reqRef.id };
};

export const getHealthDiaries = async () => {
  const diaryCollection = collection(db, "healthDiaries");
  const snapshot = await getDocs(diaryCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as (DiaryEntry & { id: string })[];
};
export const getHealthDiariesByDate = async (date: string) => {
  const dateObj = new Date(date);
  dateObj.setHours(0, 0, 0, 0);

  const start = Timestamp.fromDate(dateObj);
  const end = Timestamp.fromDate(
    new Date(dateObj.getTime() + 24 * 60 * 60 * 1000)
  );

  const diaryCollection = collection(db, "healthDiaries");
  const q = query(
    diaryCollection,
    where("date", ">=", start),
    where("date", "<", end)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return [];
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as (DiaryEntry & { id: string })[];
};

export const updateHealthDiary = async (
  id: string,
  data: Partial<DiaryEntry>
) => {
  try {
    const diaryRef = doc(db, "healthDiaries", id);
    await updateDoc(diaryRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    console.log("update data:", data);
    return { success: true };
  } catch (err: any) {
    console.error("Error updating diary:", err.message);
    return { success: false, message: err.message };
  }
};

export const deleteHealthDiary = async (id: string) => {
  try {
    const diaryRef = doc(db, "healthDiaries", id);
    await deleteDoc(diaryRef);
    console.log("Success");
    return { success: true };
  } catch (err: any) {
    console.error("Error deleting diary:", err.message);
    return { success: false, message: err.message };
  }
};
