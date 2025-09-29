import { Appointment } from "./appointment";
import { Reminder } from "./reminder";
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
    provider: "Sept, 10 (13:00 PM)", // ⚠️ ini sebaiknya "Dr. Veni"
    location: "RS Brawijaya",
    dateLabel: "Sept, 1",
    timeLabel: "15:00 PM",
    status: "history",
  },
  {
    id: "app-4",
    title: "Consultation",
    provider: "Sept, 9 (13:00 PM)", // ⚠️ ini juga sebaiknya "Dr. Budi" / nama dokter lain
    location: "RS Brawijaya",
    dateLabel: "Sept, 1",
    timeLabel: "15:00 PM",
    status: "history",
  },
];

export const initialReminders: Reminder[] = [
  {
    id: "rem-1",
    title: "Panadol 20mg",
    description: "Pain relief",
    timeLabel: "Today, 12:00 PM",
    completed: false,
    category: "drug",
  },
  {
    id: "rem-2",
    title: "Panadol 20mg",
    description: "Pain relief",
    timeLabel: "Today, 20:00 PM",
    completed: false,
    category: "drug",
  },
  {
    id: "rem-3",
    title: "Control Checkup",
    description: "Dr. Veni",
    timeLabel: "Tomorrow, 13:00 PM",
    completed: false,
    category: "appointment",
  },
];
