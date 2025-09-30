export interface DiaryEntry {
  fromUid: string;
  systolic: string;
  diastolic: string;
  heartRate: string;
  bloodSugar: string;
  weight: string;
  symptoms: string;
  mood: string;
  activities: string;
  notes: string;
  createdAt?: any;
  id?: string;
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
