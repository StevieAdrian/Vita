import { CHRONIC_OPTIONS, Chronic } from "@/constants/chronic";
import { useState } from "react";

export const useChronic = () => {
  const [selectedConditions, setSelectedConditions] = useState<Chronic[]>([]);
  const [otherCondition, setOtherCondition] = useState("");

  const handleConditionSelect = (condition: Chronic) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(
        selectedConditions.filter((item) => item !== condition)
      );
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  const isSelected = (condition: Chronic) =>
    selectedConditions.includes(condition);

  const canContinue =
    selectedConditions.length > 0 || otherCondition.trim().length > 0;

  const handleContinue = () => {
    const chronicData = {
      selectedConditions,
      otherCondition: otherCondition.trim(),
    };
    return chronicData;
  };

  return {
    CHRONIC_OPTIONS,
    selectedConditions,
    otherCondition,
    setOtherCondition,
    handleConditionSelect,
    isSelected,
    canContinue,
    handleContinue,
  };
};
