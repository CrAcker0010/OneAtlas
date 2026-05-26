import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Play, CheckCircle } from 'lucide-react';
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
  const [isTyping, setIsTyping] = useState(true);

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
      setDisplayText((prev) =>
        isDeleting ? prev.slice(0, -1) : currentText.slice(0, prev.length + 1)
      );
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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 hero-glow" />

      {/* Floating Orbs */}
      <div className="orb orb-purple w-96 h-96 -top-20 -left-20" style={{ animationDelay: '0s' }} />
      <div className="orb orb-pink w-80 h-80 top-40 -right-20" style={{ animationDelay: '2s' }} />
      <div className="orb orb-blue w-64 h-64 bottom-40 left-10" style={{ animationDelay: '4s' }} />

      {/* Radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(_transparent_0%,_#0a0a0f_80%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Announcement Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass border border-white/10 text-sm font-medium fade-up">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          {/* <span className="text-green-400">Now with Claude Opus 4</span> */}
          {/* <span className="text-slate-500 mx-1">·</span> */}
          {/* <span className="text-slate-400">Build 10x faster</span> */}
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 fade-up-delay-1">
          <span className="text-white">Build your next</span>
          <br />
          <span className="text-gradient">{displayText}</span>
          <span className="text-gradient animate-pulse">|</span>
          <br />
          <span className="text-white">in minutes</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed fade-up-delay-2">
          OneAtlas transforms your ideas into production-ready apps using frontier AI models. 
          Describe what you want — we build it, you ship it.
        </p>

        {/* Input Form */}
        <form onSubmit={handleGenerate} className="w-full max-w-2xl mx-auto mb-6 fade-up-delay-2">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-500 via-accent-purple to-accent-pink opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative flex items-center bg-dark-100 border border-white/10 rounded-2xl overflow-hidden focus-within:border-primary-500/50 transition-all duration-300 focus-within:shadow-glow">
              <Sparkles className="w-5 h-5 text-primary-400 ml-5 flex-shrink-0" />
              <input
                type="text"
                id="hero-prompt"
                placeholder="Describe what you want to build..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 px-4 py-5 bg-transparent text-white placeholder:text-slate-600 focus:outline-none text-base"
              />
              <button
                type="submit"
                className="m-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-pink text-white font-semibold rounded-xl hover:shadow-glow transition-all flex items-center gap-2 text-sm"
              >
                Build it
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Example Prompts */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 fade-up-delay-3">
          <span className="text-sm text-slate-600 self-center">Try:</span>
          {examplePrompts.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setPrompt(example)}
              className="px-4 py-2 bg-white/5 border border-white/8 rounded-full text-sm text-slate-400 hover:border-primary-500/50 hover:text-primary-400 hover:bg-primary-500/5 transition-all duration-200"
            >
              {example}
            </button>
          ))}
        </div>

        {/* Social Proof */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-16 fade-up-delay-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-dark-100 bg-gradient-to-br from-primary-500 to-accent-pink" style={{ opacity: 0.7 + i * 0.06 }} />
              ))}
            </div>
            <span><strong className="text-white">50,000+</strong> builders</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span><strong className="text-white">200k+</strong> apps built</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xs">★</span>
              ))}
            </div>
            <span><strong className="text-white">4.9/5</strong> rating</span>
          </div>
        </div>

        {/* Hero Screenshot / Preview */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary-500/20 via-accent-pink/10 to-primary-500/20 blur-2xl" />
          <div className="relative glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Mock browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/3 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 mx-4 px-3 py-1 bg-white/5 rounded-md text-xs text-slate-500 text-center font-mono">
                oneatlas.app/dashboard
              </div>
            </div>

            {/* Dashboard preview */}
            <div className="grid grid-cols-4 h-72">
              {/* Sidebar */}
              <div className="col-span-1 border-r border-white/5 p-4 space-y-2">
                <div className="h-4 w-3/4 skeleton rounded mb-4" />
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${i === 0 ? 'bg-primary-500/15 border border-primary-500/20' : ''}`}>
                    <div className={`w-4 h-4 rounded skeleton ${i === 0 ? 'bg-primary-500/40' : ''}`} />
                    <div className={`h-3 w-16 rounded skeleton ${i === 0 ? 'bg-primary-500/20' : ''}`} />
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="col-span-3 p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {['24 Apps', '12k Users', '$48k MRR'].map((stat, i) => (
                    <div key={i} className="bg-white/3 rounded-xl p-4 border border-white/5">
                      <div className="text-white font-bold text-lg">{stat}</div>
                      <div className="h-2 w-2/3 skeleton rounded mt-2" />
                    </div>
                  ))}
                </div>
                <div className="bg-white/3 rounded-xl p-4 border border-white/5 h-28">
                  <div className="h-3 w-1/3 skeleton rounded mb-4" />
                  <div className="flex items-end gap-2 h-16">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `rgba(99,91,255,${0.3 + i * 0.05})` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Ticker */}
      <div className="absolute bottom-0 left-0 right-0 py-4 border-t border-white/5 bg-dark-400/50 backdrop-blur-sm overflow-hidden">
        <div className="ticker-wrapper">
          <div className="ticker-content">
            {[...trustedLogos, ...trustedLogos].map((logo, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-slate-600 text-sm font-medium mx-8">
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};