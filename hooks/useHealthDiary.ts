import { useState } from "react";
import { addHealthDiary, updateHealthDiary } from "../services/diary.service";
import { DiaryEntry } from "../types/diary";

export function useHealthDiary() {
  const [loading, setLoading] = useState(false);

  const addDiary = async (data: DiaryEntry) => {
    setLoading(true);
    try {
      await addHealthDiary(data);
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const editDiary = async (id: string, data: Partial<DiaryEntry>) => {
    setLoading(true);
    try {
      return await updateHealthDiary(id, data);
    } catch (err: any) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { addDiary, loading, editDiary };
}
