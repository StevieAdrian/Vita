import { useEffect, useState } from "react";
import { DrugReminder } from "../constants/drugs";
import { useAuthState } from "../hooks/useAuthState";
import {
  createDrug,
  deleteDrugs,
  getDrugByUser,
  updateDrugs,
} from "../services/drug.service";

export function useDrugForm() {
  const { user } = useAuthState();
  const [drug, setDrug] = useState<DrugReminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const data = await getDrugByUser(user.uid);
      setDrug(data);
      setLoading(false);
    })();
  }, [user]);

  const add = async (data: DrugReminder) => {
    await createDrug({ ...data, userId: user?.uid ?? "" } as any);
    const updated = await getDrugByUser(user?.uid ?? "");
    setDrug(updated);
  };

  const update = async (id: string, data: Partial<DrugReminder>) => {
    await updateDrugs(id, data);
    const updated = await getDrugByUser(user?.uid ?? "");
    setDrug(updated);
  };

  const remove = async (id: string) => {
    await deleteDrugs(id);
    setDrug((prev) => prev.filter((a) => a.id !== id));
  };

  return { drug, loading, add, update, remove };
}
