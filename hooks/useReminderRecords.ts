import { useEffect, useState } from "react";
import { useAuthState } from "./useAuthState";
import { getDrugByUser } from "../services/drug.service";
import { getAppointmentsByUser } from "../services/appointment.service";

export function useReminderRecords() {
  const { user } = useAuthState();
  const [reminderCount, setReminderCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchReminders = async () => {
      if (!user?.uid) return;
      setLoading(true);
      try {
        const [drugs, appointments] = await Promise.all([
          getDrugByUser(user.uid),
          getAppointmentsByUser(user.uid),
        ]);

        const total = (drugs?.length ?? 0) + (appointments?.length ?? 0);
        setReminderCount(total);
      } catch (err) {
        console.error("Error fetching reminders:", err);
        setReminderCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, [user?.uid]);

  return { reminderCount, loading };
}
