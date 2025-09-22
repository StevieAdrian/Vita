
export const BLOODTYPE_OPTIONS = [
  "A",
  "B",
  "AB",
  "O",
] as const;

export type bloodType = typeof BLOODTYPE_OPTIONS[number];
