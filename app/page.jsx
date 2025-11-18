"use client";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRoast() {
    setLoading(true);
    setRoast("");

    const res = await fetch("/api/roast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, topic }),
    });

    const data = await res.json();
    setRoast(data.output || "No roast found.");
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-yellow-200 flex justify-center items-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-xl w-full border-[6px] border-black cartoon-box">
        <h1 className="text-5xl font-extrabold text-center mb-4 tracking-wide meme-font">
           ROAST ME AI
        </h1>

        <div className="flex justify-center mb-6">
          <div className="animate-bounce text-3xl">🎤</div>
        </div>

        <div className="flex flex-col gap-4 text-lg">
          <input
            type="text"
            placeholder="Enter your name..."
            className="border-4 border-black rounded-xl p-3 focus:outline-none cartoon-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter the roast topic..."
            className="border-4 border-black rounded-xl p-3 focus:outline-none cartoon-input"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <button
            onClick={handleRoast}
            disabled={loading}
            className="bg-red-500 text-white py-3 rounded-xl font-extrabold text-xl border-4 border-black hover:bg-red-600 active:scale-95 transition-all shadow-lg relative"
          >
            {loading ? "Cooking roast..." : "Roast Me!"}

            <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 flex gap-1">
              <span className="animate-pulse">🔥</span>
              <span className="animate-bounce">🔥</span>
              <span className="animate-pulse">🔥</span>
            </div>
          </button>
        </div>

        {roast && (
          <div className="mt-8 bg-white border-4 border-black rounded-2xl p-6 text-xl font-bold cartoon-box animate-pop">
            {roast} 
          </div>
        )}
      </div>
    </div>
  );
}
