import React, { createContext, useContext, useMemo, useState } from "react";
import { SignupData } from "@/types/auth";

type PartialSignup = Partial<SignupData>;

interface SignupCtx {
    data: PartialSignup;
    setField: <K extends keyof SignupData>(key: K, value: SignupData[K]) => void;
    setMany: (patch: PartialSignup) => void;
    reset: () => void;
}

const SignupContext = createContext<SignupCtx | null>(null);

const initialData: PartialSignup = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    allergies: [],
    chronicConditions: [],
    emergencyContacts: [],
};

export function SignupProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<PartialSignup>(initialData);

    const setField: SignupCtx["setField"] = (key, value) => setData(prev => ({ ...prev, [key]: value }));

    const setMany: SignupCtx["setMany"] = (patch) => setData(prev => ({ ...prev, ...patch }));
    const reset = () => setData(initialData);

    const value = useMemo(() => ({ data, setField, setMany, reset }), [data]);
    return <SignupContext.Provider value={value}>{children}</SignupContext.Provider>;
}

export function useSignupContext() {
    const ctx = useContext(SignupContext);
    if (!ctx) throw new Error("useSignupContext must be used within SignupProvider");
    return ctx;
}
