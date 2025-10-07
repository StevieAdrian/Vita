import { styles } from "@/styles/utils/loading.styles";
import { router, usePathname } from "expo-router";
import React, { useEffect } from "react";
import { Animated, Easing, Text, View } from "react-native";

const Loading: React.FC = () => {
  const spinValue = React.useRef(new Animated.Value(0)).current;
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (pathname.includes("/auth/loading")) {
        router.replace("/auth/login/login");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  React.useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinAnimation.start();

    return () => spinAnimation.stop();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../../assets/utilsIcon/loading.png")}
        style={[styles.loadingIcon, { transform: [{ rotate: spin }] }]}
        resizeMode="contain"
      />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

export default Loading;
