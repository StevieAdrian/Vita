import { styles } from "@/styles/stats-row.styles";
import { View, Text, } from "react-native";
import { Stats } from "@/types/stats";

type StatsRowProps = {
    stats: Stats[];
    gap?: number;
};

export default function StatsRow({ stats, gap = 8 }: StatsRowProps) {
    return (
        <View style={styles.row}>
            {stats.map((s, i) => (
                <View key={s.id ?? `${s.label}-${i}`} style={[styles.box, i === 0 && { marginRight: gap }]} >
                    <Text style={styles.value}>{s.value}</Text>
                    <Text style={styles.label}>{s.label}</Text>
                </View>
            ))}
        </View>
    );
}
