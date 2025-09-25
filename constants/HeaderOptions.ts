import { Ionicons } from "@expo/vector-icons";
import type { ReminderCategory } from "./reminder";

export type ToggleOption = {
  id: ReminderCategory;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export const toggleOptions: ToggleOption[] = [
  {
    id: "drug",
    label: "+ Drugs Reminder",
    icon: "medkit-outline",
  },
  {
    id: "appointment",
    label: "+ Appointment Reminder",
    icon: "calendar-outline",
  },
];
