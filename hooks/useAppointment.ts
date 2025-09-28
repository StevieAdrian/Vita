import { useEffect, useState } from "react";
import { AppointmentReminder } from "../types/appointment";
import { createAppointment, getAppointmentsByUser, updateAppointment, deleteAppointment } from "../services/appointment.service";
import { useAuthState } from "../hooks/useAuthState";

export function useAppointments() {
  const { user } = useAuthState();
  const [appointments, setAppointments] = useState<AppointmentReminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const data = await getAppointmentsByUser(user.uid);
      setAppointments(data);
      setLoading(false);
    })();
  }, [user]);

  const add = async (data: AppointmentReminder) => {
    await createAppointment({ ...data, userId: user?.uid ?? "" } as any);
    const updated = await getAppointmentsByUser(user?.uid ?? "");
    setAppointments(updated);
  };

  const update = async (id: string, data: Partial<AppointmentReminder>) => {
    await updateAppointment(id, data);
    const updated = await getAppointmentsByUser(user?.uid ?? "");
    setAppointments(updated);
  };

  const remove = async (id: string) => {
    await deleteAppointment(id);
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return { appointments, loading, add, update, remove };
}
