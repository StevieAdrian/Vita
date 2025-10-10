import { auth, db } from "@/config/firebaseConfig";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { Platform } from "react-native";
import { useMobileAuth } from "./useMobileAuth";
import { useWebAuth } from "./useWebAuth";

async function checkUserExistsInDatabase(email: string): Promise<boolean> {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export function useAuth() {
  const [loading, setLoading] = useState(false);

  // Platform-specific auth hooks
  const { promptAsync } = useMobileAuth();
  const { signInWithGoogleWeb } = useWebAuth();

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
    try {
      if (Platform.OS === "web") {
        await signInWithGoogleWeb();
      } else {
        await promptAsync();
      }
    } catch (e) {
      const err = e as FirebaseError;
      console.log(err);
      alert("Google sign in failed");
    } finally {
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

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (err) {
      console.error("Error resetting password:", err);
      return false;
    }
  };

  return {
    signIn,
    signInWithGoogle,
    loading,
    logout,
    resetPassword,
  };
}
