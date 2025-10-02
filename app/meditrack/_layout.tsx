import { DrugProvider } from "@/context/DrugContext";
import { Stack } from "expo-router";

export default function MeditrackLayout() {
  return (
    <DrugProvider>
      <Stack>
        <Stack.Screen name="mediTrack" options={{ headerShown: false }} />
        <Stack.Screen name="drugForm" options={{ headerShown: false }} />
        <Stack.Screen
          name="AllReminderCard"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </DrugProvider>
  );
}
