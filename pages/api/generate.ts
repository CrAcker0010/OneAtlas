import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, model = 'claude-opus' } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Simulate API call to Claude API
    // In production, this would call the actual Anthropic API
    const mockResponse = {
      id: `gen_${Date.now()}`,
      prompt,
      model,
      generatedCode: `
import React, { useState } from 'react';

export default function GeneratedApp() {
  const [state, setState] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-accent-pink">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-white mb-6">
          ${prompt}
        </h1>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <p className="text-gray-700 mb-6">
            This application was AI-generated from your prompt.
            You can now customize it further or deploy it directly.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-pink text-white font-semibold rounded-lg hover:shadow-lg transition">
            Start Customizing
          </button>
        </div>
      </div>
    </div>
  );
}
      `,
      createdAt: new Date().toISOString(),
      estimatedTokens: Math.floor(Math.random() * 2000 + 500),
    };

    return NextResponse.json({
      success: true,
      data: mockResponse,
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate app' },
      { status: 500 }
    );
  }
}