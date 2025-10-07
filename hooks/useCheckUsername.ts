import { useState } from "react";
import { checkUsernameExists } from "../services/family.service";

export function useCheckUsername() {
  const [isChecking, setIsChecking] = useState(false);
  const [exists, setExists] = useState<null | boolean>(null);

  const verifyUsername = async (username: string) => {
    console.log("Checking username:", username);
    setIsChecking(true);
    try { 
      const user = await checkUsernameExists(username);
       console.log("Result user:", user);
      setExists(!!user);
    } catch (e) {
       console.error("Error checking username:", e);
      setExists(false);
    } finally {
      setIsChecking(false);
    }
  };

  return { exists, isChecking, verifyUsername };
}
