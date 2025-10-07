import { auth, db } from "@/config/firebaseConfig";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";

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
      const result = await signInWithPopup(auth, provider);

      const userEmail = result.user.email;

      if (!userEmail) {
        alert("Email not found from Google account");
        return;
      }

      const userExists = await checkUserExistsInDatabase(userEmail);

      router.push("/auth/loading/loading");

      setTimeout(() => {
        if (userExists) {
          router.push("/");
        } else {
          router.push("/auth/signup/signup_google");
        }
        setLoading(false);
      }, 1000);
    } catch (e) {
      const err = e as FirebaseError;
      console.log(err);
      setLoading(false);
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
