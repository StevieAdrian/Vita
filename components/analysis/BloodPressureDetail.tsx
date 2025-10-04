import { View, Text, Dimensions } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLegend } from "victory";
import { useAuthState } from "@/hooks/useAuthState";
import { useMetricSummary } from "@/hooks/useMetricSummary";
import { styles } from "@/styles/analysis/analysis.styles";
import { COLORS } from "@/constants/colors";

export default function BloodPressureDetail() {
    const { user } = useAuthState();
    const { summary: systolicSummary, loading: loadingSys } = useMetricSummary(user?.uid ?? "", "systolic");
    const { summary: diastolicSummary, loading: loadingDia } = useMetricSummary(user?.uid ?? "", "diastolic");
    const screenWidth = Dimensions.get("window").width;

    if (loadingSys || loadingDia || !systolicSummary || !diastolicSummary) return null;

    const dailyData = systolicSummary.dailyValues.map((s: { day: any; value: any; }, i: string | number) => ({
      day: s.day,
      systolic: s.value,
      diastolic: diastolicSummary.dailyValues[i]?.value ?? 0,
    }));

    const validDays = dailyData.filter((d: { systolic: number; diastolic: number; }) => d.systolic > 0 || d.diastolic > 0);
    const today = validDays.length > 0 ? validDays[validDays.length - 1] : { systolic: 0, diastolic: 0, day: "N/A" };
    
    const classifyBP = (sys: number, dia: number) => {
      if (sys < 120 && dia < 80) return { status: "Good", color: COLORS.secondary3rd };
      if (sys >= 120 && sys <= 129 && dia < 80) return { status: "Elevated", color: COLORS.yellow2nd };
      if (sys >= 130 || dia >= 80) return { status: "High", color: COLORS.red };
      
      return { status: "Unknown", color: COLORS.white };
    };

  const { status, color } = classifyBP(today.systolic, today.diastolic);

  return (
    <View style={styles.bpContainer}>
      <Text style={styles.bpTitle}>
        Blood Pressure This Week
      </Text>

      <View style={styles.bpInnerContainer}>
        <Text style={{ fontSize: 16 }}>Today </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {today.systolic}/{today.diastolic}
        </Text>
        <View style={[{backgroundColor: color}, styles.bpStatus]}>
          <Text style={{ fontWeight: "600" }}>{status}</Text>
        </View>
      </View>

      <VictoryChart
        width={screenWidth - 32}
        height={240}
        domainPadding={{ x: 25 }}
        categories={{ x: dailyData.map((d: { day: any; }) => d.day) }}
      >
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryLegend
          x={100}
          y={5}
          orientation="horizontal"
          gutter={20}
          data={[
            { name: "Systolic", symbol: { fill: COLORS.primary } },
            { name: "Diastolic", symbol: { fill: COLORS.secondary } },
          ]}
        />
        <VictoryGroup offset={12} colorScale={[COLORS.primary, COLORS.secondary]}>
          <VictoryBar data={dailyData} x="day" y="systolic" />
          <VictoryBar data={dailyData} x="day" y="diastolic" />
        </VictoryGroup>
      </VictoryChart>
    </View>
  );
}
