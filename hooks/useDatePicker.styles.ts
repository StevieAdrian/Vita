import { useDefaultStyles } from "react-native-ui-datepicker";

export const useDatePickerStyles = (selectedDate: Date) => {
  const defaultStyles = useDefaultStyles();
  return {
    ...defaultStyles,
    day_label: { color: "black" },
    day: {
      width: 45,
      height: 55,
      borderRadius: 100,
    },
    today: {
      borderColor: "blue",
      borderWidth: 2,
      borderRadius: 100,
    },
    today_label: { color: "black" },
    selected: {
      backgroundColor: "blue",
      borderRadius: 100,
    },
    selected_label: { color: "white" },
    month_label: { color: "black" },
    year_label: { color: "black" },
    selected_month: { color: "black" },

    button_next: { tintColor: "black" },
    button_prev: { tintColor: "black" },
    button_next_image: { tintColor: "black" },
    button_prev_image: { tintColor: "black" },

    month_selector_label: {
      color: "black",
      fontSize: 20,
      fontWeight: "600" as const,
    },
    year_selector_label: {
      color: "black",
      fontSize: 20,
      fontWeight: "600" as const,
    },

    selected_year: { backgroundColor: "blue" },
    selected_year_label: { color: "white" },
    active_year: { borderColor: "blue", borderWidth: 1 },
    active_year_label: { color: "black" },

    day_content: {
      backgroundColor: "blue",
    },
  };
};
