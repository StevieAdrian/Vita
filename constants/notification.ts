import { COLORS } from "./colors";

export type NotificationType = | "FAMILY_REQUEST" | "MEDICINE_REMINDER" | "EARLY_WARNING" | "APPOINTMENT";

export const NotificationMeta: Record<NotificationType, { icon: any; color: string } > = {
  FAMILY_REQUEST: {
    icon: require("@/assets/hcd/healthWarning.png"),
    color: COLORS.primary,   
  },
  MEDICINE_REMINDER: {
    icon: require("@/assets/notifications/medicine-reminder.png"),
    color: COLORS.primary,
  },
  EARLY_WARNING: {
    icon: require("@/assets/hcd/healthWarning.png"),
    color: COLORS.primary,
  },
  APPOINTMENT: {
    icon: require("@/assets/notifications/appointment-reminder.png"),
    color: COLORS.primary,
  },
};