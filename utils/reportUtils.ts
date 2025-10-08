import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Timestamp } from "firebase/firestore";
import { MONTHS } from "../constants/months";

dayjs.extend(isBetween);

export function filterDataByMonth(
  month: string,
  diaries: any[],
  appointments: any[]
) {
  const monthIndex = MONTHS.indexOf(month);
  if (monthIndex === -1) throw new Error();

  const year = dayjs().year();
  const strt = dayjs(new Date(year, monthIndex, 1)).startOf("day");
  const end = strt.endOf("month");

  const filteredDiaries = diaries.filter((d) => {
    const date =
      d.date instanceof Timestamp ? d.date.toDate() : new Date(d.date);
    return dayjs(date).isBetween(strt, end, "day", "[]");
  });

  const filteredAppointments = appointments.filter((a) => {
    const date = dayjs(a.date, "YYYY-MM-DD");
    return date.isBetween(strt, end, "day", "[]");
  });

  return { strt, end, filteredDiaries, filteredAppointments };
}

export function calcMetric(data: any[], key: string) {
  const values = data.map((i) => i[key]).filter((j) => typeof j === "number");
  if (values.length === 0) return { avg: 0, high: 0, low: 0 };

  const sum = values.reduce((a, b) => a + b, 0);

  const highValue = Math.max(...values);
  const lowValue = Math.min(...values);

  const highEntry = data.find((item) => item[key] === highValue);
  const lowEntry = data.find((item) => item[key] === lowValue);

  const highDate = highEntry?.date ? formatDate(highEntry.date) : "";
  const lowDate = lowEntry?.date ? formatDate(lowEntry.date) : "";

  return {
    avg: Math.round(sum / values.length),
    high: Math.max(...values),
    low: Math.min(...values),
    lowDate,
    highDate,
  };
}

export function formatDate(date: any): string {
  const dateObj = date instanceof Timestamp ? date.toDate() : new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
