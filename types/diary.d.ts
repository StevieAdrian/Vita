import { Timestamp } from "firebase/firestore";

export interface DiaryEntry {
  fromUid?: string;
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
  date: Timestamp;
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

export interface DateDigitalBiomarker {
  month: string;
  year: number;
  monthName: string;
  metrics: {
    bloodSugar: {
      highest: {
        value: number;
        date: string;
      };
      lowest: {
        value: number;
        date: string;
      };
    };
    bloodPressure: {
      systolic: {
        highest: {
          value: number;
          date: string;
        };
        lowest: {
          value: number;
          date: string;
        };
      };
      diastolic: {
        highest: {
          value: number;
          date: string;
        };
        lowest: {
          value: number;
          date: string;
        };
      };
    };
    heartRate: {
      highest: {
        value: number;
        date: string;
      };
      lowest: {
        value: number;
        date: string;
      };
    };
    weight: {
      highest: {
        value: number;
        date: string;
      };
      lowest: {
        value: number;
        date: string;
      };
    };
  };
}
