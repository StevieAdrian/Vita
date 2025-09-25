import { bloodType } from "@/constants/bloodType";
import { User } from "firebase/auth";

export interface AuthContextProp {
    user: User | null;
    initializing: boolean;
}

export interface SignupData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber?: string;
    dateOfBirth?: any;
    gender?: string;
    bloodType?: bloodType | "",
    allergies?: string[],
    chronicConditions?: string[],
    emergencyContacts?: EmergencyValues[],
    confirmPassword?: string;
    avatarUrl?: string
}

export interface UserProfile {
    uid: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    createdAt: Date;
}
