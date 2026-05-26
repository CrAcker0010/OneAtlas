import React, { useState, useEffect, useRef } from 'react';
import { Zap, MessageSquare, Rocket, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Describe your idea',
    description: 'Tell OneAtlas what you want to build in plain English. Be as specific or vague as you want — our AI understands context.',
    icon: MessageSquare,
    color: 'from-blue-500 to-cyan-500',
    details: ['Natural language input', 'Upload screenshots or docs', 'Start from a template'],
    code: `> Build me a SaaS CRM with deal pipeline,
  contact management, and email tracking.
  Use a dark theme with purple accents.

✓ Analyzing requirements...
✓ Choosing optimal stack...
✓ Planning 24 components...`,
  },
  {
    number: '02',
    title: 'Watch it come alive',
    description: 'See your app build in real-time. OneAtlas uses frontier AI models to write production-quality code across your entire stack.',
    icon: Zap,
    color: 'from-primary-500 to-accent-purple',
    details: ['Live code generation', 'Full-stack React + API', 'Auto-configured database'],
    code: `Creating components...
✓ App.tsx (layout & routing)
✓ Dashboard.tsx (main view)
✓ DealPipeline.tsx (kanban)
✓ ContactsDB.tsx (CRUD)
✓ api/deals.ts (REST API)
✓ database/schema.sql

Build complete. 847 lines generated.`,
  },
  {
    number: '03',
    title: 'Refine & ship',
    description: 'Iterate with natural language. Deploy to production with one click. Share your app with a custom domain instantly.',
    icon: Rocket,
    color: 'from-accent-pink to-accent-orange',
    details: ['One-click deploy', 'Custom domains', 'Zero DevOps required'],
    code: `Deploying to OneAtlas Cloud...
✓ Building for production
✓ Optimizing bundle size (94kb)
✓ Provisioning database
✓ Configuring CDN (47 regions)
✓ SSL certificate issued

🚀 Live at: mycrm.oneatlas.app`,
  },
];

function useCountUp(target: number, isVisible: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);
  return count;
}

const stats = [
  { label: 'Apps built', value: 200000, suffix: '+' },
  { label: 'Builders worldwide', value: 50000, suffix: '+' },
  { label: 'Deploy time', value: 30, suffix: 's avg' },
  { label: 'Uptime guarantee', value: 99.9, suffix: '%', decimal: true },
];

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const count0 = useCountUp(stats[0].value, statsVisible);
  const count1 = useCountUp(stats[1].value, statsVisible);
  const count2 = useCountUp(stats[2].value, statsVisible);

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="badge mb-6">
            <Zap className="w-4 h-4" />
            How it works
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            From idea to app in{' '}
            <span className="text-gradient">3 simple steps</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            No coding knowledge required. Just describe what you want.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Left - Step Cards */}
          <div className="space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-2xl border p-6 transition-all duration-500 ${
                    isActive
                      ? 'border-primary-500/30 bg-primary-500/5 shadow-glow-sm'
                      : 'border-white/5 hover:border-white/10 glass-light'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${step.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-slate-600">{step.number}</span>
                        <h3 className={`font-bold text-lg transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">{step.description}</p>
                      {isActive && (
                        <div className="flex flex-wrap gap-2">
                          {step.details.map((d, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs text-primary-400">
                              <CheckCircle className="w-3 h-3" />
                              {d}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right - Code Preview */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 to-accent-pink/10 rounded-3xl blur-2xl" />
            <div className="relative terminal">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500/70" />
                <div className="terminal-dot bg-yellow-500/70" />
                <div className="terminal-dot bg-green-500/70" />
                <span className="ml-3 text-slate-500 text-xs font-mono">oneatlas ~ build</span>
              </div>
              <div className="p-6 min-h-48">
                <pre className="text-sm leading-relaxed font-mono whitespace-pre-wrap">
                  {steps[activeStep].code.split('\n').map((line, i) => (
                    <div key={i} className={`${line.startsWith('✓') ? 'text-green-400' : line.startsWith('>') ? 'text-primary-400' : line.startsWith('🚀') ? 'text-yellow-400' : 'text-slate-300'}`}>
                      {line}
                    </div>
                  ))}
                </pre>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2 h-4 bg-primary-500 rounded-sm animate-pulse" />
                </div>
              </div>

              {/* Step Indicators */}
              <div className="flex gap-2 px-6 pb-6">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${i === activeStep ? 'bg-primary-500 flex-1' : 'bg-white/10 w-8'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {i === 3 ? '99.9' : [count0, count1, count2][i]?.toLocaleString() ?? stat.value}
                <span className="text-primary-400 text-2xl">{stat.suffix}</span>
              </div>
              <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};