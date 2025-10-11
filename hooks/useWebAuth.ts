import { auth, db } from "../config/firebaseConfig";
import { router } from "expo-router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

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

export function useWebAuth() {
  const signInWithGoogleWeb = async () => {
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
    }, 1000);
  };

  return {
    signInWithGoogleWeb,
  };
}
