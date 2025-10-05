import { AppointmentProvider } from "@/context/AppointmentContext";
import { DrugProvider } from "@/context/DrugContext";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function MeditrackLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <DrugProvider>
            <AppointmentProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="mediTrack" />
                <Stack.Screen name="drugForm" />
                <Stack.Screen name="appointmentForm" />
                <Stack.Screen name="allremindercard" />
                <Stack.Screen name="allupcomingappointment" />
                <Stack.Screen name="allhistoryappointment" />
                <Stack.Screen name="alltodayreminder" />
              </Stack>
            </AppointmentProvider>
          </DrugProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
