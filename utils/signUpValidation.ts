const existingUsernames: string[] = ["bryantester"];

export interface SignupValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  username: string;
}

export type ValidationErrors = Partial<Record<keyof SignupValues, string>>;

export const validateField = (
  field: keyof SignupValues,
  value: string,
  values: SignupValues
): string => {
  switch (field) {
    case "firstName":
      if (!value.trim()) return "First name is required";
      if (value.length < 3) return "First name must be at least 3 characters";
      break;

    case "lastName":
      if (!value.trim()) return "Last name is required";
      break;

    case "email":
      if (!value) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
      break;

    case "password":
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      break;

    case "confirmPassword":
      if (!value) return "Confirm password is required";
      if (value !== values.password) return "Passwords do not match";
      break;

    case "phoneNumber":
      if (!value) return "Phone number is required";
      if (!/^08\d{8,13}$/.test(value)) return "Phone number must start with 08";
      break;

    case "dateOfBirth":
      if (!value) return "Date of birth is required";
      break;

    case "gender":
      if (!value) return "Gender is required";
      break;

    case "username":
      if (!value) return "Username is required";
      if (existingUsernames.includes(value.toLowerCase()))
        return "Username is already taken, choose another";
      if (value.length < 3) return "Username must be at least 3 characters";
      break;
  }
  return "";
};
