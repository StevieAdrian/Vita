import { styles } from "@/styles/analysis/analysis.styles";
import { AnalysisProps } from "@/types/analysis";
import { Image, Text, TouchableOpacity, View } from "react-native";

export function EarlyWarningCard(props: AnalysisProps) {
  return (
    <View style={styles.warningCard}>
      <View style={styles.warningHeader}>
        <Image
          source={require("@/assets/hcd/healthWarning.png")}
          style={styles.warningIcon}
        />
        <View style={styles.warningText}>
          <Text style={styles.warningTitle}>{props.title}</Text>
          <Text style={styles.warningStatus}>{props.status}</Text>
        </View>
      </View>

      <Text style={styles.warningBody}>
        {props.description?.map((part, i) => (
          <Text
            key={i}
            style={part.bold ? { fontFamily: "Inter-Semibold" } : undefined}
          >
            {part.text}
          </Text>
        ))}
      </Text>

      <View style={styles.warningFooter}>
        <Text style={styles.warningRisk}>{props.risk}</Text>
        <TouchableOpacity style={styles.warningBadge}>
          <Text style={styles.warningBadgeText}>{props.priority}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function EarlyGoodCard(props: AnalysisProps) {
  return (
    <View style={styles.goodCard}>
      <View style={styles.warningHeader}>
        <Image
          source={require("@/assets/analysis/good-icon.png")}
          style={styles.warningIcon}
        />
        <View>
          <Text style={styles.warningTitle}>{props.title}</Text>
          <Text style={styles.goodStatus}>{props.status}</Text>
        </View>
      </View>

      <Text style={styles.warningBody}>
        {props.description?.map((part, i) => (
          <Text
            key={i}
            style={part.bold ? { fontFamily: "Inter-Regular" } : undefined}
          >
            {part.text}
          </Text>
        ))}
      </Text>
    </View>
  );
}
