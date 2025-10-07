import { Appointment } from "./appointment";
export const initialAppointments: Appointment[] = [
  {
    id: "app-1",
    title: "Control Checkup",
    provider: "Dr. Veni",
    location: "RS Brawijaya",
    dateLabel: "Sept, 16",
    timeLabel: "13:00 PM",
    status: "upcoming",
  },
  {
    id: "app-2",
    title: "Control Checkup",
    provider: "Dr. Veni",
    location: "RS Brawijaya",
    dateLabel: "Sept, 16",
    timeLabel: "13:00 PM",
    status: "upcoming",
  },
  {
    id: "app-3",
    title: "Control Checkup",
    provider: "Sept, 10 (13:00 PM)",
    location: "RS Brawijaya",
    dateLabel: "Sept, 1",
    timeLabel: "15:00 PM",
    status: "history",
  },
  {
    id: "app-4",
    title: "Consultation",
    provider: "Sept, 9 (13:00 PM)",
    location: "RS Brawijaya",
    dateLabel: "Sept, 1",
    timeLabel: "15:00 PM",
    status: "history",
  },
];
