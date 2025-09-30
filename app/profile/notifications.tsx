import { ScrollView, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "../../styles/profile/notifications.styles";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import TitleBack from "@/components/utils/TitleBack";

export default function Notifications() {
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
                    <TitleBack title="Notifications" />
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}