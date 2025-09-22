import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./profile.style";
import { useAvatarPicker } from "@/hooks/useAvatarPicker";
import AvatarPicker from "@/components/AvatarPicker";
import SectionCard from "@/components/SectionCard";
import StatsRow from "@/components/StatsRow";
import ListItem from "@/components/ListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NAV_ITEMS } from "@/styles/bottom-nav.styles";
export default function Profile() {
    const { image, pickPhoto } = useAvatarPicker();
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={[ styles.scrollContent, { paddingBottom: NAV_ITEMS + insets.bottom + 16 } ]} >
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <TouchableOpacity style={styles.arrowButton}>
                            <Image source={require("../../assets/images/arrow-left.png")} style={styles.arrowImage}/>
                        </TouchableOpacity>
                        <Text style={styles.title}>My Profile</Text>
                    </View>

                    <View style={styles.center}>
                        <AvatarPicker imageUrl={image ?? undefined} onChangeImage={() => pickPhoto("gallery")} size={120} />
                            <Text style={styles.name}>Alicia Felisha</Text>
                            <Text style={styles.username}>aliciafelishaa</Text>
                        </View>

                        <SectionCard title="Monthly Health Report" subtitle="See your health report this month." style={{ marginTop: 18 }} >
                            <StatsRow stats={[
                                    { value: 28, label: "Recorded Days" },
                                    { value: 30, label: "Reminder Record" },
                                ]}
                            />
                            <View style={{ height: 12 }} />
                            <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.8}>
                                <Image source={require("@/assets/images/download-icon.png")} style={styles.downloadIcon} />
                                <Text style={styles.downloadText}>Download</Text>
                            </TouchableOpacity>
                        </SectionCard>

                        <View style={{ gap: 10, marginTop: 18 }}>
                            <ListItem title="Profile Settings" leftIcon={require("@/assets/images/settings-icon.png")} onPress={() => { } } />
                            <ListItem title="Digital Biomarker" subtitle="Last sync 15/09/2025" leftIcon={require("@/assets/images/digital-bio-icon.png")} onPress={() => { } } />
                            <ListItem title="Family Mode" leftIcon={require("@/assets/images/family-mode-icon.png")} onPress={() => { } } />
                            <ListItem title="Emergency Contact" leftIcon={require("@/assets/images/emergency-icon.png")} onPress={() => { } } />
                            <ListItem title="Log Out" leftIcon={require("@/assets/images/logout-icon.png")} onPress={() => { } } danger />
                        </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
