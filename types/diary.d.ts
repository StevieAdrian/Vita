import { Timestamp } from "firebase/firestore";

export interface DiaryEntry {
  fromUid: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  bloodSugar: number;
  weight: number;
  symptoms: string;
  mood: string;
  activities: string;
  notes: string;
  createdAt?: Timestamp;
  id?: string;
  date: Date;
  updatedAt: Timestamp;
}

export interface DiaryInput {
  systolic: string;
  diastolic: string;
  heartRate: string;
  bloodSugar: string;
  weight: string;
  symptoms: string;
  mood: string;
  activities: string;
  notes: string;
}
