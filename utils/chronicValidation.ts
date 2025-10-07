import { Chronic } from "@/constants/chronic";
import { useState } from "react";

export const useChronic = () => {
  const [selectedConditions, setSelectedConditions] = useState<Chronic[]>([]);
  const [otherCondition, setOtherCondition] = useState("");

  const handleConditionSelect = (condition: Chronic) => {
    if (condition === "There is no chronic situation") {
      setSelectedConditions(
        selectedConditions.includes(condition) ? [] : [condition]
      );
    } else {
      const filteredConditions = selectedConditions.filter(
        (item) => item !== "There is no chronic situation"
      );

      if (selectedConditions.includes(condition)) {
        setSelectedConditions(
          filteredConditions.filter((item) => item !== condition)
        );
      } else {
        setSelectedConditions([...filteredConditions, condition]);
      }
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
    selectedConditions,
    otherCondition,
    setOtherCondition,
    handleConditionSelect,
    isSelected,
    canContinue,
    handleContinue,
  };
};
