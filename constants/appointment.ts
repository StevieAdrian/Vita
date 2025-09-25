export type AppointmentStatus = "upcoming" | "history";

export type Appointment = {
  id: string;
  title: string;
  provider: string;
  location: string;
  dateLabel: string;
  timeLabel: string;
  status: AppointmentStatus;
};
