import { db } from "../config/firebaseConfig";
import { collection, query, where, getDocs, serverTimestamp, addDoc, getDoc, doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { FamilyRequest, FamilyRequestInput } from "@/types/family"

export async function checkUsernameExists(username: string) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const snap = await getDocs(q);

  if (snap.empty) return null; 
  return { uid: snap.docs[0].id, ...snap.docs[0].data() };
}

export async function sendFamilyRequest(payload: FamilyRequestInput) {
  const q = query(collection(db, "users"), where("username", "==", payload.toUsername));
  const snap = await getDocs(q);

  if (snap.empty) throw new Error("User not found");

  const toUser = snap.docs[0];
  const toUid = toUser.id;

  const fromUserSnap = await getDoc(doc(db, "users", payload.fromUid));
  const fromUserData = fromUserSnap.exists() ? fromUserSnap.data() : null;
  const avatarUrl = fromUserData?.avatarUrl || "";

  const request: FamilyRequest = {
    fromUid: payload.fromUid,
    toUid,
    relation: payload.relation,
    notes: payload.notes,
    displayName: payload.displayName,
    status: "pending",
    createdAt: serverTimestamp(),
    avatarUrl,
  };

  await addDoc(collection(db, "familyRequests"), request);

  return { success: true, toUid };
}

function getReverseRelation(relation: string) {
  switch (relation) {
    case "Parents": return "Children";
    case "Children": return "Parents";
    case "Guardian": return "Children";
    case "Cousins": return "Cousins";
    case "Sibling": return "Sibling";
    case "Spouse": return "Spouse";
    default: return relation;
  }
}

export async function acceptFamilyRequest(requestId: string, fromUid: string, toUid: string, relation: string) {
  console.log("ACCEPT REQUEST", { requestId, fromUid, toUid, relation });
  
  await updateDoc(doc(db, "familyRequests", requestId), {
    status: "accepted",
  });

  await setDoc(
    doc(db, "users", toUid),
    {
      familyMembers: arrayUnion({ uid: fromUid, relation }),
    },
    { merge: true }
  );
  console.log("debug toUid");

  const reverseRelation = getReverseRelation(relation);

  await setDoc(
    doc(db, "users", fromUid),
    {
      familyMembers: arrayUnion({ uid: toUid, relation: reverseRelation }),
    },
    { merge: true }
  );
  console.log("debug fromU");

  return { success: true };
}

export async function declineFamilyRequest(requestId: string) {
  await updateDoc(doc(db, "familyRequests", requestId), {
    status: "declined",
  });
  return { success: true };
}
