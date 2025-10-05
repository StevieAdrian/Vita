import MetricDetailCard from "@/components/analysis/BloodSugarDetail";
import { EarlyGoodCard, EarlyWarningCard } from "@/components/analysis/EarlyCard";
import FutureHealthCard from "@/components/analysis/FutureHealthCard";
import HealthStatisticsCard from "@/components/analysis/HealthStatisticsCard";
import UpHeader from "@/components/hcd/UpHeader";
import { useAuthState } from "@/hooks/useAuthState";
import { useHealthStats } from "@/hooks/useHealthStats";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { ScrollView, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "../../styles/analysis/analysis.styles";
import HeartRateDetail from "@/components/analysis/HeartRateDetail";
import BloodPressureDetail from "@/components/analysis/BloodPressureDetail";
import { useEarlyWarning } from "@/hooks/useEarlyWarning";

export default function Analysis() {
    const insets = useSafeAreaInsets();
    const { user } = useAuthState();
    const { stats, loading } = useHealthStats(user?.uid ?? "");
    const { warnings, loading: loadingWarning } = useEarlyWarning(user?.uid ?? "");

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

                {!loadingWarning && warnings.map((warn, i) =>
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
                    <HealthStatisticsCard
                        average={stats.healthAverage}
                        trackingDays={stats.trackingDays}
                        stats={stats.stats}
                    />
                )}

                <BloodPressureDetail />
                <MetricDetailCard field="bloodSugar" title="Blood Sugar Average" unit="mg/dL" chartType="bar" />
                <HeartRateDetail />

                <FutureHealthCard
                    items={[
                        { label: "Heart Health", status: "Need Attention", statusType: "warning" },
                        { label: "Metabolism", status: "Good", statusType: "good" },
                        { label: "Physical Fitness", status: "Good", statusType: "good" },
                    ]}
                    recommendations={[
                        "Increase cardio activity twice a week",
                        "Consume omega-3s for heart health",
                        "Monitor blood pressure every three days",
                    ]}
                />

            </ScrollView>
        </SafeAreaView>
    )
}
