import { SignupData } from "../types/auth";
import { SignupValues } from "./signUpValidation";

export function mapperSignupValues(data: Partial<SignupData>, confirmPassword: string ): SignupValues {
    return {
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        username: data.username ?? "",
        email: data.email ?? "",
        password: data.password ?? "",
        phoneNumber: data.phoneNumber ?? "",
        dateOfBirth: data.dateOfBirth ?? "",
        gender: data.gender ?? "",
        confirmPassword: confirmPassword ?? "",
    };
}
