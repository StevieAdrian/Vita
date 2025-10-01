import { DiaryInput } from "../types/diary";

export function validateDiary(input: DiaryInput): string | null {
  const { systolic, diastolic, heartRate, bloodSugar, weight } = input;

  if (systolic && isNaN(Number(systolic))) {
    return "Systolic must be a number.";
  }

  if (diastolic && isNaN(Number(diastolic))) {
    return "Diastolic must be a number.";
  }

  if (heartRate && isNaN(Number(heartRate))) {
    return "Heart rate must be a number.";
  }

  if (bloodSugar && isNaN(Number(bloodSugar))) {
    return "Blood sugar must be a number.";
  }

  if (weight && isNaN(Number(weight))) {
    return "Weight must be a number.";
  }
  

  return null;
}
