export interface CategoryOption {
  label: string;
  value: string;
}

export const APPOINTMENT_CATEGORIES: CategoryOption[] = [
  { label: "General Check-up", value: "General Check-up" },
  { label: "Doctor Follow-up / Control", value: "Doctor Follow-up / Control" },
  { label: "Specialist Appointment", value: "Specialist Appointment" },
  { label: "Laboratory Test / Blood Test", value: "Laboratory Test / Blood Test" },
  { label: "Immunization / Vaccine", value: "Immunization / Vaccine" },
  { label: "Dental Appointment", value: "Dental Appointment" },
  {
    label: "Pregnancy / Pediatric Check-up",
    value: "Pregnancy / Pediatric Check-up",
  },
  { label: "Other", value: "Other" },
];

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
  isCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
