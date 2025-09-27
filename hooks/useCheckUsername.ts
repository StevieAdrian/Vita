import { useState } from "react";
import { checkUsernameExists } from "../services/family.service";

export function useCheckUsername() {
  const [isChecking, setIsChecking] = useState(false);
  const [exists, setExists] = useState<null | boolean>(null);

  const verifyUsername = async (username: string) => {
    setIsChecking(true);
    try {
      const user = await checkUsernameExists(username);
      setExists(!!user);
    } catch (e) {
      setExists(false);
    } finally {
      setIsChecking(false);
    }
  };

  return { exists, isChecking, verifyUsername };
}
