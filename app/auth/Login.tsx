import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "./login.styles";

export default function Login({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/welcome-logo.png")}
        style={styles.welcomeImage}
      />

      <View style={styles.boxContainer}>
        <Text style={styles.label}>
          Email <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.innerContainer}>
          <TextInput
            placeholder="johndoe@gmail.com"
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>
          Password <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.innerContainer}>
          <TextInput
            placeholder="********"
            secureTextEntry
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueText}>Log in</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Haven't create an account?{" "}
          <Text style={styles.signupLink}>Sign Up</Text>
        </Text>
      </View>
      <View style={styles.dividerWrapper}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or Continue With</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity style={styles.googleButton} activeOpacity={0.7}>
        <Image
          source={require("../../assets/images/google.png")}
          style={styles.googleLogo}
        />
      </TouchableOpacity>
    </View>
  );
}
