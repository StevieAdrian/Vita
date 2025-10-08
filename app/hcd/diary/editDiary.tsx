import ModalError from "@/components/utils/ModalError";
import ModalSuccess from "@/components/utils/ModalSuccess";
import PrimaryButtonColorForm from "@/components/utils/PrimaryButtonColorForm";
import TitleBack from "@/components/utils/TitleBack";
import { useAuthState } from "@/hooks/useAuthState";
import { useHealthDiary } from "@/hooks/useHealthDiary";
import { useUserProfile } from "@/hooks/useUserProfile";
import { styles } from "@/styles/hcd/editDiary.style";
import { NAV_ITEMS } from "@/styles/utils/bottom-nav.styles";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function EditDiary() {
  const [hasInput, setHasInput] = useState(false);
  const insets = useSafeAreaInsets();
  const { user } = useAuthState();
  const uid = user?.uid;
  const { fetchDiariesByDate, updateDiary, deleteDiary } = useHealthDiary();
  const [diary, setDiary] = useState<any>(null);
  const { date } = useLocalSearchParams<{ date?: string }>();
  const { loading } = useUserProfile();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(date);

  useEffect(() => {
    if (!date || !uid) return;
    const load = async () => {
      const res = await fetchDiariesByDate(date, uid);
      if (res.success && res.data?.length > 0) {
        setDiary(res.data[0]);
      }
    };
    load();
  }, [date, uid]);

  const handleSave = async () => {
    if (!diary || !uid) return;
    try {
      const res = await updateDiary(
        diary.id,
        {
          mood: diary.mood,
          symptoms: diary.symptoms,
          activities: diary.activities,
          notes: diary.notes,
        },
        uid
      );

      if (res.success) {
        console.log("Diary updated!");
        setShowSuccess(true);
      } else {
        setErrorMessage("Failed to update diary");
        setShowError(true);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong");
      setShowError(true);
    }
  };

  const handleInputChange = (text: string) => {
    setHasInput(text.trim().length > 0);
  };

  const handleDelete = async () => {
    console.log("Mau Delete");
    console.log(diary);
    if (!diary || !uid) return;
    try {
      const res = await deleteDiary(diary.id, uid);
      if (res.success) {
        setShowSuccess(true);
        router.back();
      } else {
        setErrorMessage("Failed to delete diary");
        setShowError(true);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong");
      setShowError(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#E9F3FF", "#1A73E8"]}
        style={styles.dashboardContainerLinear}
      ></LinearGradient>
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
                <TouchableOpacity onPress={handleDelete}>
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
                    value={diary?.symptoms || ""}
                    onChangeText={(text) => {
                      setDiary((prev: any) => ({ ...prev, symptoms: text }));
                      handleInputChange(text);
                    }}
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
                    value={diary?.mood || ""}
                    onChangeText={(text) => {
                      setDiary((prev: any) => ({ ...prev, mood: text }));
                      handleInputChange(text);
                    }}
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
                    value={diary?.activities || ""}
                    onChangeText={(text) => {
                      setDiary((prev: any) => ({ ...prev, activities: text }));
                      handleInputChange(text);
                    }}
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
                    value={diary?.notes || ""}
                    onChangeText={(text) => {
                      setDiary((prev: any) => ({ ...prev, notes: text }));
                      handleInputChange(text);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <PrimaryButtonColorForm
            text={loading ? "Saving..." : "Save Changes"}
            active={hasInput}
            onPress={handleSave}
          />
          <ModalSuccess
            visible={showSuccess}
            title="Success"
            description="Your diary has been saved successfully."
            buttonText="Continue"
            onClose={() => setShowSuccess(false)}
          />

          <ModalError
            visible={showError}
            title="Error"
            description={errorMessage}
            buttonText="Close"
            onClose={() => setShowError(false)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
