import { COLORS } from "./colors";

export type NotificationType = | "FAMILY_REQUEST" | "MEDICINE_REMINDER" | "EARLY_WARNING" | "APPOINTMENT";

export const NotificationMeta: Record<NotificationType, { icon: any; color: string } > = {
  FAMILY_REQUEST: {
    icon: require("@/assets/passiveIconNavBottom/passiveFamilyIcon.png"),
    color: COLORS.primary,   
  },
  MEDICINE_REMINDER: {
    icon: require("@/assets/passiveIconNavBottom/passiveAnalysisIcon.png"),
    color: COLORS.primary,
  },
  EARLY_WARNING: {
    icon: require("@/assets/passiveIconNavBottom/passiveHomeIcon.png"),
    color: COLORS.primary,
  },
  APPOINTMENT: {
    icon: require("@/assets/passiveIconNavBottom/passiveScheduleIcon.png"),
    color: COLORS.primary,
  },
};