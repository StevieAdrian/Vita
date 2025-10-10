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
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

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

async function handleGoogleSignInMobile(authentication: any) {
  try {
    const credential = GoogleAuthProvider.credential(
      authentication.idToken,
      authentication.accessToken
    );

    const result = await signInWithCredential(auth, credential);
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
    }, 1000);
  } catch (error) {
    console.error("Google Sign In Mobile Error:", error);
    alert("Google sign in failed");
  }
}

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      handleGoogleSignInMobile(response.authentication);
    }
  }, [response]);

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
      }
      else {
        await promptAsync();
      }
    } catch (e) {
      const err = e as FirebaseError;
      console.log(err);
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

  return { signIn, signInWithGoogle, loading, logout, resetPassword };
}
