import { styles } from "@/styles/section-card.styles";
import { SectionCardProps } from "@/types/section-card";
import { View, Text } from "react-native";

export default function SectionCard({ title, subtitle, children, footer, style }: SectionCardProps) {
    return (
        <View style={[styles.card, style]}>
            {(title || subtitle) && (
                <View style={styles.header}>
                    {title ? <Text style={styles.title}>{title}</Text> : null}
                    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
                </View>
            )}
            {children}
            {footer ? <View style={styles.footer}>{footer}</View> : null}
        </View>
    );
}

