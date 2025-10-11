import { auth, db } from "@/config/firebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { FirebaseError } from "firebase/app";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

// Initialize WebBrowser for auth session
WebBrowser.maybeCompleteAuthSession();

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

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_FIREBASE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_CLIENT_ID,
  });

  // Handle Google auth response
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;

      if (authentication?.idToken && authentication?.accessToken) {
        const credential = GoogleAuthProvider.credential(
          authentication.idToken,
          authentication.accessToken
        );

        // Process the Firebase sign-in
        handleFirebaseSignIn(credential);
      }
    }
  }, [response]);

  const handleFirebaseSignIn = async (credential: any) => {
    try {
      const userCredential = await signInWithCredential(auth, credential);
      const userEmail = userCredential.user.email;

      if (!userEmail) {
        alert("Email not found from Google account");
        return;
      }

      // PAKAI checkUserExistsInDatabase di sini!
      const userExists = await checkUserExistsInDatabase(userEmail);

      router.push("/auth/loading/loading");

      setTimeout(() => {
        if (userExists) {
          router.push("/");
        } else {
          router.push("/auth/signup/signup_google");
        }
      }, 1000);
    } catch (error) {
      console.error("Firebase sign-in error:", error);
      alert(
        `Authentication failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

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
      // Untuk mobile, trigger the auth prompt
      if (request && promptAsync) {
        await promptAsync();
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert(
        `Google sign-in failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
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
    promptAsync,
  };
}
