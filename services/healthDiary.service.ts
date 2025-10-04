import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { DiaryEntry } from "../types/diary";

export const getHealthDiaries = async ( uid: string, options?: { startDate?: Date; endDate?: Date }) => {
  if (!uid) throw new Error("Missing user UID");

  const diaryCollection = collection(db, "healthDiaries");
  const conditions: any[] = [where("uid", "==", uid)];

  if (options?.startDate) conditions.push(where("date", ">=", options.startDate));
  if (options?.endDate) conditions.push(where("date", "<=", options.endDate));

  const q = query(diaryCollection, ...conditions);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      ...data,
      date: data.date instanceof Date ? data.date : data.date.toDate(), // gw force parse ke js 
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : null,
    } as DiaryEntry & { id: string };
  });

};
