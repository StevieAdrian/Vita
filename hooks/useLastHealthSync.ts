import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getHealthDiaries } from "../services/healthDiary.service";
import { useAuthState } from "./useAuthState";
import { Timestamp } from "firebase/firestore";

export function useLastHealthSync() {
  const { user } = useAuthState();
  const [lastSync, setLastSync] = useState<string>("—");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLastSync = async () => {
      if (!user?.uid) return;
      setLoading(true);

      try {
        const diaries = await getHealthDiaries(user.uid);
        if (diaries && diaries.length > 0) {
            const latest = diaries.reduce((prev, curr) => {
                const prevDate = prev.date instanceof Timestamp ? prev.date.toDate() : new Date(prev.date);
                const currDate = curr.date instanceof Timestamp ? curr.date.toDate() : new Date(curr.date);
                return currDate > prevDate ? curr : prev;
            }); 

            const formattedDate = latest.date instanceof Timestamp ? dayjs(latest.date.toDate()).format("DD/MM/YYYY") : dayjs(latest.date).format("DD/MM/YYYY");

            setLastSync(formattedDate);
        } else {
            setLastSync("No data yet");
        }
      } catch (err) {
        setLastSync("—");
      } finally {
        setLoading(false);
      }
    };

    fetchLastSync();
  }, [user?.uid]);

  return { lastSync, loading };
}
