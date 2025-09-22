
export const RELATION_OPTIONS = [
    "Grandparents",
    "Grandchildren",
    "Parents",
    "Cousins",
    "Children",
    "Others",
] as const;

export type Relation = typeof RELATION_OPTIONS[number];