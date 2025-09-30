import { useState } from "react"
import { useAuthState } from "../hooks/useAuthState";
import { deleteFamilyRequest } from "../services/family.service"

export function useFamilyActions() {
    const { user } = useAuthState();
    const [loading, setLoading] = useState(false);
    
    const removeMember = async (memberUid: string, relation: string) => {
        if (!user) return { success: false, message: "Not logged in."}

        try {
            await deleteFamilyRequest(user.uid, memberUid, relation);       
        } catch (error: any) {
            return { success: error, message: error.message }
        } finally {
            setLoading(false);
        }
    }

    return { removeMember, loading };
}