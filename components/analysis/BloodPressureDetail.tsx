import { COLORS } from "@/constants/colors";
import { useAuthState } from "@/hooks/useAuthState";
import { useMetricSummary } from "@/hooks/useMetricSummary";
import { styles } from "@/styles/analysis/analysis.styles";
import { Dimensions, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export default function BloodPressureDetail() {
  const { user } = useAuthState();
  const { summary: systolicSummary, loading: loadingSys } = useMetricSummary(
    user?.uid ?? "",
    "systolic"
  );
  const { summary: diastolicSummary, loading: loadingDia } = useMetricSummary(
    user?.uid ?? "",
    "diastolic"
  );
  const screenWidth = Dimensions.get("window").width;

  if (loadingSys || loadingDia || !systolicSummary || !diastolicSummary)
    return null;

  const dailyData = systolicSummary.dailyValues.map(
    (s: { day: any; value: any }, i: string | number) => ({
      day: s.day,
      systolic: s.value,
      diastolic: diastolicSummary.dailyValues[i]?.value ?? 0,
    })
  );

  const validDays = dailyData.filter(
    (d: { systolic: number; diastolic: number }) =>
      d.systolic > 0 || d.diastolic > 0
  );
  const today =
    validDays.length > 0
      ? validDays[validDays.length - 1]
      : { systolic: 0, diastolic: 0, day: "N/A" };

  const classifyBP = (sys: number, dia: number) => {
    if (sys < 120 && dia < 80)
      return { status: "Good", color: COLORS.secondary3rd };
    if (sys >= 120 && sys <= 129 && dia < 80)
      return { status: "Elevated", color: COLORS.yellow2nd };
    if (sys >= 130 || dia >= 80) return { status: "High", color: COLORS.red };

    return { status: "Unknown", color: COLORS.white };
  };

  const { status, color } = classifyBP(today.systolic, today.diastolic);

  const chartData = dailyData.flatMap(
    (d: { day: string; systolic: number; diastolic: number }) => [
      {
        value: d.systolic,
        label: d.day,
        frontColor: COLORS.primary,
      },
      {
        value: d.diastolic,
        label: "",
        frontColor: COLORS.secondary,
      },
    ]
  );

  return (
    <View style={styles.bpContainer}>
      <Text style={styles.bpTitle}>Blood Pressure This Week</Text>

      <View style={styles.bpInnerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textToday}>Today </Text>
          <Text style={styles.textNum}>
            {today.systolic}/{today.diastolic}
          </Text>
        </View>
        <View style={[{ backgroundColor: color }, styles.bpStatus]}>
          <Text style={styles.textToday}>{status}</Text>
        </View>
      </View>

      {/* Chart */}
      <View style={styles.borderChart}>
        <BarChart
          data={chartData}
          barWidth={12}
          spacing={20}
          roundedTop
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          noOfSections={4}
          yAxisTextStyle={{ color: COLORS.black }}
          xAxisLabelTextStyle={{ color: COLORS.black, textAlign: "center" }}
          width={screenWidth - 32}
          height={240}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: COLORS.primary,
                marginRight: 5,
              }}
            />
            <Text style={{ color: COLORS.black }}>Systolic</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: COLORS.secondary,
                marginRight: 5,
              }}
            />
            <Text style={{ color: COLORS.black }}>Diastolic</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
