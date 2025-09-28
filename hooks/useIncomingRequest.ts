import { collection, DocumentData, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { useAuthState } from "../hooks/useAuthState";
import { FamilyRequest } from "../types/family";

export function useIncomingRequests() {
  const { user } = useAuthState();
  const [requests, setRequests] = useState<FamilyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

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
      setCount(snap.size); 
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  return { requests, loading, count };
}