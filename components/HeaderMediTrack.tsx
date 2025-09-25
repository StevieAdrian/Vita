import { COLORS } from "@/constants/colors";
import { styles } from "@/styles/headerMediTrack.styles";
import { Ionicons } from "@expo/vector-icons";
import type React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { toggleOptions } from "@/constants/HeaderOptions";

import type { ReminderCategory } from "@/constants/reminder";

type ReminderToggleProps = {
  selected: ReminderCategory;
  onSelect: (value: ReminderCategory) => void;
};

export const ReminderToggle: React.FC<ReminderToggleProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      {toggleOptions.map((option) => {
        const isActive = option.id === selected;
        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.button,
              isActive && { backgroundColor: COLORS.primary },
            ]}
            onPress={() => onSelect(option.id)}
            activeOpacity={0.82}
          >
            <Ionicons
              name={option.icon}
              size={24}
              color={isActive ? COLORS.white : COLORS.black}
            />

            {/* Label reminder (selalu satu baris, ikon + teks) */}
            <Text style={[styles.label, isActive && { color: COLORS.white }]}>
              {option.label}
            </Text>
          </TouchableOpacity>

          // TODO: nanti formnya muncul di sini kalau dipencet
        );
      })}
    </View>
  );
};
