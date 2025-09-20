import { Stack } from "expo-router";
import { AuthContext } from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthContext>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthContext>
  );
}
