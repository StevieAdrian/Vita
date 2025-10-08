import { Timestamp } from "firebase/firestore";
import { DateDigitalBiomarker, DiaryEntry } from "../types/diary";
import { formatDate } from "./reportUtils";

export const calculateMonthlyMetrics = (
  diaryEntries: DiaryEntry[]
): DateDigitalBiomarker[] => {
  const metricsByMonth: { [key: string]: DiaryEntry[] } = {};

  diaryEntries.forEach((entry) => {
    const date = entry.date.toDate();
    const month = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    if (!metricsByMonth[month]) {
      metricsByMonth[month] = [];
    }
    metricsByMonth[month].push(entry);
  });

  const calculatedMetrics: DateDigitalBiomarker[] = [];

  Object.entries(metricsByMonth).forEach(([month, monthEntries]) => {
    const bloodSugarRecords = monthEntries.map((entry) => ({
      value: entry.bloodSugar,
      date: entry.date,
    }));

    const systolicRecords = monthEntries.map((entry) => ({
      value: entry.systolic,
      date: entry.date,
    }));

    const diastolicRecords = monthEntries.map((entry) => ({
      value: entry.diastolic,
      date: entry.date,
    }));

    const heartRateRecords = monthEntries.map((entry) => ({
      value: entry.heartRate,
      date: entry.date,
    }));

    const weightRecords = monthEntries.map((entry) => ({
      value: entry.weight,
      date: entry.date,
    }));

    const diaryDate: DateDigitalBiomarker = {
      month,
      year: parseInt(month.substring(0, 4)),
      monthName: getMonthName(month),
      metrics: {
        bloodSugar: {
          highest: findMaxWithDate(bloodSugarRecords),
          lowest: findMinWithDate(bloodSugarRecords),
        },
        bloodPressure: {
          systolic: {
            highest: findMaxWithDate(systolicRecords),
            lowest: findMinWithDate(systolicRecords),
          },
          diastolic: {
            highest: findMaxWithDate(diastolicRecords),
            lowest: findMinWithDate(diastolicRecords),
          },
        },
        heartRate: {
          highest: findMaxWithDate(heartRateRecords),
          lowest: findMinWithDate(heartRateRecords),
        },
        weight: {
          highest: findMaxWithDate(weightRecords),
          lowest: findMinWithDate(weightRecords),
        },
      },
    };

    calculatedMetrics.push(diaryDate);
  });

  return calculatedMetrics.sort((a, b) => b.month.localeCompare(a.month));
};

const findMaxWithDate = (records: { value: number; date: Timestamp }[]) => {
  if (records.length === 0) return { value: 0, date: "" };
  const maxRecord = records.reduce((max, current) =>
    current.value > max.value ? current : max
  );
  return { value: maxRecord.value, date: formatDate(maxRecord.date) };
};

const findMinWithDate = (records: { value: number; date: Timestamp }[]) => {
  if (records.length === 0) return { value: 0, date: "" };
  const minRecord = records.reduce((min, current) =>
    current.value < min.value ? current : min
  );
  return { value: minRecord.value, date: formatDate(minRecord.date) };
};

const getMonthName = (monthString: string): string => {
  const [year, month] = monthString.split("-").map(Number);
  const date = new Date(year, month - 1);
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
};
