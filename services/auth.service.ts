import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";
import { GoogleSignupData, SignupData } from "../types/auth";

export async function signUpUser(data: SignupData) {
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const uid = userCred.user.uid;
    const { password, ...safeData } = data;

    await setDoc(doc(db, "users", uid), {
      ...safeData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log("✅ Firestore write done:", uid);
    return uid;
  } catch (err: any) {
    console.error("🔥 signUpUser failed:", err.code, err.message);
    throw err;
  }
}


export async function signupGoogleUser(
  firebaseUser: User,
  additionalData: GoogleSignupData
) {
  const uid = firebaseUser.uid;

  const userDoc = await getDoc(doc(db, "users", uid));

  if (userDoc.exists()) {
    return uid;
  }

  await setDoc(doc(db, "users", uid), {
    ...additionalData,
    email: firebaseUser.email,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return uid;
}

export async function loginUser(email: string, password: string) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  return userCred.user;
}

export async function logoutUser() {
  await signOut(auth);
}
