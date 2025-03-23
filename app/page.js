'use client';
import { useState } from 'react';

export default function Page() {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [roast, setRoast] = useState('');

  async function handleRoast() {
    const res = await fetch('/api/roast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, topic }),
    });

    const data = await res.json();
    setRoast(data.choices?.[0]?.message?.content || 'No roast found.');
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 my-28">
      <h1 className="text-3xl font-bold mb-6">Roast Me AI</h1>
      <input
        type="text"
        placeholder="Enter your name..."
        className="border-2 border-black rounded p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter topic..."
        className="border-2 border-black rounded p-2"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={handleRoast}
      >
        Roast me!
      </button>

      {roast && (
        <p className="mt-4 bg-gray-100 p-4 rounded shadow">{roast}</p>
      )}
    </div>
  );
}
