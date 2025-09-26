import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestore } from "../config/firebaseConfig";
import { SignupData, UserProfile } from "../types/auth";

export async function getUserProfile(): Promise<UserProfile | null> {
    const user = auth.currentUser;
    if (!user) return null;

    const ref = doc(firestore, "users", user.uid);
    const snap = await getDoc(ref);

    return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function updateUserProfile(data: Partial<UserProfile>): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");
    
    const ref = doc(firestore, "users", user.uid);
    await setDoc(
        ref,
        { ...data, updatedAt: serverTimestamp() },
        { merge: true }
    );
}