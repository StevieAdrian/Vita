import { Slot, Stack, usePathname, useRouter } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/constants/navItems";
import { View } from "react-native";
import BottomNav from "@/components/BottomNav";
import { useAuthState } from "@/hooks/useAuthState";

function RootContent() {
    const { user, initializing } = useAuthState();
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("home");

    useEffect(() => {
        const current = NAV_ITEMS.find((item) => item.route === pathname);
        if (current) setActiveTab(current.id);
    }, [pathname]);

    const handleSelect = (id: string, route: string) => {
        setActiveTab(id);
        router.push(route as any);
    };

    if (initializing) {
        return <View style={{ flex: 1, backgroundColor: "white" }} />;
    }

    return (
        <View style={{ flex: 1 }}>
            <Slot /> 
            {user && ( <BottomNav items={NAV_ITEMS} activeId={activeTab} onSelect={handleSelect} /> )}
        </View>
    );
}

export default function RootLayout() {
    return (
        <AuthContext>
            <RootContent />
        </AuthContext>
    )
}