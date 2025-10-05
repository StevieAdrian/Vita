import { useEffect, useState } from "react";
import { getHealthDiaries } from "../services/healthDiary.service";
import { analyzeEarlyWarning } from "../utils/earlyWarning";
import { AnalysisProps } from "../types/analysis";

export function useEarlyWarning(userUid: string) {
  const [warnings, setWarnings] = useState<AnalysisProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userUid) return;
      setLoading(true);
      try {
        const entries = await getHealthDiaries(userUid);
        const result = analyzeEarlyWarning(entries);
        setWarnings(result);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userUid]);

  return { warnings, loading };
}
