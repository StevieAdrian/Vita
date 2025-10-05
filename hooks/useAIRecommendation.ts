import { useState, useEffect } from "react";
import { getAIRecommendation } from "../services/openai.service";

export function useAIRecommendation(prompt: string) {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!prompt) return;
    setLoading(true);
    getAIRecommendation(prompt)
      .then(setRecommendation)
      .catch(() => setRecommendation("Fail to get recommendations"))
      .finally(() => setLoading(false));
  }, [prompt]);

  return { recommendation, loading };
}
