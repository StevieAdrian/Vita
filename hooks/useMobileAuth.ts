import { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { auth, db } from "../config/firebaseConfig";
import { router } from "expo-router";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

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
    throw error;
  }
}

export function useMobileAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    // HANYA mobile clients - NO webClientId
    iosClientId: process.env.EXPO_PUBLIC_FIREBASE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      handleGoogleSignInMobile(response.authentication);
    }
  }, [response]);

  return {
    promptAsync,
    request,
    response
  };
}