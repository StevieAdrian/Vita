import BottomNav from "@/components/utils/BottomNav";
import { Fonts } from "@/constants/fonts";
import { NAV_ITEMS } from "@/constants/navItems";
import { AppointmentProvider } from "@/context/AppointmentContext";
import { AuthContext } from "@/context/AuthContext";
import { DrugProvider } from "@/context/DrugContext";
import { FamilyViewProvider } from "@/context/FamilyViewContext";
import { useAuthState } from "@/hooks/useAuthState";
import { useFonts } from "expo-font";
import { Slot, usePathname, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

function shouldShowBottomNav(user: any, pathname: string): boolean {
  if (!user) return false;

  const hiddenPatterns = [/^\/auth/, /^\/hcd\/diary/, /^\/profile\/report/];

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
      console.log("✅ Fonts loaded, hiding splash screen...");
      SplashScreen.hideAsync();
    } else {
      console.log("⏳ Fonts not loaded yet, splash still showing...");
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContext>
        <FamilyViewProvider>
          <AppointmentProvider>
            <DrugProvider>
              <RootContent />
            </DrugProvider>
          </AppointmentProvider>
        </FamilyViewProvider>
      </AuthContext>
    </GestureHandlerRootView>
  );
}
