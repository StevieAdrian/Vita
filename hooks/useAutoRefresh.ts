import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export const useAutoRefresh = (refreshFunction: () => void | Promise<void>) => {
  useFocusEffect(
    useCallback(() => {
      refreshFunction();
    }, [refreshFunction])
  );
};
