import { Allergic } from "@/constants/allergic";
import { useState } from "react";

export function useAllergics() {
  const [selectedAllergics, setSelectedAllergics] = useState<Allergic[]>([]);
  const [otherAllergics, setOtherAllergics] = useState<string>("");

  const handleAllergicSelect = (allergic: Allergic) => {
    if (allergic === "There is no Allergics") {
      setSelectedAllergics(
        selectedAllergics.includes(allergic) ? [] : [allergic]
      );
    } else {
      const filteredAllergics = selectedAllergics.filter(
        (item) => item !== "There is no Allergics"
      );

      if (selectedAllergics.includes(allergic)) {
        setSelectedAllergics(
          filteredAllergics.filter((item) => item !== allergic)
        );
      } else {
        setSelectedAllergics([...filteredAllergics, allergic]);
      }
    }
  };

  const isSelected = (allergic: Allergic) =>
    selectedAllergics.includes(allergic);

  const canContinue =
    selectedAllergics.length > 0 || otherAllergics.trim().length > 0;

  const handleContinue = () => {
    const allergicsData = {
      selectedAllergics,
      otherAllergics: otherAllergics.trim(),
    };
    return allergicsData;
  };

  return {
    selectedAllergics,
    otherAllergics,
    setOtherAllergics,
    handleAllergicSelect,
    isSelected,
    canContinue,
    handleContinue,
  };
}
