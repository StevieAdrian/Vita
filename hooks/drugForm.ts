import { useState } from "react";
import { DrugReminder } from "../constants/drugs";

const useDrugForm = (initialData?: DrugReminder) => {
  const [name, setName] = useState(initialData?.name || "");
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
      name,
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
    name,
    setName,
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
