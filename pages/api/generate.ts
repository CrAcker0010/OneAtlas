import type { NextApiRequest, NextApiResponse } from 'next';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key', // Fallback to prevent crash on init
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { prompt, model = 'llama3-70b-8192' } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ success: false, error: 'GROQ_API_KEY is not configured in the environment variables.' });
    }

    const systemPrompt = `You are an expert React and Tailwind developer. 
Your task is to generate a complete, standalone, single-file React component based on the user's prompt.
The component MUST:
1. Use standard React hooks (useState, useEffect, etc.) imported from 'react'.
2. Be styled EXCLUSIVELY with Tailwind CSS classes. No custom CSS.
3. Include modern, beautiful UI/UX with smooth transitions and high quality aesthetics.
4. Export the component as default using: \`export default function App() { ... }\`.
5. Include random placeholder data if the app needs to display content.
6. Return ONLY the raw code string. DO NOT include markdown formatting like \`\`\`jsx or any text explanations. Just the raw text code.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      model: model,
      temperature: 0.7,
      max_tokens: 4000,
    });

    let generatedCode = completion.choices[0]?.message?.content || '';
    
    // Safety check: Strip markdown formatting if Groq accidentally includes it
    if (generatedCode.includes('\`\`\`')) {
      const match = generatedCode.match(/\`\`\`[a-z]*\n([\s\S]*?)\`\`\`/);
      if (match && match[1]) {
        generatedCode = match[1];
      } else {
        generatedCode = generatedCode.replace(/^\`\`\`[a-z]*\n/, '').replace(/\`\`\`$/, '');
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        id: `gen_${Date.now()}`,
        prompt,
        model,
        generatedCode,
        createdAt: new Date().toISOString(),
      }
    });
  } catch (error: any) {
    console.error('Generation error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Failed to generate app' });
  }
}