import { db } from "../config/firebaseConfig";
import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { AppointmentReminder } from "../types/appointment";

const appointmentCollection = collection(db, "appointments");

export const createAppointment = async (data: AppointmentReminder) => {
  await addDoc(appointmentCollection, data);
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
