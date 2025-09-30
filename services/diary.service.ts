import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { DiaryEntry } from "../types/diary";

export const addHealthDiary = async (payload: DiaryEntry) => {
  if (!payload.fromUid) {
    throw new Error("Missing user UID");
  }

  const diaryRef = collection(db, "users", payload.fromUid, "healthDiaries");

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
  };
  console.log("payload:", diaryData);
  const reqRef = await addDoc(collection(db, "healthDiaries"), diaryData);
  return { success: true, id: reqRef.id };
};

export const updateHealthDiary = async (
  id: string,
  payload: Partial<DiaryEntry>
) => {
  const diaryRef = doc(db, "healthDiaries", id);

  await updateDoc(diaryRef, {
    ...payload,
    updatedAt: serverTimestamp(),
  });

  console.log("Diary updated:", id);
  return { success: true };
};
