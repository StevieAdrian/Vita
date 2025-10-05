import { DiaryEntry } from "../types/diary";
import { classifyBloodSugar, classifyBP, classifyHeartRate, ensureDate } from "./healthAnalysis";
import { FutureHealth } from "@/types/analysis";

export function predictFutureHealth(entries: DiaryEntry[]): FutureHealth {
  const now = new Date();
  const last7 = entries.filter(e => {
    const d = ensureDate(e.date);
    return (now.getTime() - d.getTime()) / (1000 * 3600 * 24) <= 7;
  });

  const avgHR = last7.filter(e => typeof e.heartRate === "number" && !Number.isNaN(e.heartRate))
    .map(e => e.heartRate)
    .reduce((a, b) => a + b, 0) / (last7.filter(e => typeof e.heartRate === "number").length || 1);
  const avgSys = last7.filter(e => typeof e.systolic === "number" && !Number.isNaN(e.systolic))
    .map(e => e.systolic)
    .reduce((a, b) => a + b, 0) / (last7.filter(e => typeof e.systolic === "number").length || 1);
  const avgDia = last7.filter(e => typeof e.diastolic === "number" && !Number.isNaN(e.diastolic))
    .map(e => e.diastolic)
    .reduce((a, b) => a + b, 0) / (last7.filter(e => typeof e.diastolic === "number").length || 1);
  const avgBG = last7.filter(e => typeof e.bloodSugar === "number" && !Number.isNaN(e.bloodSugar))
    .map(e => e.bloodSugar)
    .reduce((a, b) => a + b, 0) / (last7.filter(e => typeof e.bloodSugar === "number").length || 1);

  const hypertension =
    (avgSys && avgSys >= 130) || (avgDia && avgDia >= 85)
      ? "Need Attention"
      : "Good";

  const hypotension =
    (avgSys && avgSys < 90) || (avgDia && avgDia < 60)
      ? "Need Attention"
      : "Good";

  return {
    heartHealth: (avgHR && classifyHeartRate(avgHR) === "Bad") || (avgSys && avgDia && classifyBP(avgSys, avgDia) === "Bad") ? "Need Attention" : "Good",
    metabolism: avgBG && classifyBloodSugar(avgBG) === "Bad" ? "Need Attention" : "Good",
    hypertension,
    hypotension,
  };
}
