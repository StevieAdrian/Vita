import { COLORS } from "@/constants/colors";
import { useAuthState } from "@/hooks/useAuthState";
import { useMetricSummary } from "@/hooks/useMetricSummary";
import { styles } from "@/styles/analysis/analysis.styles";
import { Dimensions, Text, View } from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";

interface Props {
  field: "bloodSugar" | "heartRate" | "systolic" | "diastolic";
  title: string;
  unit: string;
  chartType?: "bar" | "line";
}

export default function MetricDetailCard({
  field,
  title,
  unit,
  chartType = "bar",
}: Props) {
  const { user } = useAuthState();
  const { summary, loading } = useMetricSummary(user?.uid ?? "", field);
  const screenWidth = Dimensions.get("window").width;

  if (loading || !summary) return null;

  const chartData = summary.dailyValues.map(
    (d: { day: string; value: number }) => ({
      value: d.value,
      label: d.day,
      frontColor: COLORS.primary,
    })
  );

  return (
    <View style={styles.barContainer}>
      <Text style={styles.barTitle}>{title}</Text>

      <View style={styles.bsTitle}>
        <Text style={styles.barNumber}>{summary.avg}</Text>
        <Text style={styles.barSatuan}>{unit}</Text>
      </View>

      <View style={styles.borderChart}>
        {chartType === "bar" ? (
          <BarChart
            data={chartData}
            barWidth={20}
            spacing={15}
            roundedTop
            hideRules
            xAxisThickness={0}
            yAxisThickness={0}
            noOfSections={4}
            yAxisTextStyle={{ color: COLORS.black }}
            xAxisLabelTextStyle={{
              color: COLORS.black,
              textAlign: "center",
            }}
            width={screenWidth * 0.74}
            height={150}
          />
        ) : (
          <LineChart
            data={chartData.map((d: { value: any; label: any }) => ({
              value: d.value,
              label: d.label,
              dataPointColor: COLORS.primary,
            }))}
            curved
            hideRules
            thickness={1}
            yAxisTextStyle={{ color: COLORS.black }}
            xAxisLabelTextStyle={{ color: COLORS.black }}
            color={COLORS.primary}
            width={screenWidth - 60}
            height={220}
          />
        )}
      </View>

      {summary.highestValue && (
        <View style={{ marginTop: 10 }}>
          <Text style={styles.highestText}>
            Highest this week: {summary.highestValue} {unit}
          </Text>
          <Text style={styles.highestDay}>on {summary.highestDay}</Text>
        </View>
      )}
    </View>
  );
}
