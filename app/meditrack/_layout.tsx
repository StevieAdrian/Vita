import { AppointmentProvider } from "@/context/AppointmentContext";
import { DrugProvider } from "@/context/DrugContext";
import { Stack } from "expo-router";

export default function MeditrackLayout() {
  return (
    <DrugProvider>
      <AppointmentProvider>
        <Stack>
          <Stack.Screen name="mediTrack" options={{ headerShown: false }} />
          <Stack.Screen name="drugForm" options={{ headerShown: false }} />
          <Stack.Screen
            name="appointmentForm"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="allremindercard"
            options={{ headerShown: false }}
          />
        </Stack>
      </AppointmentProvider>
    </DrugProvider>
  );
}
