import { useEffect, useState } from "react";
import { getHealthDiaries } from "../services/healthDiary.service";
import { summarizeDailyMetric } from "../utils/healthAnalysis";
import { DiaryEntry } from "../types/diary";

export function useMetricSummary(userUid: string, field: keyof DiaryEntry) {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        if (!userUid) return;
        const entries = await getHealthDiaries(userUid);
        setSummary(summarizeDailyMetric(entries, field));
      } finally {
        setLoading(false);
      }
    };
    if (userUid) fetch();
  }, [userUid, field]);

  return { summary, loading };
}
