import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export function useFamilyMemberById(uid?: string | null) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uid) {
      setData(null);
      return;
    }
    setLoading(true);

    getDoc(doc(db, "users", uid))
      .then((snap) => {
        setData(snap.exists() ? { uid: snap.id, ...snap.data() } : null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [uid]);

  return { data, loading };
}
