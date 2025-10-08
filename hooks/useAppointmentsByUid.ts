import { useEffect, useState } from "react";
import { getAppointmentsByUser } from "../services/appointment.service";
import { AppointmentReminder } from "../types/appointment";

export function useAppointmentsByUid(uid?: string) {
  const [appointments, setAppointments] = useState<AppointmentReminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getAppointmentsByUser(uid);
        setAppointments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uid]);

  return { appointments, loading };
}
