export const HEALTH_RECOMMENDATION_PROMPT = (futureHealth: any) => `
    User's health summary:
    - Heart Health: ${futureHealth?.heartHealth}
    - Metabolism: ${futureHealth?.metabolism}
    - Hypertension: ${futureHealth?.hypertension}
    - Hypotension: ${futureHealth?.hypotension}

    Give 2-3 concise, actionable lifestyle tips. 
    Each tip must be a bullet point and MAX 12 words.
    NO extra explanation. NO introduction.
    DONT use '-' as well in the front of the point.
`;