import { REPEAT_DAYS } from "@/constants/drugs";

export const toggleDaySelection = (
  dayValue: string,
  selectedDays: string[],
  setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (dayValue === "every-day") {
    if (selectedDays.includes("every-day")) {
      setSelectedDays([]);
    } else {
      setSelectedDays(REPEAT_DAYS.map((day) => day.value));
    }
  } else {
    if (selectedDays.includes(dayValue)) {
      setSelectedDays(
        selectedDays.filter((day) => day !== dayValue && day !== "every-day")
      );
    } else {
      const newSelectedDays = [...selectedDays, dayValue];
      if (
        newSelectedDays.length === REPEAT_DAYS.length - 1 &&
        !newSelectedDays.includes("every-day")
      ) {
        setSelectedDays([...newSelectedDays, "every-day"]);
      } else {
        setSelectedDays(newSelectedDays);
      }
    }
  }
};
