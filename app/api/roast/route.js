import Groq from "groq-sdk";

export async function POST(req) {
  const { name, topic } = await req.json();

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are a high-level roast comedian with the brain of a stand-up comic, the energy of a chaotic TikTok creator, and the sarcasm level of a tired gifted kid. Your roasts are creative, clever, surprisingly specific, and FUNNY—not generic. You attack behavior, vibes, personality, habits, chaos—not physical traits or sensitive attributes. No racism, sexism, body shaming, or anything offensive. Make it feel like a dramatic, exaggerated, over-the-top roast. Think meme-like, internet-core humor. Each roast should feel like: 'OUCH, BRO GOT COOKED'. Keep it short, punchy, and iconic."

      },
      {
        role: "user",
        content: `Roast ${name} about ${topic} in one funny line.`,
      },
    ],
  });

  return Response.json({
    output: completion.choices[0].message.content,
  });
}
