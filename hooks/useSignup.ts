    import { User } from "firebase/auth";
    import { useState } from "react";
    import { signUpUser, signupGoogleUser } from "../services/auth.service";
    import { GoogleSignupData, SignupData } from "../types/auth";

    export function useSignup() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signup = async (data: SignupData) => {
        setLoading(true);
        setError(null);

        try {
        const uid = await signUpUser(data);
        return uid;
        } catch (e: any) {
        setError(e.message);
        throw e;
        } finally {
        setLoading(false);
        }
    };

    const signupWithGoogle = async (
        firebaseUser: User,
        data: GoogleSignupData
    ) => {
        setLoading(true);
        setError(null);

        try {
        const uid = await signupGoogleUser(firebaseUser, data);
        return uid;
        } catch (e: any) {
        setError(e.message);
        throw e;
        } finally {
        setLoading(false);
        }
    };

    return {
        signup,
        signupWithGoogle,
        loading,
        error,
    };
    }
