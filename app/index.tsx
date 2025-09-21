import { useAuthState } from "@/hooks/useAuthState";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Login from "./auth/login";

const Stack = createNativeStackNavigator();

export default function Index() {
    const { user, initializing } = useAuthState();

    if (initializing) {
        return (
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <>
                    
                    </>
                    ) : (
                    <>
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    </>
                )}
            </Stack.Navigator>
        </GestureHandlerRootView>
    );
}