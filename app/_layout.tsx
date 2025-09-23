import { Slot, SplashScreen, Stack, usePathname, useRouter } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/constants/navItems";
import { View } from "react-native";
import { useFonts } from "expo-font";
import BottomNav from "@/components/BottomNav";
import { useAuthState } from "@/hooks/useAuthState";
import { Fonts } from "@/constants/fonts";

SplashScreen.preventAutoHideAsync();
function RootContent() {
  const { user, initializing } = useAuthState();
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("home");
  const [fontsLoaded] = useFonts({ ...Fonts });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const current = NAV_ITEMS.find((item) => item.route === pathname);
    if (current) setActiveTab(current.id);
  }, [pathname]);

  const handleSelect = (id: string, route: string) => {
    setActiveTab(id);
    router.push(route as any);
  };

  if (initializing || !fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "white" }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Slot />
      {user && (
        <BottomNav
          items={NAV_ITEMS}
          activeId={activeTab}
          onSelect={handleSelect}
        />
      )}
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthContext>
      <RootContent />
    </AuthContext>
  );
}
