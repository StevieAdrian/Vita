import { useState } from "react";
import { checkEmailExists } from "../services/family.service";

export function useCheckEmail() {
  const [isChecking, setIsChecking] = useState(false);
  const [exists, setExists] = useState<null | boolean>(null);

  const verifyEmail = async (email: string) => {
    if (!email) {
      setExists(null);
      return;
    }

    setIsChecking(true);
    try {
      const user = await checkEmailExists(email);
      setExists(!!user);
    } catch (e) {
      setExists(false);
    } finally {
      setIsChecking(false);
    }
  };

  return { exists, isChecking, verifyEmail };
}