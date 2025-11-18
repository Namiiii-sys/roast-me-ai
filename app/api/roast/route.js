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
          "You are a playful roast bot. Roast lightly, witty, safe, and non-offensive.",
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
