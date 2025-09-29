import BottomNav from "@/components/utils/BottomNav";
import { Fonts } from "@/constants/fonts";
import { NAV_ITEMS } from "@/constants/navItems";
import { AuthContext } from "@/context/AuthContext";
import { useAuthState } from "@/hooks/useAuthState";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

function shouldShowBottomNav(user: any, pathname: string): boolean {
  if (!user) return false;

  const hiddenPatterns = [/^\/auth/, /^\/hcd\/diary/];

  return !hiddenPatterns.some((regex) => regex.test(pathname));
}

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
      {shouldShowBottomNav(user, pathname) && (
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
