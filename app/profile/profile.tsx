import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./profile.style";
import { useAvatarPicker } from "@/hooks/useAvatarPicker";
import AvatarPicker from "@/components/AvatarPicker";

export default function Profile() {
     const { image, uploading, pickPhoto } = useAvatarPicker();

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <TouchableOpacity style={styles.arrowButton}>
                    <Image source={require("../../assets/images/arrow-left.png")} style={styles.arrowImage}/>
                </TouchableOpacity>
                <Text style={styles.title}>My Profile</Text>
            </View>

            <AvatarPicker imageUrl={image ?? undefined} onChangeImage={() => pickPhoto("gallery")} />
        </View>
    )
}