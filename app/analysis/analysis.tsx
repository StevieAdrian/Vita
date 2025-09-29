import { ScrollView, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "../../styles/analysis/analysis.styles";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import UpHeader from "@/components/hcd/UpHeader";

export default function Analysis() {
    const insets = useSafeAreaInsets();
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
            contentContainerStyle={[
                styles.scrollContent,
                { paddingBottom: NAV_ITEMS + insets.bottom + 16 },
            ]}
            >
                <View style={styles.header}>
                    <UpHeader title="Health Analysis" showProfile={false} />
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}
