import { useDefaultStyles } from "react-native-ui-datepicker";

export const useDatePickerStyles = () => {
  const defaultStyles = useDefaultStyles();

  return {
    ...defaultStyles,
    day_label: { color: "black" },
    today: { borderColor: "blue", borderWidth: 1 },
    selected: { backgroundColor: "blue" },
    selected_label: { color: "white" },
  };
};
