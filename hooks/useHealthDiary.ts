import { useState } from "react";
import {
  addHealthDiary,
  deleteHealthDiary,
  getHealthDiaries,
  getHealthDiariesByDate,
  updateHealthDiary,
} from "../services/diary.service";
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

  const fetchDiaries = async () => {
    setLoading(true);
    try {
      const diaries = await getHealthDiaries();
      return { success: true, data: diaries };
    } catch (err: any) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchDiariesByDate = async (date: any) => {
    setLoading(true);
    try {
      const diary = await getHealthDiariesByDate(date);
      return { success: true, data: diary ?? [] };
    } catch (err: any) {
      return { success: false, message: err.message, data: [] };
    } finally {
      setLoading(false);
    }
  };

  const updateDiary = async (id: string, data: Partial<DiaryEntry>) => {
    setLoading(true);
    try {
      await updateHealthDiary(id, data);
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteDiary = async (id: string) => {
    setLoading(true);
    try {
      console.log("UseHook");
      await deleteHealthDiary(id);
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    addDiary,
    loading,
    fetchDiaries,
    fetchDiariesByDate,
    updateDiary,
    deleteDiary,
  };
}
