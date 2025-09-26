// constants/vitalSigns.ts
export type VitalSign = {
  id: string;
  name: string;
  value: string;
  unit: string;
};

export const vitalSigns: VitalSign[] = [
  { id: "vs-1", name: "Blood Pressure", value: "120/80", unit: "mmHg" },
  { id: "vs-2", name: "Blood Sugar", value: "72", unit: "mg/dL" },
  { id: "vs-3", name: "Heart Rate", value: "100", unit: "bpm" },
  { id: "vs-4", name: "Weight", value: "60", unit: "kg" },
];
