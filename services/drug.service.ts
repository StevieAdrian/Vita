import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { DrugReminder } from "../constants/drugs";

const drugsCollection = collection(db, "drugs");

export const createDrug = async (data: Omit<DrugReminder, "id">) => {
  const docRef = await addDoc(drugsCollection, data);
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

export const updateDrugs = async (id: string, data: Partial<DrugReminder>) => {
  const ref = doc(db, "drugs", id);
  await updateDoc(ref, data);
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
