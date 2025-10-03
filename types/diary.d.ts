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
  date: any;
  updatedAt: any;
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
