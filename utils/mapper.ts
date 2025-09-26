import { SignupData, UserProfile } from "../types/auth";
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

export function mapperUserProfile(data: Partial<UserProfile>): UserProfile {
    return {
        username: data.username ?? "",
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        email: data.email ?? "",
        phoneNumber: data.phoneNumber ?? "",
        dateOfBirth: data.dateOfBirth ?? "",
        gender: data.gender ?? "",
        bloodType: data.bloodType ?? "",
        hasAllergics:(data.allergies) && data.allergies.length > 0 ? "Yes" : "No",
        allergics: Array.isArray(data.allergies) ? data.allergies.join(", ") : (data.allergics ?? ""),
        allergies: Array.isArray(data.allergies) ? data.allergies : [],
        avatarUrl: data.avatarUrl ?? "",
    };
}