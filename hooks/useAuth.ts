import { auth } from "@/config/firebaseConfig";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (e) {
      const err = e as FirebaseError;
      alert("Sign in failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (e) {
      const err = e as FirebaseError;
      console.log(err);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      router.push("/auth/login/login");
    } catch (e) {
      const err = e as FirebaseError;
      alert("Logout failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { signIn, signInWithGoogle, loading, logout };
}
