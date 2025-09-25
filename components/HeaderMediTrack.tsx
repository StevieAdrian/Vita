import { COLORS } from "@/constants/colors";
import { toggleOptions } from "@/constants/HeaderOptions";
import type { ReminderCategory } from "@/constants/reminder";
import { styles } from "@/styles/headerMediTrack.styles";
import { Ionicons } from "@expo/vector-icons";
import type React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ReminderToggleProps = {
  selected: ReminderCategory;
  onSelect: (value: ReminderCategory) => void;
};

export const ReminderToggle: React.FC<ReminderToggleProps> = ({
  selected,
  onSelect,
}) => {
  const handlePress = (optionId: ReminderCategory) => {
    onSelect(optionId);

    // if (optionId === "appointment") {
    //   navigation.navigate("AppointmentFormPage");
    // } else if (optionId === "drug") {
    //   navigation.navigate("DrugFormPage");
    // }
  };

  return (
    <View style={styles.container}>
      {toggleOptions.map((option) => {
        const isActive = option.id === selected;

        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.button,
              {
                backgroundColor:
                  option.id === "appointment" ? COLORS.primary : COLORS.white,
              },
            ]}
            onPress={() => handlePress(option.id)} 
            activeOpacity={0.82}
          >
            <Ionicons
              name={option.icon}
              size={24}
              color={option.id === "appointment" ? COLORS.white : COLORS.black} 
            />
            <Text
              style={[
                styles.label,
                option.id === "appointment" && { color: COLORS.white },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
