import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/hcd/titleBack.style";
import { TitleBackProps } from "@/types/titlenav";

export default function TitleBack({ title, onPress }: TitleBackProps) {
  const router = useRouter();
  const handlePress = onPress || (() => router.back());

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={require("@/assets/utilsIcon/arrow-left.png")} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
