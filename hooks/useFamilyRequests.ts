import { useState } from "react";
import { acceptFamilyRequest, declineFamilyRequest, sendFamilyRequest } from "../services/family.service";
import { FamilyRequest, FamilyRequestInput } from "../types/family";

export function useFamilyRequests() {
  const [loading, setLoading] = useState(false);

  const requestFamily = async (data: FamilyRequestInput) => {
    setLoading(true);
    try {
      await sendFamilyRequest(data);
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const acceptRequest = async (requestId: string, fromUid: string, toUid: string, relation: string) => {
    try {
      await acceptFamilyRequest(requestId, fromUid, toUid, relation);
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };
  
  const declineRequest = async (requestId: string) => {
    try {
      await declineFamilyRequest(requestId);
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };
  
  return { requestFamily, loading, acceptRequest, declineRequest };
}
