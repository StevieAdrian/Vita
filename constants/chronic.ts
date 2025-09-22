export const CHRONIC_OPTIONS = [
  "Hypertension",
  "Asthma",
  "Diabetes",
  "Obesity",
  "Osteoporosis",
] as const;

export type Chronic = (typeof CHRONIC_OPTIONS)[number];
