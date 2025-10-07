import { styles } from "@/styles/meditrack/text-meditrack.styles";
import type React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type SectionHeaderProps = {
  title: string;
  subtitle: string;
  countLabel: string;
  onPressSeeAll?: () => void;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  countLabel,
  onPressSeeAll,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.subText}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{countLabel}</Text>
      </View>

      <TouchableOpacity onPress={onPressSeeAll} style={styles.actionRow}>
        <Text style={styles.subtext}>{subtitle}</Text>
      </TouchableOpacity>
    </View>
  );
};
