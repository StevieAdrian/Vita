import { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, query, where, onSnapshot, DocumentData } from "firebase/firestore";
import { FamilyRequest } from "../types/family";
import { useAuthState } from "../hooks/useAuthState";

export function useIncomingRequests() {
  const { user } = useAuthState();
  const [requests, setRequests] = useState<FamilyRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "familyRequests"),
      where("toUid", "==", user.uid),
      where("status", "==", "pending")
    );

    const unsub = onSnapshot(q, (snap) => {
      const list: FamilyRequest[] = [];
      snap.forEach((doc) =>
        list.push({ id: doc.id, ...(doc.data() as DocumentData) } as FamilyRequest)
      );
      setRequests(list);
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  return { requests, loading };
}