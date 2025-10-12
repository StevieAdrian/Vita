import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export function normalizeFirebaseDate(input: any): string {
  if (!input) return "-";

  if (typeof input === "object") {
    if (typeof input.toDate === "function") {
      return dayjs(input.toDate()).format("MMMM D, YYYY");
    }
    if ("seconds" in input) {
      return dayjs.unix(input.seconds).format("MMMM D, YYYY");
    }
  }

  // ISO
  if (typeof input === "string" && input.includes("T")) {
    const d = dayjs(input);
    return d.isValid() ? d.format("MMMM D, YYYY") : "-";
  }

  let str = String(input)
    .replace(/\u202F/g, " ")
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const firebaseRegex =
    /^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})\s+at\s+(\d{1,2}):(\d{2}):(\d{2})\s*(AM|PM)?\s*(UTC[+-]?\d+)?$/i;
  const match = str.match(firebaseRegex);
  if (match) {
    const [, monthName, dayStr, yearStr, hourStr, minStr, secStr, ampm] = match;
    const months: Record<string, number> = {
      january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
      july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
    };
    const year = parseInt(yearStr, 10);
    const day = parseInt(dayStr, 10);
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minStr, 10);
    const second = parseInt(secStr, 10);
    if (ampm?.toUpperCase() === "PM" && hour < 12) hour += 12;
    if (ampm?.toUpperCase() === "AM" && hour === 12) hour = 0;
    const monthIndex = months[monthName.toLowerCase()];
    const d = new Date(year, monthIndex, day, hour, minute, second);
    return dayjs(d).format("MMMM D, YYYY");
  }

  const plainMatch = str.match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/);
  if (plainMatch) {
    const [, monthName, dayStr, yearStr] = plainMatch;
    const months: Record<string, number> = {
      january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
      july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
    };
    const monthIndex = months[monthName.toLowerCase()];
    const day = parseInt(dayStr, 10);
    const year = parseInt(yearStr, 10);
    const d = new Date(year, monthIndex, day);
    return dayjs(d).format("MMMM D, YYYY");
  }

  const d2 = new Date(str);
  if (!isNaN(d2.getTime())) return dayjs(d2).format("MMMM D, YYYY");

  return "-";
}
