import { Text, View, Image } from "react-native";
import { styles } from "./Login.styles";

export default function Login({ navigation }: { navigation: any }){
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/images/welcome-logo.png")} style={styles.welcomeImage}/>
        </View>
    )
}