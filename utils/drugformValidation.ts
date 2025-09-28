import { DRUG_CATEGORIES, REPEAT_DAYS } from "../constants/drugs";

export const getCategoryLabel = (values: string[]) => {
  if (values.length === 0) return "Add Category";
  const labels = values.map((value) => {
    const found = DRUG_CATEGORIES.find((cat) => cat.value === value);
    return found ? found.label : value;
  });
  return labels.join(", ");
};

export const getRepeatLabel = (values: string[]) => {
  if (values.includes("every-day")) return "Every Day";
  if (values.length === 0) return "Never";
  const labels = values.map((val) => {
    const found = REPEAT_DAYS.find((day) => day.value === val);
    return found ? found.label.replace("Every ", "") : "";
  });
  return labels.join(", ");
};
