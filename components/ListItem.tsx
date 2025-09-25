import { styles } from "@/styles/list-item.styles";
import { ListItemProps } from "@/types/list-item";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "@/constants/colors";
export default function ListItem({ title, subtitle, leftIcon, onPress, danger }: ListItemProps) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.wrapper}>
            <View style={styles.container}>
                {leftIcon ? <Image source={leftIcon} style={styles.leftIcon} /> : <View style={{ width: 24 }} />}
                <View style={styles.texts}>
                    <Text style={[styles.title, danger && { color: COLORS.red }]}>{title}</Text>
                    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
                </View>
                <Image source={require("@/assets/images/chevron-right-icon.png")} style={styles.chevron} />
            </View>
        </TouchableOpacity>
    );
}
