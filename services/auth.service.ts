import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestore } from "../config/firebaseConfig";
import { SignupData } from "../types/auth";

export async function signUpUser(data: SignupData) {
    const userCred = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const uid = userCred.user.uid;

    const { password, ...safeData } = data;

    await setDoc(doc(firestore, "users", uid), {
        ...safeData,
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