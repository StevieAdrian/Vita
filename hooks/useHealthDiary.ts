import { useState } from "react";
import {
  addHealthDiary,
  deleteHealthDiary,
  getHealthDiaries,
  getHealthDiariesByDate,
  updateHealthDiary,
} from "../services/diary.service";
import { DiaryEntry } from "../types/diary";
import { useAuthState } from "./useAuthState";

export function useHealthDiary() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthState();
  const uid = user?.uid;

  const addDiary = async (data: DiaryEntry) => {
    setLoading(true);
    try {
      console.log("halo dri hook");
      console.log(data);
      await addHealthDiary({ ...data, fromUid: uid });
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchDiaries = async (uid: string) => {
    setLoading(true);
    try {
      const diaries = await getHealthDiaries(uid);
      return { success: true, data: diaries };
    } catch (err: any) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchDiariesByDate = async (date: any, uid: string) => {
    setLoading(true);
    try {
      const diary = await getHealthDiariesByDate(date, uid);
      return { success: true, data: diary ?? [] };
    } catch (err: any) {
      return { success: false, message: err.message, data: [] };
    } finally {
      setLoading(false);
    }
  };

  const updateDiary = async (
    id: string,
    data: Partial<DiaryEntry>,
    uid: string
  ) => {
    setLoading(true);
    try {
      await updateHealthDiary(id, data, uid);
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteDiary = async (id: string, uid: string) => {
    setLoading(true);
    try {
      console.log("UseHook");
      await deleteHealthDiary(id, uid);
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
