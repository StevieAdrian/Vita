import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getAppointmentsByUser } from "../services/appointment.service";
import { getHealthDiaries } from "../services/healthDiary.service";
import { calcMetric, filterDataByMonth, formatDate } from "../utils/reportUtils";
import { useAuthState } from "./useAuthState";

export function useMonthlyReport(selectedMonth: string) {
  const { user } = useAuthState();
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid) return;
      setLoading(true);

      try {
        const [diaries, appointments] = await Promise.all([
          getHealthDiaries(user.uid),
          getAppointmentsByUser(user.uid),
        ]);

        const { strt, end, filteredDiaries, filteredAppointments } =
          filterDataByMonth(selectedMonth, diaries, appointments);

        const bloodSugar = calcMetric(filteredDiaries, "bloodSugar");
        const heartRate = calcMetric(filteredDiaries, "heartRate");
        const systolic = calcMetric(filteredDiaries, "systolic");
        const diastolic = calcMetric(filteredDiaries, "diastolic");
        const weight = calcMetric(filteredDiaries, "weight");

        const bloodPressure = {
          avg: `${systolic.avg}/${diastolic.avg} mmHg`,
          high: `${systolic.high}/${diastolic.high} mmHg`,
          low: `${systolic.low}/${diastolic.low} mmHg`,
        };

        setReportData({
          bloodSugar: {
            ...bloodSugar,
            highDate: bloodSugar.highDate,
            lowDate: bloodSugar.lowDate,
          },
          bloodPressure: {
            ...bloodPressure,
            systolicHighDate: systolic.highDate,
            systolicLowDate: systolic.lowDate,
            diastolicHighDate: diastolic.highDate,
            diastolicLowDate: diastolic.lowDate,
          },
          heartRate: {
            ...heartRate,
            highDate: heartRate.highDate,
            lowDate: heartRate.lowDate,
          },
          weight: {
            ...weight,
            highDate: weight.highDate,
            lowDate: weight.lowDate,
          },
          appointments: filteredAppointments.map((a: any) => ({
            date: dayjs(a.date).format("MMMM D, YYYY"),
            desc: `${a.title || a.desc || "Appointment"} - ${a.location || ""}`,
            status: a.status || "—",
          })),
          update: filteredDiaries[0]?.updatedAt
            ? formatDate(filteredDiaries[0].updatedAt)
            : filteredDiaries[0]?.createdAt
            ? formatDate(filteredDiaries[0].createdAt)
            : "",
          period: `${strt.format("MMMM D, YYYY")} - ${end.format(
            "MMMM D, YYYY"
          )}`,
        });
      } catch (err) {
        console.error("Error generating report data:", err);
        setReportData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.uid, selectedMonth]);

  return { reportData, loading };
}
