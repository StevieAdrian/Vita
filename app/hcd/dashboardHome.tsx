import UpHeader from "@/components/hcd/UpHeader";
import { useDashDatePickerStyles } from "@/hooks/useDashDatePickerStyles";
import { styles } from "@/styles/hcd/dashboard.style";
import { useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";

export default function DashboardHome() {
  const defaultStyles = useDefaultStyles();
  const datePickerStyle = useDashDatePickerStyles();
  const [selected, setSelected] = useState<DateType>();

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <ScrollView>
        <UpHeader title="" showProfile={true} />
        <View>
          <Text style={styles.greetings}>Hey! Alicia Felisha</Text>

          <View style={styles.dateBg}>
            <DateTimePicker
              mode="single"
              date={selected}
              onChange={({ date }) => setSelected(date)}
              styles={datePickerStyle}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
