export type ReminderCategory = "drug" | "appointment";

export type Reminder = {
  id: string;
  title: string;
  description: string;
  timeLabel: string;
  completed: boolean;
  category: ReminderCategory;
};
