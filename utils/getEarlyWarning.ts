import { getHealthDiaries } from "../services/healthDiary.service";
import { analyzeEarlyWarning } from "../utils/earlyWarning";

export async function getEarlyWarning(userUid: string) {
    if (!userUid) return { warnings: [] };

    const entries = await getHealthDiaries(userUid);
    const result = analyzeEarlyWarning(entries);
    
    return { warnings: result };
}