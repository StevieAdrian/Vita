import { styles } from "@/styles/hcd/titleBack.style";
import { TitleBackProps } from "@/types/titlenav";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function TitleBack({ title, onPress }: TitleBackProps) {
  const router = useRouter();
  const handlePress = onPress || (() => {
    console.log("debug 1");
    if (router.canGoBack()) {
      console.log("debug 2");
      router.back();
    } else {
      console.log("debug 3");
      router.push("/"); 
    }
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handlePress}>
        <Image
          source={require("@/assets/utilsIcon/arrow-left.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}