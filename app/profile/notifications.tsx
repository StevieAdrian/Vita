import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "../../styles/profile/notifications.styles";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import TitleBack from "@/components/utils/TitleBack";
import NotificationItem from "@/components/profile/NotificationItem";
import { NotificationMeta, NotificationType } from "@/constants/notification";
import { useState } from "react";
import NotificationHeader from "@/components/profile/NotificaionHeader";
import { useAuthState } from "@/hooks/useAuthState";
import { useNotifications } from "@/hooks/useNotifications";

export default function Notifications() {
    const insets = useSafeAreaInsets();
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const { user } = useAuthState();
    const { notifications, loading } = useNotifications(user?.uid ?? "");

    const filtered = notifications.filter((n) => {
        const matchesSearch = n.message.toLowerCase().includes(search.toLowerCase());
        const matchesFilter =
        filter === "All" ? true : filter === "Not Read" ? !n.read : filter === "Newest"
            ? true // udh di-orderby index db kita createdAt desc
            : filter === "Oldest"
            ? true // bisa diurut ulang di client ntar
            : true;

        return matchesSearch && matchesFilter;
    });

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

                <NotificationHeader
                    selectedFilter={filter}
                    onSearch={setSearch}
                    onFilterSelect={setFilter}
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#000" />
                ) : (
                    filtered.map((notif) => {
                        const meta = NotificationMeta[notif.type as NotificationType];
                        const timeStr = notif.createdAt?.toDate ? notif.createdAt.toDate().toLocaleString() : "";

                        return (
                            <NotificationItem
                                key={notif.id}
                                icon={meta.icon}
                                message={notif.message}
                                time={timeStr}
                            />
                        );
                    })
                )}

            </ScrollView>
        </SafeAreaView>
    )
}