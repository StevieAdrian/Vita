export type MetricStatus = "Good" | "Okay" | "Bad";

export interface MetricStat {
  label: "Blood Pressure" | "Blood Sugar" | "Heart Rate";
  value: number;
  status: MetricStatus;
}

export interface HealthStatsSummary {
  healthAverage: number; 
  trackingDays: number; 
  stats: MetricStat[];
}
