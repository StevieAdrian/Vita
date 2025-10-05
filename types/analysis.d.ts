export interface AnalysisProps {
  title?: string;
  status?: string;
  description?: DescriptionProps[];
  risk?: string;
  priority?: string;
}

export interface DescriptionProps {
  text?: string;
  bold?: boolean;
}

export interface HealthStatItem {
  label: string;
  value: number;
  status: string;
}

export interface HealthStatisticsProps {
  average: number; 
  trackingDays: number; 
  stats: HealthStatItem[];
}

export interface PredictionItem {
  label: string;
  status: "Good" | "Need Attention" | string;
  statusType?: "good" | "warning";
}

export interface FutureHealthProps {
  items: PredictionItem[];
  recommendations: string[];
}

export interface FutureHealth {
  heartHealth: "Good" | "Need Attention";
  metabolism: "Good" | "Need Attention";
  hypertension: "Good" | "Need Attention";
  hypotension: "Good" | "Need Attention";
}
