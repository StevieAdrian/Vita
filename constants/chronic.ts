export const CHRONIC_OPTIONS = [
  "There is no chronic situation",
  "Hypertension",
  "Asthma",
  "Diabetes",
  "Obesity",
  "Osteoporosis",
] as const;

export type Chronic = (typeof CHRONIC_OPTIONS)[number];
