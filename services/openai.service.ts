export async function getAIRecommendation(prompt: string): Promise<string> {
  const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  const orgKey = process.env.EXPO_PUBLIC_OPENAI_ORG_KEY;
  const url = "https://api.openai.com/v1/chat/completions";

  const payload = {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a professional medical assistant. Based on the user's health data, provide 2-3 short, practical lifestyle recommendations to improve their future health. Answer in bullet points."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 300,
    response_format: { type: "text" },
  };

  const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
    };

    if (orgKey) {
        headers["OpenAI-Organization"] = orgKey;
    }

    const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
    });

  if (!res.ok) throw new Error("OpenAI request failed");
  const data = await res.json();

  return data.choices?.[0]?.message?.content?.trim() ?? "";
}
