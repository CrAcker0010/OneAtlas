import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Zap, Rocket, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Describe your idea',
    description: 'Tell OneAtlas what you want to build in plain English. Be as specific or vague as you want — our AI understands context.',
    icon: MessageSquare,
    details: ['Natural language input', 'Upload screenshots or docs', 'Start from a template'],
    code: `> Build me a SaaS CRM with deal pipeline,
  contact management, and email tracking.

✓ Analyzing requirements...
✓ Choosing optimal stack...
✓ Planning 24 components...`,
  },
  {
    number: '02',
    title: 'Watch it come alive',
    description: 'See your app build in real-time. OneAtlas uses frontier AI models to write production-quality code across your entire stack.',
    icon: Zap,
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
    details: ['One-click deploy', 'Custom domains', 'Zero DevOps required'],
    code: `Deploying to OneAtlas Cloud...
✓ Building for production
✓ Optimizing bundle (94kb)
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
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
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
    <section className="oa-section" style={{ background: '#FFFFFF' }}>
      <div className="oa-container">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="oa-label mb-4">How it works</p>
          <h2 className="oa-section-heading mb-5">
            From idea to app in 3 simple steps
          </h2>
          <p className="oa-body max-w-xl mx-auto">
            No coding knowledge required. Just describe what you want.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left - Step Cards */}
          <div className="space-y-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className="cursor-pointer rounded-2xl border p-6 transition-all duration-300"
                  style={{
                    background: isActive ? '#FFFFFF' : 'transparent',
                    borderColor: isActive ? '#E5E7EB' : 'transparent',
                    boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.04)' : 'none',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: isActive ? '#FFF4EE' : '#F3F4F6', border: `1px solid ${isActive ? '#FFD0B0' : '#E5E7EB'}` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: isActive ? '#FF6600' : '#9CA3AF' }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-mono text-[#9CA3AF]">{step.number}</span>
                        <h3 className="font-semibold text-lg" style={{ color: isActive ? '#111111' : '#6B7280' }}>
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-[#6B7280] text-sm leading-relaxed mb-3">{step.description}</p>
                      {isActive && (
                        <div className="flex flex-wrap gap-3">
                          {step.details.map((d, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs text-[#FF6600]">
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

          {/* Right - Terminal */}
          <div className="relative">
            <div className="bg-[#1E1E1E] rounded-2xl overflow-hidden border border-[#333]">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#2A2A2A] border-b border-[#333]">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                <span className="ml-3 text-[#555] text-xs font-mono">oneatlas ~ build</span>
              </div>
              <div className="p-6" style={{ minHeight: '200px' }}>
                <pre className="text-sm leading-relaxed font-mono whitespace-pre-wrap">
                  {steps[activeStep].code.split('\n').map((line, i) => (
                    <div
                      key={i}
                      className={
                        line.startsWith('✓') ? 'text-[#4ADE80]' :
                        line.startsWith('>') ? 'text-[#FF6600]' :
                        line.startsWith('🚀') ? 'text-[#FBBF24]' :
                        'text-[#9CA3AF]'
                      }
                    >
                      {line}
                    </div>
                  ))}
                </pre>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2 h-4 bg-[#FF6600] rounded-sm" style={{ animation: 'pulse 1.2s ease-in-out infinite' }} />
                </div>
              </div>
              {/* Step indicators */}
              <div className="flex gap-2 px-6 pb-5">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full transition-all duration-500"
                    style={{
                      background: i === activeStep ? '#FF6600' : '#333',
                      flex: i === activeStep ? '1' : '0 0 24px',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#111111] mb-1">
                {i === 3 ? '99.9' : [count0, count1, count2][i]?.toLocaleString() ?? stat.value}
                <span style={{ color: '#FF6600' }} className="text-2xl">{stat.suffix}</span>
              </div>
              <div className="text-[#6B7280] text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};