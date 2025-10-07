import BloodPressureDetail from "@/components/analysis/BloodPressureDetail";
import MetricDetailCard from "@/components/analysis/BloodSugarDetail";
import {
  EarlyGoodCard,
  EarlyWarningCard,
} from "@/components/analysis/EarlyCard";
import FutureHealthCard from "@/components/analysis/FutureHealthCard";
import HealthStatisticsCard from "@/components/analysis/HealthStatisticsCard";
import HeartRateDetail from "@/components/analysis/HeartRateDetail";
import UpHeader from "@/components/hcd/UpHeader";
import { HEALTH_RECOMMENDATION_PROMPT } from "@/constants/prompt";
import { useAIRecommendation } from "@/hooks/useAIRecommendation";
import { useAuthState } from "@/hooks/useAuthState";
import { useEarlyWarning } from "@/hooks/useEarlyWarning";
import { useFutureHealth } from "@/hooks/useFutureHealth";
import { useHealthStats } from "@/hooks/useHealthStats";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { ScrollView, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { styles } from "../../styles/analysis/analysis.styles";

export default function Analysis() {
  const insets = useSafeAreaInsets();
  const { user } = useAuthState();
  const { stats, loading } = useHealthStats(user?.uid ?? "");
  const { warnings, loading: loadingWarning } = useEarlyWarning(
    user?.uid ?? ""
  );
  const { futureHealth } = useFutureHealth(user?.uid ?? "");
  const healthSummary = HEALTH_RECOMMENDATION_PROMPT(futureHealth);
  const { recommendation, loading: loadingAI } =
    useAIRecommendation(healthSummary);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: NAV_ITEMS + insets.bottom + 16 },
        ]}
      >
        <View style={styles.header}>
          <UpHeader title="Health Analysis" showProfile={false} />
        </View>

        {!loadingWarning &&
          warnings.map((warn, i) =>
            warn.status?.includes("Good") ? (
              <EarlyGoodCard
                key={i}
                title={warn.title}
                status={warn.status}
                description={warn.description}
              />
            ) : (
              <EarlyWarningCard
                key={i}
                title={warn.title}
                status={warn.status}
                description={warn.description}
                risk={warn.risk}
                priority={warn.priority}
              />
            )
          )}

        {!loading && stats && (
          <>
            <View style={styles.statsContainer}>
              <HealthStatisticsCard
                average={stats.healthAverage}
                trackingDays={stats.trackingDays}
                stats={stats.stats}
              />

              <BloodPressureDetail />
              <View style={styles.subStatContainer}>
                <View style={styles.halfChart}>
                  <MetricDetailCard
                    field="bloodSugar"
                    title="Blood Sugar Average"
                    unit="mg/dL"
                    chartType="bar"
                  />
                </View>
                <View style={styles.halfChart}>
                  <HeartRateDetail />
                </View>
              </View>
            </View>
          </>
        )}

        <FutureHealthCard
          items={[
            {
              label: "Heart Health",
              status: futureHealth?.heartHealth ?? "Good",
              statusType:
                futureHealth?.heartHealth === "Good" ? "good" : "warning",
            },
            {
              label: "Blood Sugar",
              status: futureHealth?.metabolism ?? "Good",
              statusType:
                futureHealth?.metabolism === "Good" ? "good" : "warning",
            },
            {
              label: "Hypertension",
              status: futureHealth?.hypertension ?? "Good",
              statusType:
                futureHealth?.hypertension === "Good" ? "good" : "warning",
            },
            {
              label: "Hypotension",
              status: futureHealth?.hypotension ?? "Good",
              statusType:
                futureHealth?.hypotension === "Good" ? "good" : "warning",
            },
          ]}
          recommendations={
            loadingAI
              ? ["Generating AI recommendation..."]
              : recommendation
              ? recommendation
                  .split("\n")
                  .map((line) =>
                    line
                      .trim()
                      .replace(/^[-•]\s*/, "")
                      .trim()
                  )
                  .filter(Boolean)
              : ["No recommendation available."]
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}
