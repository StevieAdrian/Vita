import TitleBack from "@/components/TitleBack";
import PrimaryButtonColorForm from "@/components/utils/PrimaryButtonColorForm";
import { NAV_ITEMS } from "@/styles/bottom-nav.styles";
import { styles } from "@/styles/hcd/editDiary.style";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function editDiary() {
  const [hasInput, setHasInput] = useState(false);
  const insets = useSafeAreaInsets();
  const handleInputChange = (text: string) => {
    setHasInput(text.trim().length > 0);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: NAV_ITEMS + insets.bottom + 16 },
        ]}
      >
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
              <TitleBack title="Edit Diary" />
            </View>

            {/* Content */}
            <View style={styles.formContainer}>
              <View style={styles.formHeaderContainer}>
                <Text style={styles.titleForm}>Edit Your Health Diary</Text>
                <TouchableOpacity>
                  <Image
                    source={require("@/assets/utilsIcon/delete.png")}
                    style={{ width: 25, height: 25 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.divider} />

              {/* Form */}
              <View style={styles.containerForm}>
                {/* Symptoms */}
                <View style={styles.containerInput}>
                  <View style={styles.flexInput}>
                    <Image
                      source={require("@/assets/hcd/symptoms.svg")}
                      style={{ width: 25, height: 25 }}
                      resizeMode="contain"
                    />
                    <Text style={styles.textTitle}>Symptoms</Text>
                  </View>
                  <TextInput
                    style={styles.descInput}
                    placeholder="Describe any symptoms....."
                    placeholderTextColor="#828282"
                    multiline
                    onChangeText={handleInputChange}
                  />
                </View>
                {/* Mood */}
                <View style={styles.containerInput}>
                  <View style={styles.flexInput}>
                    <Image
                      source={require("@/assets/hcd/mood.svg")}
                      style={{ width: 25, height: 25 }}
                      resizeMode="contain"
                    />
                    <Text style={styles.textTitle}>Mood</Text>
                  </View>
                  <TextInput
                    style={styles.descInput}
                    placeholder="Describe your mood....."
                    placeholderTextColor="#828282"
                    multiline
                    onChangeText={handleInputChange}
                  />
                </View>
                {/* Physical Activities */}
                <View style={styles.containerInput}>
                  <View style={styles.flexInput}>
                    <Image
                      source={require("@/assets/hcd/physicalAct.svg")}
                      style={{ width: 25, height: 25 }}
                      resizeMode="contain"
                    />
                    <Text style={styles.textTitle}>Physical Activities</Text>
                  </View>
                  <TextInput
                    style={styles.descInput}
                    placeholder="What's are you doing today?"
                    placeholderTextColor="#828282"
                    multiline
                    onChangeText={handleInputChange}
                  />
                </View>
                {/* Additional Notes */}
                <View style={styles.containerInput}>
                  <View style={styles.flexInput}>
                    <Image
                      source={require("@/assets/hcd/additionalNotes.svg")}
                      style={{ width: 25, height: 25 }}
                      resizeMode="contain"
                    />
                    <Text style={styles.textTitle}>Additional Notes</Text>
                  </View>
                  <TextInput
                    style={styles.descInput}
                    placeholder="What are you thinking?"
                    placeholderTextColor="#828282"
                    multiline
                    onChangeText={handleInputChange}
                  />
                </View>
              </View>
            </View>
          </View>
          <PrimaryButtonColorForm text="Save Changes" active={hasInput} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
