import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../services/user.service"
import { UserProfile } from "../types/auth";
import { mapperUserProfile } from "../utils/mapper"

export function useUserProfile() {
    const [data, setData] = useState<UserProfile>(mapperUserProfile({}));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
        try {
            const profile = await getUserProfile();
            if (profile) {
                setData({
                ...mapperUserProfile(profile),
                    allergics: Array.isArray(profile.allergies) ? profile.allergies.join(", ") : "",
                });
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        loadProfile();
    }, []);

    const saveProfile = async () => {
        try {
            await updateUserProfile({
                ...data,
                allergies: data.allergics ? data.allergics.split(",").map((a) => a.trim()) : [],
            });
        } catch (err: any) {
            setError(err.message);
        }
    };

    return { data, setData, loading, error, saveProfile };
}
