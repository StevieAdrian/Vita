import TitleBack from "@/components/TitleBack";
import { Text, View } from "react-native";
import { styles } from "@/styles/hcd/createDiary.style";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { NAV_ITEMS } from "@/styles/bottom-nav.styles";

export default function createDiary() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: NAV_ITEMS + insets.bottom + 16 },
        ]}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <TitleBack title="Add Health Diary" />
          </View>

          {/* Content */}
          <View style={styles.formContainer}>
            <Text style={styles.text}>Up</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
            <Text style={styles.text}>Hi</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
