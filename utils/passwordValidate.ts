import { ChangePasswordValues } from "../types/auth"

export const validatePasswordField = ( field: keyof ChangePasswordValues, value: string, values: ChangePasswordValues): string => {
  try {
    switch (field) {
        case "oldPassword":
          if (!value.trim()) return "Current password is required";
          break;

        case "newPassword":
          if (!value.trim()) return "New password is required";
          if (value.length < 6) return "Password must be at least 6 characters";
          break;

        case "confirmNewPassword":
          if (!value.trim()) return "Confirm password is required";
          if (value !== values.newPassword) return "Passwords do not match";
          break;
    }

    return "";
  } catch (err) {
    throw err;
  }
};
