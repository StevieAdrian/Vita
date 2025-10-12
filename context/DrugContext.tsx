import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DrugReminder } from "../constants/drugs";
import { useAuthState } from "../hooks/useAuthState";
import {
  createDrug,
  deleteDrugs,
  listenDrugsByUser,
  updateDrugs,
} from "../services/drug.service";

interface DrugContextType {
  drugs: DrugReminder[];
  loading: boolean;
  add: (data: DrugReminder) => Promise<void>;
  update: (id: string, data: Partial<DrugReminder>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  removeExpiredDrugs: () => Promise<number>;
}

const DrugContext = createContext<DrugContextType | undefined>(undefined);

export const DrugProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuthState();
  const [drugs, setDrugs] = useState<DrugReminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setDrugs([]);
      setLoading(false);
      return;
    }

    const unsubscribe = listenDrugsByUser(
      user.uid,
      (data) => {
        setDrugs(data);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const remove = async (id: string) => {
    await deleteDrugs(id);
    setDrugs((prev) => prev.filter((drug) => drug.id !== id));
  };

  const add = async (data: DrugReminder) => {
    await createDrug(data);
  };

  const update = async (id: string, data: Partial<DrugReminder>) => {
    try {
      console.log("test2");
      await updateDrugs(id, data);
      setDrugs((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...data } : item))
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const removeExpiredDrugs = useCallback(async (): Promise<number> => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiredDrugs = drugs.filter((drug) => {
      try {
        const drugDate = new Date(drug.date);
        drugDate.setHours(0, 0, 0, 0);

        return drugDate < today;
      } catch (err) {
        console.error(err);
        return false;
      }
    });

    for (const drug of expiredDrugs) {
      try {
        await deleteDrugs(drug.id);
      } catch (err) {
        console.error(`${drug.id}:`, err);
      }
    }

    if (expiredDrugs.length > 0) {
      setDrugs((prev) =>
        prev.filter((drug) => {
          try {
            const drugDate = new Date(drug.date);
            drugDate.setHours(0, 0, 0, 0);
            return drugDate >= today;
          } catch {
            return true;
          }
        })
      );
    }

    return expiredDrugs.length;
  }, [drugs]);

  useEffect(() => {
    if (drugs.length > 0 && !loading) {
      removeExpiredDrugs();
    }
  }, [drugs, loading, removeExpiredDrugs]);

  return (
    <DrugContext.Provider
      value={{
        drugs,
        loading,
        add,
        update,
        remove,
        removeExpiredDrugs,
      }}
    >
      {children}
    </DrugContext.Provider>
  );
};

export const useDrugs = () => {
  const context = useContext(DrugContext);
  if (!context) {
    throw new Error("ErrorDrug");
  }
  return context;
};
