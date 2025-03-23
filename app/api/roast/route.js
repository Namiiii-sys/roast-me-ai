export async function POST(req) {
    const { name, topic } = await req.json();
  
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Roast ${name} about ${topic} in one line.`,
          },
        ],
      }),
    });
  
    const data = await response.json();
    console.log(data)
    return Response.json(data);
  }
  