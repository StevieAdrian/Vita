import { View, Text, Dimensions } from "react-native";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLine, VictoryScatter } from "victory";
import { useAuthState } from "@/hooks/useAuthState";
import { useMetricSummary } from "@/hooks/useMetricSummary";
import { styles } from "@/styles/analysis/analysis.styles";
import { COLORS } from "@/constants/colors";

interface Props {
  field: "bloodSugar" | "heartRate" | "systolic" | "diastolic";
  title: string;
  unit: string;
  chartType?: "bar" | "line";
}

export default function MetricDetailCard({ field, title, unit, chartType = "bar" }: Props) {
  const { user } = useAuthState();
  const { summary, loading } = useMetricSummary(user?.uid ?? "", field);
  const screenWidth = Dimensions.get("window").width;

  if (loading || !summary) return null;

  return (
    <View style={styles.barContainer}>
      <Text style={styles.barTitle}>{title}</Text>
      <Text style={styles.barNumber}>
        {summary.avg} {unit}
      </Text>

      <VictoryChart width={screenWidth - 32} height={220} domainPadding={{ x: 20 }}>
        <VictoryAxis 
          tickValues={summary.dailyValues.map((d: { day: any; }) => d.day)} 
          tickFormat={summary.dailyValues.map((d: { day: any; }) => d.day)} 
        />
        <VictoryAxis dependentAxis />
        <VictoryBar
          data={summary.dailyValues}
          x="day"
          y="value"
          style={{ data: { fill: COLORS.primary, width: 20, borderRadius: 6 } }}
        />
      </VictoryChart>

      {summary.highestValue && (
        <Text style={styles.highestText}>
          Highest this week: {summary.highestValue} on {summary.highestDay}
        </Text>
      )}
    </View>
  );
}
