export type ReminderCategory = "drug" | "appointment" | "other";

export type Reminder = {
  id: string;
  title: string;
  description: string;
  timeLabel: string;
  completed: boolean;
  category: ReminderCategory;
};
