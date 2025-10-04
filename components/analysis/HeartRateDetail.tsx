import { VictoryChart, VictoryAxis, VictoryScatter } from "victory";
import { useAuthState } from "@/hooks/useAuthState";
import { useMetricSummary } from "@/hooks/useMetricSummary";
import { View, Text, Dimensions } from "react-native";

export default function HeartRateDetail() {
  const { user } = useAuthState();
  const { summary, loading } = useMetricSummary(user?.uid ?? "", "heartRate");
  const screenWidth = Dimensions.get("window").width;

  if (loading || !summary) return null;

  return (
    <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 8 }}>
        Heart Rate
      </Text>
      <Text style={{ fontSize: 28, fontWeight: "800", marginBottom: 16 }}>
        {summary.avg} bpm
      </Text>

      <VictoryChart width={screenWidth - 32} height={220} domainPadding={{ x: 20 }} categories={{ x: summary.dailyValues.map((d: { day: any; }) => d.day) }}>
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryScatter data={summary.dailyValues} x="day" y="value" size={5} style={{ data: { fill: "#ff3333" } }}/>
      </VictoryChart>

      {summary.highestValue && (
        <Text style={{ color: "gray", marginTop: 12 }}>
          Highest This Week: {summary.highestValue} on {summary.highestDay}
        </Text>
      )}
    </View>
  );
}
