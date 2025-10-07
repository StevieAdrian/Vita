import { useEffect, useState } from "react";
import { getHealthDiaries } from "../services/healthDiary.service";
import { useAuthState } from "./useAuthState";
import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";

export function useRecordedDays() {
  const { user } = useAuthState();
  const [recordedDays, setRecordedDays] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecordedDays = async () => {
      if (!user?.uid) return;
      setLoading(true);

      try {
        const diaries = await getHealthDiaries(user.uid);
        if (diaries && diaries.length > 0) {
          const uniqueDays = new Set(
            diaries.map((entry) => {
              const date = entry.date instanceof Timestamp ? entry.date.toDate() : new Date(entry.date);
              return dayjs(date).format("YYYY-MM-DD");
            })
          );
          setRecordedDays(uniqueDays.size);
        } else {
          setRecordedDays(0);
        }
      } catch (err) {
        setRecordedDays(0);
      } finally {
        setLoading(false);
      }
    };

    fetchRecordedDays();
  }, [user?.uid]);

  return { recordedDays, loading };
}
