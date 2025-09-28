export interface DrugReminder {
  id: string;
  name: string;
  description: string;
  date: string;
  category: string;
  times: string[];
  repeatDays: string[];
}

export interface CategoryOption {
  label: string;
  value: string;
}

export interface RepeatOption {
  label: string;
  value: string;
}

export const DRUG_CATEGORIES: CategoryOption[] = [
  { label: "Pills/Tablet", value: "pills-tablet" },
  { label: "Vitamin/Supplement", value: "vitamin-supplement" },
  { label: "Capsule", value: "capsule" },
  { label: "Liquid / Syrup", value: "liquid-syrup" },
  { label: "Eye/Ear/Nasal Drops", value: "eye-ear-nasal-drops" },
  { label: "Inhaler / Spray", value: "inhaler-spray" },
  { label: "Cream / Ointment", value: "cream-ointment" },
  { label: "Other", value: "other" },
];

export const REPEAT_DAYS: RepeatOption[] = [
  { label: "Every Sunday", value: "sunday" },
  { label: "Every Monday", value: "monday" },
  { label: "Every Tuesday", value: "tuesday" },
  { label: "Every Wednesday", value: "wednesday" },
  { label: "Every Thursday", value: "thursday" },
  { label: "Every Friday", value: "friday" },
  { label: "Every Saturday", value: "saturday" },
  { label: "Every Day", value: "every-day" },
];
