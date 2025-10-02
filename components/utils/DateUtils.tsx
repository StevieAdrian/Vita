import { Appointment } from "@/constants/appointment";

export const formatDateLabel = (dateString: string): string => {
  if (!dateString) return "No date set";

  try {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const tomorrowDate = new Date(
      tomorrow.getFullYear(),
      tomorrow.getMonth(),
      tomorrow.getDate()
    );
    const appointmentDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    if (appointmentDate.getTime() === todayDate.getTime()) {
      return "Today";
    }

    if (appointmentDate.getTime() === tomorrowDate.getTime()) {
      return "Tomorrow";
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (err) {
    return "Invalid date";
  }
};

export const formatTimeLabel = (
  startTime: string,
  endTime?: string
): string => {
  if (!startTime) return "No time set";

  try {
    const formatTime = (timeString: string) => {
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    };

    if (endTime) {
      return `${formatTime(startTime)} - ${formatTime(endTime)}`;
    }

    return formatTime(startTime);
  } catch (err) {
    return "Invalid time";
  }
};

export const getAppointmentStatus = (
  dateString: string,
  startTime: string
): "upcoming" | "history" => {
  if (!dateString || !startTime) return "upcoming";

  try {
    const appointmentDateTime = new Date(`${dateString}T${startTime}`);
    const now = new Date();
    return appointmentDateTime < now ? "history" : "upcoming";
  } catch (err) {
    return "upcoming";
  }
};

export const convertAppointment = (appointmentReminder: any): Appointment => {
  const status = appointmentReminder.status
    ? (appointmentReminder.status as "upcoming" | "history")
    : getAppointmentStatus(
        appointmentReminder.date,
        appointmentReminder.startTime
      );

  return {
    id: appointmentReminder.id,
    title: appointmentReminder.title || "Appointment",
    provider: appointmentReminder.medicalStaff || "Healthcare Provider",
    location: appointmentReminder.location || "Not specified",
    dateLabel: formatDateLabel(appointmentReminder.date),
    timeLabel: formatTimeLabel(
      appointmentReminder.startTime,
      appointmentReminder.endTime
    ),
    status: status,
  };
};
