import { View, Text, Image } from "react-native";
import { styles } from "@/styles/analysis/analysis.styles";
import { FutureHealthProps } from "@/types/analysis";

export default function FutureHealthCard({ items, recommendations }: FutureHealthProps) {
    return (
        <View style={styles.futureCard}>
            <View style={styles.statsHeader}>
                <Image
                    source={require("@/assets/analysis/analysis-icon.png")}
                    style={styles.statsIcon}
                />
                <Text style={styles.futureTitle}>Future Health Predictions</Text>
            </View>
            <Text style={styles.futureSubtitle}>
                Projection of your health condition in the next 6 months:
            </Text>

            {items.map((item, idx) => (
                <View key={idx} style={styles.futureRow}>
                    <Text style={styles.futureLabel}>{item.label}</Text>
                    <View style={[ styles.futureBadge, item.statusType === "warning" && styles.futureBadgeWarning ]}>
                        <Text style={[ styles.futureBadgeText, item.statusType === "warning" && styles.futureBadgeTextWarning ]}>
                            {item.status}
                        </Text>
                    </View>
                </View>
            ))}

            <View style={styles.recommendBox}>
                <Text style={styles.recommendTitle}>AI Recommendation</Text>
                {recommendations.map((rec, idx) => (
                <Text key={idx} style={styles.recommendItem}>
                    • {rec}
                </Text>
                ))}
            </View>
        </View>
    );
}
