export type ReminderCategory = "drug" | "appointment";

export type Reminder = {
  id: string;
  title: string;
  description: string;
  timeLabel: string;
  completed: boolean;
  category: ReminderCategory;
  drugCategory?: string;
  date?: string;
  times?: string[];
  repeatDays?: string[];
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
};
