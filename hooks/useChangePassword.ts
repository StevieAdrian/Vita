import { auth } from "../config/firebaseConfig";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useState } from "react";

export function useChangePassword() {
  const [loading, setLoading] = useState(false);

  const changePassword = async (oldPassword: string, newPassword: string) => {
    if (!auth.currentUser || !auth.currentUser.email) {
      throw new Error("User not logged in");
    }

    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        oldPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      await updatePassword(auth.currentUser, newPassword);
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading };
}
