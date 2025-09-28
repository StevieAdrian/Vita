import { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { useAuthState } from "../hooks/useAuthState";
import { FamilyMember } from "../types/family"

export function useFamilyMembers() {
  const { user } = useAuthState();
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(doc(db, "users", user.uid), async (snap) => {
      const data = snap.data();
      const rawMembers: { uid: string; relation: string }[] =
        data?.familyMembers || [];

      const enriched = await Promise.all(
        rawMembers.map(async (m) => {
          const memberDoc = await getDoc(doc(db, "users", m.uid));
          const memberData = memberDoc.exists() ? memberDoc.data() : {};
          return {
            uid: m.uid,
            relation: m.relation,
            displayName:
              (memberData?.firstName || "") +
              " " +
              (memberData?.lastName || ""),
            avatarUrl: memberData?.avatarUrl || "",
          };
        })
      );

      setMembers(enriched);
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  return { members, loading };
}
