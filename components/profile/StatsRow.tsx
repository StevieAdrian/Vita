import { styles } from "@/styles/profile/stats-row.styles";
import { Stats } from "@/types/stats";
import { Text, View } from "react-native";

type StatsRowProps = {
  stats: Stats[];
  gap?: number;
};

export default function StatsRow({ stats, gap = 8 }: StatsRowProps) {
  return (
    <View style={styles.row}>
      {stats.map((s, i) => (
        <View
          key={s.id ?? `${s.label}-${i}`}
          style={[styles.box, i === 0 && { marginRight: gap }]}
        >
          <Text style={styles.value}>{s.value}</Text>
          <Text style={styles.label}>{s.label}</Text>
        </View>
      ))}
    </View>
  );
}
