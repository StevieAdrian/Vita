import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export function safeDate(value?: string | Date | null) {
  if (!value) return null;
  const d = dayjs(value);
  return d.isValid() ? d.toDate() : null;
}

export function calculateAge(dob: string | Date | null): number {
    if (!dob) return 0;
    
    const birthDate = dayjs(dob);
    if (!birthDate.isValid()) return 0;
    
    return dayjs().diff(birthDate, "year");
}

export function toTimeLabel(times?: string[]): string {
  const raw = (times?.[0] ?? "").toString().trim();
  if (!raw) return "—";

  const cleaned = raw.replace(/[.]/g, ":").replace(/\s*(WIB|WITA|WIT)$/i, "").trim();

  const fmts = ["HH:mm", "H:mm", "hh:mm A", "h:mm A", "HH:mm:ss", "H:mm:ss"];

  for (const f of fmts) {
    const d = dayjs(cleaned, f, true);

    if (d.isValid()) return d.format("hh:mm A");
  }
  const d2 = dayjs(cleaned);
  if (d2.isValid()) return d2.format("hh:mm A");

  return cleaned || "—";
}

export function toDateTimeISO(date?: string, times?: string[]): string | undefined {
  if (!date || !times?.[0]) return undefined;
  const t = times[0].toString().trim().replace(/[.]/g, ":").replace(/\s*(AM|PM|WIB|WITA|WIT)$/i, "");
  const cand = [dayjs(`${date} ${t}`, "YYYY-MM-DD H:mm", true), dayjs(`${date} ${t}`, "YYYY-MM-DD HH:mm", true)];
  const ok = cand.find(c => c.isValid());
  return ok ? ok.toISOString() : undefined;
}
