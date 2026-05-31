import { createServerFn } from "@tanstack/react-start";

type ChatMsg = { role: "system" | "user" | "assistant"; content: string };

export const chatWithAI = createServerFn({ method: "POST" })
  .inputValidator((data: { messages: ChatMsg[] }) => {
    if (!data || !Array.isArray(data.messages)) throw new Error("Invalid input");
    return data;
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

    const system: ChatMsg = {
      role: "system",
      content:
        "You are the friendly AI assistant for Smart Tech Buy Advisor, a Prolog-powered website that recommends laptops and mobiles. You can answer ANY question the user asks — general knowledge, tech specs, buying advice, comparisons, study help, casual chat, anything. Be concise, helpful, and friendly. Reply in the same language the user uses (English, Urdu, Roman Urdu, Arabic, etc.). When relevant, mention site features: Advisor (Prolog questionnaire), Compare, Browse, Career advisor, Stores (location-based).",
    };

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [system, ...data.messages],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
      if (res.status === 402) throw new Error("AI credits exhausted. Please add credits in Settings → Workspace → Usage.");
      throw new Error(`AI error: ${res.status} ${text.slice(0, 200)}`);
    }

    const json = await res.json();
    const reply: string = json?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
    return { reply };
  });
