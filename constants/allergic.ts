
export const ALLERGIC_OPTIONS = [
  "There is no Allergics",
  "Peanuts",
  "Seafood",
  "Tree Nuts",
  "Milk",
] as const;

export type Allergic = typeof ALLERGIC_OPTIONS[number];
