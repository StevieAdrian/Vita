export interface AppointmentReminder {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  medicalStaff: string;
  location: string;
  startTime: string; 
  endTime: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  userId?: string;
}
