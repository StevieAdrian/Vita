import { Relation } from "@/constants/relations";

export interface EmergencyValues {
  name: string;
  phoneNumber: string;
  relation: Relation | "";
}

export type ValidationErrors = Partial<Record<keyof EmergencyValues, string>>;

export const validateField = (
  field: keyof EmergencyValues,
  value: string,
  values: EmergencyValues
): string => {
  switch (field) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (value.length <= 3) return "Name must be at least 3 characters";
      if (!/^[a-zA-Z\s]+$/.test(value)) return "Name must only contain letters";
      break;

    case "phoneNumber":
      if (!value) return "Phone number is required";
      if (!/^\d{10,15}$/.test(value))
        return "Phone number must be 10-15 digits";
      if (!/^08\d{8,13}$/.test(value)) return "Phone number must start with 08";
      break;

    case "relation":
      if (!value) return "Relation is required";
      break;
  }
  return "";
};

export const validateForm = (values: EmergencyValues): ValidationErrors => {
  const errors: ValidationErrors = {};
  (Object.keys(values) as (keyof EmergencyValues)[]).forEach((field) => {
    const error = validateField(field, values[field] as string, values);
    if (error) errors[field] = error;
  });
  return errors;
};
