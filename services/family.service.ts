import { db } from "../config/firebaseConfig";
import { collection, query, where, getDocs, serverTimestamp, addDoc, getDoc, doc, updateDoc, arrayUnion, setDoc, deleteDoc, arrayRemove } from "firebase/firestore";
import { FamilyRequest, FamilyRequestInput } from "@/types/family"
import { sendNotification } from "./notification.service";

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

  const reqRef = await addDoc(collection(db, "familyRequests"), request);

  await sendNotification(toUid, payload.fromUid, "FAMILY_REQUEST", `${payload.displayName} sent you a family request as ${payload.relation}`, { requestId: reqRef.id });
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

export async function deleteFamilyRequest(userUid: string, memberUid: string, relation: string) {
  try {
    const reverseRelation = getReverseRelation(relation);


    const userRef= doc(db, "users", userUid)
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      const newMembers = (data.familyMembers || []).filter((i: any) => i.uid !== memberUid);
      await updateDoc(userRef, { familyMembers: newMembers });
    }

    const memberRef = doc(db, "users", memberUid);
    const memberSnap = await getDoc(memberRef);

    if (memberSnap.exists()) {
      const data = memberSnap.data();
      const newMembers = (data.familyMembers || []).filter((i: any) => i.uid !== userUid);
      await updateDoc(memberRef, { familyMembers: newMembers });
    }

    // await updateDoc(doc(db, "users", userUid), {
    //   familyMembers: arrayRemove({ uid: userUid, relation: reverseRelation })
    // })

    // console.log("debug 1: ", uid)

    // await updateDoc(doc(db, "users", memberUid), {
    //   familyMembers: arrayRemove({ uid: userUid, relation: reverseRelation })
    // })

    const q = query(collection(db, "familyRequests"), where("fromUid", "in", [userUid, memberUid]), where("toUid", "in", [userUid, memberUid]), where("status", "==", "accepted"));
    const snap = await getDocs(q);
    // console.log("await dis nuts")
    for (let i = 0; i < snap.docs.length; i++){
      const docSnap = snap.docs[i];
      await deleteDoc(doc(db, "familyRequests", docSnap.id))
    }

    return { success: true };
  } catch (error) {
    throw error;
  }
}