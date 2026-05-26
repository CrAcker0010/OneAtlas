import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl p-12 text-slate-800 text-center max-w-md w-full border border-slate-200 shadow-xl">
        <div className="text-6xl mb-6">✨</div>
        <h1 className="text-4xl font-bold mb-4">Welcome to OneAtlas</h1>
        <p className="text-slate-500 mb-8">Your AI-generated app is ready to customize</p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setCount(c => c - 1)}
            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-2xl font-bold transition text-slate-700"
          >−</button>
          <span className="text-5xl font-bold w-20 text-center text-slate-800">{count}</span>
          <button
            onClick={() => setCount(c => c + 1)}
            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-2xl font-bold transition text-slate-700"
          >+</button>
        </div>
        <button
          onClick={() => setCount(0)}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition w-full"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
