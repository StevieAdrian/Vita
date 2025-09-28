import { APPOINTMENT_CATEGORIES } from "@/constants/appointmentType";

export const validateAppointmentForm = (data: {
  title: string;
  date: string;
  category: string;
  medicalStaff: string;
  location: string;
  startTime: string;
  endTime: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (!data.date || data.date.trim().length === 0) {
    errors.push("Date is required");
  }

  if (!data.category || data.category.length === 0) {
    errors.push("Category is required");
  }

  if (!data.medicalStaff || data.medicalStaff.trim().length === 0) {
    errors.push("Medical staff is required");
  }

  if (!data.location || data.location.trim().length === 0) {
    errors.push("Location is required");
  }

  if (!data.startTime || data.startTime.trim().length === 0) {
    errors.push("Start time is required");
  } else if (!isValidTimeFormat(data.startTime)) {
    errors.push("Start time format is invalid (HH:MM)");
  }

  if (!data.endTime || data.endTime.trim().length === 0) {
    errors.push("End time is required");
  } else if (!isValidTimeFormat(data.endTime)) {
    errors.push("End time format is invalid (HH:MM)");
  }

  if (
    data.startTime &&
    data.endTime &&
    isValidTimeFormat(data.startTime) &&
    isValidTimeFormat(data.endTime)
  ) {
    const startTimeMinutes = timeToMinutes(data.startTime);
    const endTimeMinutes = timeToMinutes(data.endTime);

    if (startTimeMinutes >= endTimeMinutes) {
      errors.push("End time must be after start time");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const toggleCategorySelection = (
  categoryValue: string,
  selectedCategories: string[],
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (selectedCategories.includes(categoryValue)) {
    setSelectedCategories(
      selectedCategories.filter((cat) => cat !== categoryValue)
    );
  } else {
    setSelectedCategories([...selectedCategories, categoryValue]);
  }
};

export const getCategoryLabel = (categories: string[]): string => {
  if (!categories || categories.length === 0) return "Select Category";

  const categoryLabels = categories.map((cat) => {
    const categoryOption = APPOINTMENT_CATEGORIES.find((c) => c.value === cat);
    return categoryOption ? categoryOption.label : cat;
  });

  return categoryLabels.join(", ");
};

export const isValidTimeFormat = (time: string): boolean => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

const timeToMinutes = (time: string): number => {
  try {
    const [hours, minutes] = time.split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  } catch (err) {
    return 0;
  }
};

export const formatTime = (time: string): string => {
  try {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);

    if (hour >= 12) {
      return time;
    }

    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  } catch (err) {
    return time;
  }
};

export const validateTimeRange = (
  startTime: string,
  endTime: string
): string | null => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  if (endMinutes <= startMinutes) {
    return "End time must be after start time.";
  }

  return null;
};
