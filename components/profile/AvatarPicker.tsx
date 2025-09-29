import { COLORS } from "@/constants/colors";
import { AvatarPickerProps } from "@/types/avatar";
import { Ionicons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/profile/avatar.styles";

export default function AvatarPicker({
  imageUrl,
  onChangeImage,
  size = 120,
}: AvatarPickerProps) {
  const choosePhoto = () => {
    onChangeImage?.("");
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={
          imageUrl
            ? { uri: imageUrl }
            : require("@/assets/images/default-avatar.png")
        }
        style={[
          styles.avatar,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      />
      <TouchableOpacity style={styles.cameraButton} onPress={choosePhoto}>
        <Ionicons name="camera" size={size * 0.15} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
}
