import { styles } from "@/styles/component/popup-button";
import { Text, TouchableOpacity, View } from "react-native";

export default function PopUpButton() {
  return (
    <View style={styles.triggerContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.titlePopUp}>Confirmation Action</Text>
        <Text style={styles.descPopUp}>Do you want to proceed?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonStyle]}
          onPress={() => console.log("Yes pressed")}
        >
          <Text style={styles.textButton}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.negationButton]}
          onPress={() => console.log("No pressed")}
        >
          <Text style={styles.negationText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
