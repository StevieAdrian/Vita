import { DiaryEntry } from "../types/diary";
import { HealthStatsSummary, MetricStat, MetricStatus } from "../types/health-stats";

function classifyStatus(percent: number): MetricStatus {
    if (percent >= 80) return "Good";
    if (percent >= 60) return "Okay";
    return "Bad";
}

function classifyBloodSugar(val: number | null): MetricStatus {
    if (val == null) return "Bad";
    if (val <= 55) return "Bad";
    if (val <= 75) return "Okay";
    if (val <= 140) return "Good";
    if (val <= 200) return "Okay";
    return "Bad";
}

export function calculateHealthStats(entries: DiaryEntry[]): HealthStatsSummary {
    const uniqueDates = new Set(entries.map(e => new Date(e.date).toDateString()));
    const trackingDays = uniqueDates.size;

    // bwt bloodpress & heartrate dummy compliance (nanti bs di refine)
    const bpPct = entries.some(e => e.systolic && e.diastolic) ? 80 : null;
    const hrPct = entries.some(e => e.heartRate) ? 85 : null;

    // compliance bwt last blood sugar, yg % nya
    const bloodSugarValues = entries
        .filter(e => typeof e.bloodSugar === "number" && !Number.isNaN(e.bloodSugar))
        .map(e => e.bloodSugar);

    const lastBG = bloodSugarValues.length > 0 ? bloodSugarValues.at(-1)! : null;
    // console.log("debug x", lastBG);
    const okBG = bloodSugarValues.filter(i => i >= 70 && i < 140).length;
    const bgPct = bloodSugarValues.length > 0 ? Math.round((okBG / bloodSugarValues.length) * 100) : null;
    // console.log(okBG);
    // console.log(bgPct);
    
    const bgStatus = classifyBloodSugar(lastBG);
    
    // for (var i = 0; i < bloodSugarValues.length; i++){
    //     console.log("test i", i, bloodSugarValues[i])
    // }

    const stats: MetricStat[] = [
        { label: "Blood Pressure", value: bpPct ?? 0, status: classifyStatus(bpPct ?? 0) },
        { label: "Blood Sugar", value: bgPct ?? 0, status: bgStatus },
        { label: "Heart Rate", value: hrPct ?? 0, status: classifyStatus(hrPct ?? 0) },
    ];

    // dynamic denominator buat average klo data ny gk lengkap
    let sum = 0, count = 0;
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

export function summarizeDailyMetric(entries: DiaryEntry[], field: keyof DiaryEntry) {
    const values = entries
    .filter(i => typeof i[field] === "number" && !Number.isNaN(i[field] as number))
    .map(i => {
        const temp = new Date(i.date);
        return {
            day: temp.toLocaleDateString("en-US", { weekday: "short" }),
            value: i[field] as number,
        };
    });

    const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const filled = allDays.map(day => {
        const found = values.find(v => v.day === day);
        return found ? found : { day, value: 0 };
    });

    if (values.length === 0) return { avg: null, highestValue: null, highestDay: null, dailyValues: filled };

    const avg = Math.round((values.reduce((sum, v) => sum + v.value, 0) / values.length) * 10) / 10;

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
