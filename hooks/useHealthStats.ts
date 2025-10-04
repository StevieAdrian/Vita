import { useEffect, useState } from "react";
import { getHealthDiaries } from "../services/healthDiary.service";
import { calculateHealthStats } from "../utils/healthAnalysis";
import { HealthStatsSummary } from "../types/health-stats";

export function useHealthStats(userUid: string) {
  const [stats, setStats] = useState<HealthStatsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  console.log("stats from API:", stats?.stats);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const entries = await getHealthDiaries(userUid); //jn lupa filter by uid
        console.log("debug entry 1:", entries);
        setStats(calculateHealthStats(entries));
      } finally {
        setLoading(false);
      }
    };
    if (userUid) fetch();
  }, [userUid]);

  return { stats, loading };
}
