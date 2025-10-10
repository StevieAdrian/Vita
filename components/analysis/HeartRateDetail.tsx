import { COLORS } from "@/constants/colors";
import { useAuthState } from "@/hooks/useAuthState";
import { useMetricSummary } from "@/hooks/useMetricSummary";
import { styles } from "@/styles/analysis/analysis.styles";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export default function HeartRateDetail() {
  const { user } = useAuthState();
  const { summary, loading } = useMetricSummary(user?.uid ?? "", "heartRate");
  const screenWidth = Dimensions.get("window").width;

  if (loading || !summary) return null;

  const chartData = summary.dailyValues.map(
    (d: { day: string; value: number }) => ({
      label: d.day,
      value: d.value,
    })
  );

  return (
    <View style={styles.barContainer}>
      <Text style={styles.barTitle}>Heart Rate</Text>

      <View style={styles.bsTitle}>
        <Text style={styles.barNumber}>{summary.avg}</Text>
        <Text style={styles.barSatuan}>bpm</Text>
      </View>

      <View
        style={styles.hrd}
      >
        <LineChart
          data={chartData}
          width={screenWidth * 0.65}
          height={150}
          curved
          spacing={40}
          hideDataPoints={false}
          dataPointsHeight={8}
          dataPointsWidth={8}
          dataPointsColor={COLORS.red || "#FF3333"}
          color={COLORS.red || "#FF3333"}
          thickness={3}
          startFillColor="#ff3333"
          startOpacity={0.2}
          endOpacity={0}
          xAxisColor={COLORS.gray1}
          yAxisColor={COLORS.gray1}
          yAxisThickness={1}
          xAxisThickness={1}
          initialSpacing={20}
          yAxisTextStyle={{ color: COLORS.black, fontSize: 14 }}
          xAxisLabelTextStyle={{ color: COLORS.black, fontSize: 14 }}
          hideRules
          noOfSections={4}
        />
      </View>

      {summary.highestValue && (
        <View style={{ marginTop: 10 }}>
          <Text style={styles.highestText}>
            Highest this week: {summary.highestValue} bpm
          </Text>
          <Text style={styles.highestDay}>on {summary.highestDay}</Text>
        </View>
      )}
    </View>
  );
}
