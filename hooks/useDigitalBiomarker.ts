import dayjs from "dayjs";
import { useLocalSearchParams } from "expo-router";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { DateType } from "react-native-ui-datepicker";
import { useAuthState } from "../hooks/useAuthState";
import {
  addHealthDiary,
  getHealthDiaries,
  updateHealthDiary,
} from "../services/diary.service";
import { DiaryEntry, DiaryInput } from "../types/diary";

export function useDigitalBiomarker() {
  const { user } = useAuthState();
  const uid = user?.uid;

  const [loading, setLoading] = useState(true);
  const [entryId, setEntryId] = useState<string | null>(null);
  const [form, setForm] = useState<DiaryInput>({
    systolic: "",
    diastolic: "",
    heartRate: "",
    bloodSugar: "",
    weight: "",
    symptoms: "",
    mood: "",
    activities: "",
    notes: "",
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [original, setOriginal] = useState<DiaryInput | null>(null);

  const fetchRecent = async () => {
    if (!uid) return;
    setLoading(true);
    try {
      const all = await getHealthDiaries(uid);

      if (all.length > 0) {
        const sorted = all.sort((a, b) => {
          const da = dayjs(
            a.date instanceof Timestamp ? a.date.toDate() : a.date
          );
          const db = dayjs(
            b.date instanceof Timestamp ? b.date.toDate() : b.date
          );
          return db.valueOf() - da.valueOf();
        });

        const d = sorted[0];
        setEntryId(d.id ?? null);

        const initial: DiaryInput = {
          systolic: d.systolic?.toString() ?? "",
          diastolic: d.diastolic?.toString() ?? "",
          heartRate: d.heartRate?.toString() ?? "",
          bloodSugar: d.bloodSugar?.toString() ?? "",
          weight: d.weight?.toString() ?? "",
          symptoms: d.symptoms ?? "",
          mood: d.mood ?? "",
          activities: d.activities ?? "",
          notes: d.notes ?? "",
        };
        setForm(initial);
        setOriginal(initial);
      } else {
        const empty: DiaryInput = {
          systolic: "",
          diastolic: "",
          heartRate: "",
          bloodSugar: "",
          weight: "",
          symptoms: "",
          mood: "",
          activities: "",
          notes: "",
        };
        setEntryId(null);
        setForm(empty);
        setOriginal(empty);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecent();
  }, [uid]);

  const handleChange = (field: keyof DiaryInput, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (original)
      setHasChanges(JSON.stringify(next) !== JSON.stringify(original));
  };
  const { date } = useLocalSearchParams<{ date?: string }>();
  const [selected, setSelected] = useState<DateType>(
    date ? new Date(date) : new Date()
  );
  const loadBiomarkerByDate = async (dateKey: string) => {
    if (!uid) return;
    setLoading(true);

    function formatDateLocal(date: Date) {
      return dayjs(date).utcOffset(7).format("MMMM D, YYYY");
    }
    dateKey = formatDateLocal(new Date(selected as Date));
    console.log("test");
    console.log(dateKey);
    try {
      const all = await getHealthDiaries(uid);

      const match = all.find((d) => {
        const dKey = formatDateLocal(
          d.date instanceof Timestamp ? d.date.toDate() : new Date(d.date)
        );

        console.log("Comparing:", {
          firestoreDate: dKey,
          selectedDate: dateKey,
        });
        return dKey === dateKey;
      });

      if (match) {
        setEntryId(match.id ?? null);
        const data: DiaryInput = {
          systolic: match.systolic?.toString() ?? "",
          diastolic: match.diastolic?.toString() ?? "",
          heartRate: match.heartRate?.toString() ?? "",
          bloodSugar: match.bloodSugar?.toString() ?? "",
          weight: match.weight?.toString() ?? "",
          symptoms: match.symptoms ?? "",
          mood: match.mood ?? "",
          activities: match.activities ?? "",
          notes: match.notes ?? "",
        };
        setForm(data);
        setOriginal(data);
      } else {
        setEntryId(null);
        setForm({
          systolic: "",
          diastolic: "",
          heartRate: "",
          bloodSugar: "",
          weight: "",
          symptoms: "",
          mood: "",
          activities: "",
          notes: "",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const saveBiomarker = async () => {
    if (!uid) return;

    const numbers = {
      systolic: Number(form.systolic) || 0,
      diastolic: Number(form.diastolic) || 0,
      heartRate: Number(form.heartRate) || 0,
      bloodSugar: Number(form.bloodSugar) || 0,
      weight: Number(form.weight) || 0,
    };

    if (entryId) {
      await updateHealthDiary(
        entryId,
        {
          ...numbers,
          symptoms: form.symptoms,
          mood: form.mood,
          activities: form.activities,
          notes: form.notes,
        },
        uid
      );
    } else {
      const payload: DiaryEntry = {
        fromUid: uid,
        ...numbers,
        symptoms: form.symptoms,
        mood: form.mood,
        activities: form.activities,
        notes: form.notes,
        date: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      };

      await addHealthDiary(payload);
    }

    setHasChanges(false);
    await fetchRecent();
  };

  return {
    form,
    loading,
    hasChanges,
    handleChange,
    saveBiomarker,
    loadBiomarkerByDate,
  };
}
