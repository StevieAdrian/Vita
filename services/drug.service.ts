import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { DrugReminder } from "../constants/drugs";

const drugsCollection = collection(db, "drugs");

export const createDrug = async (data: DrugReminder) => {
  await addDoc(drugsCollection, data);  
};

export const getDrugByUser = async (userId: string) => {
  const q = query(drugsCollection, where("userId", "==", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<DrugReminder, "id">;
    return {
      id: doc.id,
      ...data,
    };
  });
};

export const updateDrugs = async (
  id: string,
  data: Partial<DrugReminder>
) => {
  const ref = doc(db, "drugs", id);
  await updateDoc(ref, data);  
};

export const deleteDrugs = async (id: string) => {
  const ref = doc(db, "drugs", id);
  await deleteDoc(ref); 
};
