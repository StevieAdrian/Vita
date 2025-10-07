import { DiaryEntry } from "../types/diary";
import {
  HealthStatsSummary,
  MetricStat,
  MetricStatus,
} from "../types/health-stats";

export function classifyStatus(percent: number): MetricStatus {
  if (percent >= 80) return "Good";
  if (percent >= 60) return "Okay";
  return "Bad";
}

export function classifyBloodSugar(val: number | null): MetricStatus {
  if (val == null) return "Bad";
  if (val <= 55) return "Bad";
  if (val <= 75) return "Okay";
  if (val <= 140) return "Good";
  if (val <= 200) return "Okay";
  return "Bad";
}

export function classifyHeartRate(val: number | null): MetricStatus {
  // klo ad waktu nanti mau enh pake umur jg
  if (val == null) return "Bad";
  if (val < 40) return "Bad";
  if (val < 60) return "Okay";
  if (val <= 100) return "Good";
  if (val <= 120) return "Okay";

  return "Bad";
}

export function classifyBP(
  sys: number | null,
  dia: number | null
): MetricStatus {
  if (sys == null || dia == null) return "Bad";
  if (sys < 70 || dia < 40) return "Bad";
  if (sys < 120 && dia < 80) return "Good";
  if (sys >= 120 && sys <= 129 && dia < 80) return "Okay";
  if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) return "Bad";
  if (sys >= 140 || dia >= 90) return "Bad";

  return "Bad";
}

export function ensureDate(val: any): Date {
  if (val instanceof Date) return val;
  if (val && typeof val.toDate === "function") return val.toDate();

  return new Date(val);
}

export function calculateHealthStats(
  entries: DiaryEntry[]
): HealthStatsSummary {
  const uniqueDates = new Set(
    entries.map((e) => ensureDate(e.date).toDateString())
  );
  const trackingDays = uniqueDates.size;

  const bpValues = entries.filter(
    (e) =>
      typeof e.systolic === "number" &&
      !Number.isNaN(e.systolic) &&
      typeof e.diastolic === "number" &&
      !Number.isNaN(e.diastolic)
  );
  const okBP = bpValues.filter(
    (e) =>
      (e.systolic < 120 && e.diastolic < 80) ||
      (e.systolic >= 120 && e.systolic <= 129 && e.diastolic < 80)
  ).length;
  const bpPct =
    bpValues.length > 0 ? Math.round((okBP / bpValues.length) * 100) : null;

  // compliance heart rate, yg % nya
  const hrValues = entries
    .filter(
      (e) => typeof e.heartRate === "number" && !Number.isNaN(e.heartRate)
    )
    .map((e) => e.heartRate);

  const okHR = hrValues.filter((v) => v >= 60 && v <= 100).length;
  const hrPct =
    hrValues.length > 0 ? Math.round((okHR / hrValues.length) * 100) : null;

  // compliance bwt last blood sugar, yg % nya
  const bloodSugarValues = entries
    .filter(
      (e) => typeof e.bloodSugar === "number" && !Number.isNaN(e.bloodSugar)
    )
    .map((e) => e.bloodSugar);

  const lastBG = bloodSugarValues.length > 0 ? bloodSugarValues.at(-1)! : null;
  const okBG = bloodSugarValues.filter((i) => i >= 70 && i < 140).length;
  const bgPct =
    bloodSugarValues.length > 0
      ? Math.round((okBG / bloodSugarValues.length) * 100)
      : null;

  // status
  const hrStatus = classifyHeartRate(hrValues.at(-1) ?? null);
  const bgStatus = classifyBloodSugar(lastBG);
  const lastBP = bpValues.at(-1) ?? { systolic: null, diastolic: null };
  const bpStatus = classifyBP(lastBP.systolic, lastBP.diastolic);

  const stats: MetricStat[] = [
    { label: "Blood Pressure", value: bpPct ?? 0, status: bpStatus },
    { label: "Blood Sugar", value: bgPct ?? 0, status: bgStatus },
    { label: "Heart Rate", value: hrPct ?? 0, status: hrStatus },
  ];

  // dynamic denominator buat average klo data ny gk lengkap
  let sum = 0,
    count = 0;
  if (bpPct != null) {
    sum += bpPct;
    count++;
    // console.log(count);
  }

  if (bgPct != null) {
    sum += bgPct;
    count++;
    // console.log(count);
  }

  if (hrPct != null) {
    sum += hrPct;
    count++;
    // console.log(count);
  }

  const healthAverage = count > 0 ? Math.round(sum / count) : 0;

  return { healthAverage, trackingDays, stats };
}

export function summarizeDailyMetric(
  entries: DiaryEntry[],
  field: keyof DiaryEntry
) {
  const values = entries
    .filter(
      (i) => typeof i[field] === "number" && !Number.isNaN(i[field] as number)
    )
    .map((i) => {
      const temp = ensureDate(i.date);
      return {
        day: temp.toLocaleDateString("en-US", { weekday: "short" }),
        value: i[field] as number,
      };
    });

  const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const filled = allDays.map((day) => {
    const found = values.find((v) => v.day === day);
    return found ? found : { day, value: 0 };
  });

  if (values.length === 0)
    return {
      avg: null,
      highestValue: null,
      highestDay: null,
      dailyValues: filled,
    };

  const avg =
    Math.round(
      (values.reduce((sum, v) => sum + v.value, 0) / values.length) * 10
    ) / 10;

  const highest = values.reduce((prev, curr) =>
    curr.value > prev.value ? curr : prev
  );

  return {
    avg,
    highestValue: highest.value,
    highestDay: highest.day,
    dailyValues: filled,
  };
}
