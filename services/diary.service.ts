import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
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
    date: payload.date,
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
export const getHealthDiaryById = async (id: string) => {
  const diaryRef = doc(db, "healthDiaries", id);
  const snapshot = await getDoc(diaryRef);
  if (!snapshot.exists()) {
    return null;
  }
  return { id: snapshot.id, ...snapshot.data() } as DiaryEntry & { id: string };
};
export const getHealthDiariesByDate = async (date: any) => {
  const diaryCollection = collection(db, "healthDiaries");
  const q = query(diaryCollection, where("date", "==", date));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return [];
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as (DiaryEntry & { id: string })[];
};

export async function updateHealthDiary(id: string, data: Partial<DiaryEntry>) {
  console.log("mau ini service");
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
}
