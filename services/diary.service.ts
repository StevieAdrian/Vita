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
export async function updateHealthDiary(id: string, data: Partial<DiaryEntry>) {
  const diaryRef = doc(db, "healthDiaries", id);
  return await updateDoc(diaryRef, data);
}

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
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as (DiaryEntry & { id: string })[];
};
