import TitleBack from "@/components/TitleBack";
import { View } from "react-native";
import { styles } from "@/styles/hcd/createDiary.style";

export default function createDiary() {
  return <View style={styles.container}>
    <TitleBack title="Add Health Diary"/>
  </View>;
}
