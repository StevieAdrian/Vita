import { useAuth } from "@/context/AuthContext";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentsByUser,
  updateAppointment,
} from "@/services/appointment.service";
import { AppointmentReminder } from "@/types/appointment";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AppointmentContextType {
  appointments: AppointmentReminder[];
  loading: boolean;
  add: (data: Omit<AppointmentReminder, "id">) => Promise<void>;
  update: (id: string, data: Partial<AppointmentReminder>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentReminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await getAppointmentsByUser(user.uid);
        setAppointments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  const add = async (data: Omit<AppointmentReminder, "id">) => {
    try {
      const newId = await createAppointment(data);
      setAppointments((prev) => [
        ...prev,
        { ...data, id: newId } as AppointmentReminder,
      ]);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const update = async (id: string, data: Partial<AppointmentReminder>) => {
    try {
      await updateAppointment(id, data);
      setAppointments((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...data } : item))
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteAppointment(id);
      setAppointments((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const refresh = async () => {
    if (!user) return;
    try {
      const data = await getAppointmentsByUser(user.uid);
      setAppointments(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        loading,
        add,
        update,
        remove,
        refresh,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error(context);
  }
  return context;
};
