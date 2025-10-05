import { useEffect, useState } from "react";
import { getHealthDiaries } from "../services/healthDiary.service";
import { predictFutureHealth } from "../utils/futureHealth";
import { FutureHealth } from "@/types/analysis";

export function useFutureHealth(userUid: string) {
  const [futureHealth, setFutureHealth] = useState<FutureHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userUid) return;
    const fetch = async () => {
      setLoading(true);
      const entries = await getHealthDiaries(userUid);
      setFutureHealth(predictFutureHealth(entries));
      setLoading(false);
    };
    fetch();
  }, [userUid]);

  return { futureHealth, loading };
}
