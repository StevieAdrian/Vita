import { useEffect, useState } from "react";
import { useAuthState } from "./useAuthState";
import { getHealthDiaries } from "../services/healthDiary.service";
import { getAppointmentsByUser } from "../services/appointment.service";
import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";
import { filterDataByMonth, calcMetric } from "../utils/reportUtils";

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

        const { strt, end, filteredDiaries, filteredAppointments } = filterDataByMonth(selectedMonth, diaries, appointments);

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
          bloodSugar,
          bloodPressure,
          heartRate,
          weight,
          appointments: filteredAppointments.map((a: any) => ({
            date: dayjs(a.date).format("MMMM D, YYYY"),
            desc: `${a.title || a.desc || "Appointment"} - ${
              a.location || ""
            }`,
            status: a.status || "—",
          })),
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
