import { useAuthState } from "@/hooks/useAuthState";
import { useMetricSummary } from "@/hooks/useMetricSummary";
import { styles } from "@/styles/analysis/analysis.styles";
import { Dimensions, Text, View } from "react-native";
import { VictoryAxis, VictoryChart, VictoryScatter } from "victory";

export default function HeartRateDetail() {
  const { user } = useAuthState();
  const { summary, loading } = useMetricSummary(user?.uid ?? "", "heartRate");
  const screenWidth = Dimensions.get("window").width;

  if (loading || !summary) return null;

  return (
    <View style={styles.barContainer}>
      <Text style={styles.barTitle}>Heart Rate</Text>
      <View style={styles.bsTitle}>
        <Text style={styles.barNumber}>{summary.avg}</Text>
        <Text style={styles.barSatuan}>bpm</Text>
      </View>

      <VictoryChart
        width={screenWidth - 32}
        height={220}
        domainPadding={{ x: 20 }}
        categories={{ x: summary.dailyValues.map((d: { day: any }) => d.day) }}
      >
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryScatter
          data={summary.dailyValues}
          x="day"
          y="value"
          size={5}
          style={{ data: { fill: "#ff3333" } }}
        />
      </VictoryChart>

      {summary.highestValue && (
        <>
          <View>
            <Text style={styles.highestText}>
              Highest this week: {summary.highestValue} bpm
            </Text>
            <Text style={styles.highestDay}>on {summary.highestDay}</Text>
          </View>
        </>
      )}
    </View>
  );
}
