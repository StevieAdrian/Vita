import { DiaryEntry } from "@/types/diary";
import { AnalysisProps } from "@/types/analysis";
import { classifyHeartRate, classifyBloodSugar, classifyBP, ensureDate } from "@/utils/healthAnalysis";

export function analyzeEarlyWarning(entries: DiaryEntry[]): AnalysisProps[] {
  // untuk skrg masih pake rata", enh -> pake jumlah hari BAD & AVG, gw riset lebi akurat

  const now = new Date();
  const last7 = entries.filter(e => {
    const d = ensureDate(e.date);
    return (now.getTime() - d.getTime()) / (1000 * 3600 * 24) <= 7;
  });

  // heart rate
  const hrValues = last7
    .filter(e => typeof e.heartRate === "number" && !Number.isNaN(e.heartRate))
    .map(e => e.heartRate);
  const avgHR = hrValues.length ? hrValues.reduce((a, b) => a + b, 0) / hrValues.length : null;

  // blood sugar
  const bgValues = last7
    .filter(e => typeof e.bloodSugar === "number" && !Number.isNaN(e.bloodSugar))
    .map(e => e.bloodSugar);
  const avgBG = bgValues.length ? bgValues.reduce((a, b) => a + b, 0) / bgValues.length : null;

  // blood pressure
  const sysValues = last7
    .filter(e => typeof e.systolic === "number" && !Number.isNaN(e.systolic))
    .map(e => e.systolic);
  const diaValues = last7
    .filter(e => typeof e.diastolic === "number" && !Number.isNaN(e.diastolic))
    .map(e => e.diastolic);

  const avgSys = sysValues.length ? sysValues.reduce((a, b) => a + b, 0) / sysValues.length : null;
  const avgDia = diaValues.length ? diaValues.reduce((a, b) => a + b, 0) / diaValues.length : null;

  const results: AnalysisProps[] = [];

  // warning pake average
  if (avgHR !== null && classifyHeartRate(avgHR) === "Bad") {
    results.push({
      title: "Early Warning System",
      status: "Status: Need Attention",
      description: [
        { text: "Your " },
        { text: "average heart rate this week is abnormal", bold: true },
        { text: `. Current average: ${Math.round(avgHR)} bpm. Please consult your doctor.` },
      ],
      risk: "Risk of Cardiac Issue / Hypertension",
      priority: "Mid",
    });
  }

  if (avgBG !== null && classifyBloodSugar(avgBG) === "Bad") {
    results.push({
      title: "Early Warning System",
      status: "Status: Need Attention",
      description: [
        { text: "Your " },
        { text: "average blood sugar this week is out of normal range", bold: true },
        { text: `. Current average: ${Math.round(avgBG)} mg/dL. Please consult your doctor.` },
      ],
      risk: "Risk of Diabetes/Hypoglycemia",
      priority: "High",
    });
  }

  if (avgSys !== null && avgDia !== null && classifyBP(avgSys, avgDia) === "Bad") {
    results.push({
      title: "Early Warning System",
      status: "Status: Need Attention",
      description: [
        { text: "Your " },
        { text: "average blood pressure this week is abnormal", bold: true },
        { text: `. Current average: ${Math.round(avgSys)}/${Math.round(avgDia)}. Please consult your doctor.` },
      ],
      risk: "Hypertension Risk",
      priority: "Mid",
    });
  }

  if (results.length === 0) {
    results.push({
      title: "All Good",
      status: "Status: Good",
      description: [
        { text: "Maintain your lifestyle and keep your body healthy now and later." },
      ],
      risk: "None",
      priority: "Low",
    });
  }

  return results;
}
