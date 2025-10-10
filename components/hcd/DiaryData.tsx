// src/components/hcd/DiaryDetails.tsx
import { COLORS } from "@/constants/colors";
import { styles } from "@/styles/hcd/viewHealthDiary.style";
import { DiaryEntry } from "@/types/diary";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

type DiaryDetailsProps = {
  diaryData: DiaryEntry;
  selectedDateKey: string;
  setSymptoms: (text: string) => void;
  setMood: (text: string) => void;
  setActivities: (text: string) => void;
  setNotes: (text: string) => void;
};

export default function DiaryData({
  diaryData,
  selectedDateKey,
  setSymptoms,
  setMood,
  setActivities,
  setNotes,
}: DiaryDetailsProps) {
  return (
    <View>
      {/* Vital Signs */}
      <TouchableOpacity
        style={styles.containerAllDigitBio}
        onPress={() =>
          router.push({
            pathname: "/profile/digitalBiomarker",
            params: { date: selectedDateKey },
          })
        }
      >
        {/* Judul */}
        <View style={styles.titleHealth}>
          <View style={styles.containerDigit}>
            <View style={styles.containerTitle}>
              <Text style={styles.titleDigitBio}>Vital Signs</Text>
              <Text style={styles.captionDigitBio}>
                Latest update{" "}
                {diaryData?.updatedAt
                  ? (diaryData.updatedAt instanceof Date
                      ? diaryData.updatedAt
                      : diaryData.updatedAt.toDate()
                    ).toLocaleDateString("en-GB") +
                    " " +
                    (diaryData.updatedAt instanceof Date
                      ? diaryData.updatedAt
                      : diaryData.updatedAt.toDate()
                    ).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "-"}
              </Text>
            </View>
          </View>
          <Image
            source={require("@/assets/utilsIcon/arrow-left.png")}
            style={styles.icon}
          />
        </View>

        {/* Kotak Vital Signs */}
        <View style={styles.squaresContainer}>
          <View style={styles.subSquareContainer}>
            {/* Blood Pressure */}
            <View style={styles.containerStatus}>
              <View style={styles.bulletin}></View>
              <View style={styles.captCont1}>
                <Text style={styles.captionNumber}>Blood Pressure</Text>
                <View style={styles.captCont}>
                  <Text style={styles.captionName}>
                    {diaryData?.systolic ?? "-"} / {diaryData?.diastolic ?? "-"}
                  </Text>
                  <Text style={styles.captionNumber}>mmHg</Text>
                </View>
              </View>
            </View>

            {/* Blood Sugar */}
            <View style={styles.containerStatus}>
              <View style={styles.bulletin}></View>
              <View style={styles.captCont1}>
                <Text style={styles.captionNumber}>Blood Sugar</Text>
                <View style={styles.captCont}>
                  <Text style={styles.captionName}>
                    {diaryData?.bloodSugar ?? "-"}
                  </Text>
                  <Text style={styles.captionNumber}>mg/dL</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.subSquareContainer}>
            {/* Heart Rate */}
            <View style={styles.containerStatus}>
              <View style={styles.bulletin}></View>
              <View style={styles.captCont1}>
                <Text style={styles.captionNumber}>Heart Rate</Text>
                <View style={styles.captCont}>
                  <Text style={styles.captionName}>
                    {diaryData?.heartRate ?? "-"}
                  </Text>
                  <Text style={styles.captionNumber}>bpm</Text>
                </View>
              </View>
            </View>

            {/* Weight */}
            <View style={styles.containerStatus}>
              <View style={styles.bulletin}></View>
              <View style={styles.captCont1}>
                <Text style={styles.captionNumber}>Weight</Text>
                <View style={styles.captCont}>
                  <Text style={styles.captionName}>
                    {diaryData?.weight ?? "-"}
                  </Text>
                  <Text style={styles.captionNumber}>kg</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Your Diary */}
      <View>
        <View style={styles.containerReminder}>
          <View style={styles.captionSubtitle}>
            <Text style={styles.subtitle}>Your Diary</Text>
            <TouchableOpacity
              style={styles.subtitleContainerText}
              onPress={() =>
                router.push({
                  pathname: "/hcd/diary/editDiary",
                  params: { date: selectedDateKey },
                })
              }
            >
              <Text style={styles.seeAllContainer}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>
            <View style={styles.containerForm}>
              {/* Symptoms */}
              <View style={styles.containerInput}>
                <View style={styles.flexInput}>
                  <Image
                    source={require("@/assets/hcd/symptoms.png")}
                    style={{ width: 25, height: 25 }}
                    resizeMode="contain"
                  />
                  <Text style={styles.textTitle}>Symptoms</Text>
                </View>
                <TextInput
                  style={[
                    styles.descInput,
                    { backgroundColor: COLORS.primary5th },
                  ]}
                  value={diaryData?.symptoms ?? "-"}
                  onChangeText={setSymptoms}
                  multiline
                />
              </View>

              {/* Mood */}
              <View style={styles.containerInput}>
                <View style={styles.flexInput}>
                  <Image
                    source={require("@/assets/hcd/mood.png")}
                    style={{ width: 25, height: 25 }}
                    resizeMode="contain"
                  />
                  <Text style={styles.textTitle}>Mood</Text>
                </View>
                <TextInput
                  style={[styles.descInput, { backgroundColor: COLORS.red3rd }]}
                  value={diaryData?.mood ?? "-"}
                  onChangeText={setMood}
                  multiline
                />
              </View>

              {/* Physical Activities */}
              <View style={styles.containerInput}>
                <View style={styles.flexInput}>
                  <Image
                    source={require("@/assets/hcd/physicalAct.png")}
                    style={{ width: 25, height: 25 }}
                    resizeMode="contain"
                  />
                  <Text style={styles.textTitle}>Physical Activities</Text>
                </View>
                <TextInput
                  style={[
                    styles.descInput,
                    { backgroundColor: COLORS.secondary5th },
                  ]}
                  value={diaryData?.activities ?? "-"}
                  onChangeText={setActivities}
                  multiline
                />
              </View>

              {/* Additional Notes */}
              <View style={styles.containerInput}>
                <View style={styles.flexInput}>
                  <Image
                    source={require("@/assets/hcd/additionalNotes.png")}
                    style={{ width: 25, height: 25 }}
                    resizeMode="contain"
                  />
                  <Text style={styles.textTitle}>Additional Notes</Text>
                </View>
                <TextInput
                  style={[styles.descInput, { backgroundColor: "#EAEAEA" }]}
                  value={diaryData?.notes ?? "-"}
                  onChangeText={setNotes}
                  multiline
                />
              </View>
            </View>
          </View>

          {/* Latest Update */}
          <View style={styles.LatestContainer}>
            <Text style={styles.latestText}>
              {diaryData?.updatedAt
                ? `Latest update ${(diaryData.updatedAt instanceof Date
                    ? diaryData.updatedAt
                    : diaryData.updatedAt.toDate()
                  ).toLocaleDateString(
                    "en-GB"
                  )} ${(diaryData.updatedAt instanceof Date
                    ? diaryData.updatedAt
                    : diaryData.updatedAt.toDate()
                  ).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
                : "No updates yet"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
