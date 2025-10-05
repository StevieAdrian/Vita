import { useEffect, useState } from "react";
import { getLatestHealthDiary } from "../services/healthDiary.service";
import { DiaryEntry } from "../types/diary";

export function useLatestHealthDiary(uid?: string) {
  const [data, setData] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uid) {
      setData(null);
      return;
    }
    setLoading(true);

    getLatestHealthDiary(uid)
      .then((entry) => setData(entry))
      .finally(() => setLoading(false));
  }, [uid]);

  return { data, loading };
}
