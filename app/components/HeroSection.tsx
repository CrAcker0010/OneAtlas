import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const typewriterTexts = [
  'AI sales assistant',
  'CRM dashboard',
  'hiring tracker',
  '3D racing game',
  'analytics platform',
  'chat application',
  'marketplace app',
];

const examplePrompts = ['AI sales assistant', 'Hiring tracker', '3D racing game', 'CRM dashboard'];
const trustedLogos = ['OpenAI', 'Anthropic', 'Stripe', 'Supabase', 'Vercel', 'GitHub', 'Notion', 'Linear', 'Figma', 'AWS'];

export const HeroSection = () => {
  const [prompt, setPrompt] = useState('');
  const [typeIndex, setTypeIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = typewriterTexts[typeIndex];
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 1800);
        return;
      }
      if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setTypeIndex((prev) => (prev + 1) % typewriterTexts.length);
        return;
      }
      setDisplayText((prev) => isDeleting ? prev.slice(0, -1) : currentText.slice(0, prev.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typeIndex]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      window.location.href = `/builder?prompt=${encodeURIComponent(prompt)}`;
    }
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#F5F5EE', paddingTop: '72px' }}
    >
      <div className="oa-container w-full text-center" style={{ paddingTop: '80px', paddingBottom: '80px' }}>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-white border border-[#E5E7EB] text-sm font-medium text-[#6B7280] fade-up">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] flex-shrink-0" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
          Now with Claude Opus 4 — Build 10× faster
        </div>

        {/* Headline */}
        <h1 className="oa-hero mb-6 fade-up-delay-1">
          Build your next<br />
          <span style={{ color: '#FF6600' }}>{displayText}</span>
          <span style={{ color: '#FF6600', opacity: 0.6 }}>|</span>
          <br />
          in minutes.
        </h1>

        {/* Subheadline */}
        <p className="oa-body max-w-2xl mx-auto mb-10 fade-up-delay-2" style={{ color: '#6B7280' }}>
          OneAtlas transforms your ideas into production-ready apps using frontier AI models.
          Describe what you want — we build it, you ship it.
        </p>

        {/* Prompt Box */}
        <form onSubmit={handleGenerate} className="w-full max-w-2xl mx-auto mb-6 fade-up-delay-2">
          <div className="prompt-box flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#FF6600] flex-shrink-0" />
            <input
              type="text"
              id="hero-prompt"
              placeholder="Describe what you want to build..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 bg-transparent text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none text-base"
              style={{ fontFamily: 'inherit' }}
            />
            <button type="submit" className="btn-primary flex-shrink-0" style={{ height: '42px', padding: '0 20px', fontSize: '14px' }}>
              Build it
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Example Prompts */}
        <div className="flex flex-wrap justify-center gap-2 mb-14 fade-up-delay-3">
          <span className="text-sm text-[#9CA3AF] self-center">Try:</span>
          {examplePrompts.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setPrompt(example)}
              className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-full text-sm text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#111111] hover:bg-[#FAFAFA] transition-all duration-200"
            >
              {example}
            </button>
          ))}
        </div>

        {/* Social Proof */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-20 fade-up-delay-3">
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#F5F5EE] bg-[#E5E7EB]" style={{ opacity: 0.6 + i * 0.08 }} />
              ))}
            </div>
            <span><strong className="text-[#111111] font-semibold">50,000+</strong> builders</span>
          </div>
          <div className="w-px h-4 bg-[#E5E7EB]" />
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <CheckCircle className="w-4 h-4 text-[#22C55E]" />
            <span><strong className="text-[#111111] font-semibold">200k+</strong> apps built</span>
          </div>
          <div className="w-px h-4 bg-[#E5E7EB]" />
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <span className="text-[#EAB308] text-xs">★★★★★</span>
            <span><strong className="text-[#111111] font-semibold">4.9/5</strong> rating</span>
          </div>
        </div>

        {/* App Preview */}
        <div className="max-w-4xl mx-auto fade-up-delay-3">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03),0_8px_32px_rgba(0,0,0,0.06)]">
            {/* Browser Chrome */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FECACA]" />
                <div className="w-3 h-3 rounded-full bg-[#FEF08A]" />
                <div className="w-3 h-3 rounded-full bg-[#BBF7D0]" />
              </div>
              <div className="flex-1 mx-4 px-3 py-1 bg-white border border-[#E5E7EB] rounded-md text-xs text-[#9CA3AF] text-center font-mono">
                oneatlas.app/dashboard
              </div>
            </div>

            {/* Dashboard preview */}
            <div className="grid grid-cols-4" style={{ height: '260px' }}>
              {/* Sidebar */}
              <div className="col-span-1 border-r border-[#E5E7EB] p-4 space-y-2 bg-white">
                <div className="h-3.5 w-3/4 skeleton rounded mb-5" />
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${i === 0 ? 'bg-[#FFF4EE]' : ''}`}>
                    <div className={`w-4 h-4 rounded skeleton ${i === 0 ? 'bg-[#FF6600]/30' : ''}`} />
                    <div className={`h-2.5 w-14 rounded skeleton ${i === 0 ? 'bg-[#FF6600]/20' : ''}`} />
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="col-span-3 p-6 space-y-4 bg-[#F9FAFB]">
                <div className="grid grid-cols-3 gap-3">
                  {['24 Apps', '12k Users', '$48k MRR'].map((stat) => (
                    <div key={stat} className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
                      <div className="text-[#111111] font-bold text-base">{stat}</div>
                      <div className="h-2 w-2/3 skeleton rounded mt-2" />
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]" style={{ height: '100px' }}>
                  <div className="h-2.5 w-1/4 skeleton rounded mb-4" />
                  <div className="flex items-end gap-1.5" style={{ height: '48px' }}>
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `rgba(255,102,0,${0.2 + i * 0.04})` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Ticker */}
      <div className="w-full py-4 border-t border-[#E5E7EB] bg-white/60 overflow-hidden flex-shrink-0">
        <div className="ticker-wrapper">
          <div className="ticker-content">
            {[...trustedLogos, ...trustedLogos].map((logo, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-[#9CA3AF] text-sm font-medium mx-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D1D5DB]" />
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};