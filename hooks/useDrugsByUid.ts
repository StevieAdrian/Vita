import { useEffect, useState } from "react";
import { getDrugByUser } from "../services/drug.service";
import { DrugReminder } from "../constants/drugs";

export function useDrugsByUid(uid?: string) {
  const [drugs, setDrugs] = useState<DrugReminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setDrugs([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getDrugByUser(uid);
        setDrugs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uid]);

  return { drugs, loading };
}
