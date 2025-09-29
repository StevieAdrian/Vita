import { useState } from "react";
import { DrugReminder } from "../constants/drugs";

const useDrugForm = (initialData?: DrugReminder) => {
  const [drugName, setdrugName] = useState(initialData?.drugName || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [date, setDate] = useState(initialData?.date || "August 25, 2025");
  const [category, setCategory] = useState(initialData?.category || "");
  const [times, setTimes] = useState<string[]>(initialData?.times || ["12:00"]);
  const [repeatDays, setRepeatDays] = useState<string[]>(
    initialData?.repeatDays || []
  );

  const handleAddReminder = () => {
    const newReminder: DrugReminder = {
      id: initialData?.id || Date.now().toString(),
      drugName,
      description,
      date,
      category,
      times,
      repeatDays,
    };
    return newReminder;
  };

  const handleAddMoreTime = () => {
    setTimes([...times, ""]);
  };

  const handleTimeChange = (text: string, index: number) => {
    const newTimes = [...times];
    newTimes[index] = text;
    setTimes(newTimes);
  };

  return {
    drugName,
    setdrugName,
    description,
    setDescription,
    date,
    setDate,
    category,
    setCategory,
    times,
    setTimes,
    repeatDays,
    setRepeatDays,
    handleAddReminder,
    handleAddMoreTime,
    handleTimeChange,
  };
};

export default useDrugForm;
