import React, { useState } from 'react';
import { Cpu, Globe, Shield, Zap, Code2, Database, GitBranch, Layers, Users, BarChart3, Rocket, CheckCircle, ArrowRight, X } from 'lucide-react';

const features = [
  { icon: Cpu,       title: 'Frontier AI Models',    desc: 'Access Claude Opus 4, GPT-4o, Gemini Ultra. Always use the latest and most capable models.' },
  { icon: Rocket,    title: 'One-Click Deploy',       desc: 'Go from prototype to production in seconds. Global CDN, SSL, and custom domains included.' },
  { icon: Database,  title: 'Built-in Database',      desc: 'Every app gets a managed PostgreSQL database. No configuration required.' },
  { icon: Shield,    title: 'Auth & Security',        desc: 'User authentication, role-based access, and OAuth out of the box. SOC 2 compliant.' },
  { icon: GitBranch, title: 'GitHub Sync',            desc: 'Export your generated code to GitHub. Full ownership, no lock-in.' },
  { icon: Globe,     title: 'Global Edge Network',    desc: 'Apps served from 47+ edge locations worldwide. <50ms response times globally.' },
  { icon: BarChart3, title: 'Analytics Built-in',     desc: 'Real-time usage metrics, error tracking, and performance monitoring for every app.' },
  { icon: Users,     title: 'Team Collaboration',     desc: 'Shared workspaces, version history, comments, and role management for teams.' },
  { icon: Code2,     title: 'Full Code Export',       desc: 'Every app is real, clean code. Export and run anywhere — no platform lock-in.' },
];

const useCases = [
  { label: 'Internal Tools', icon: '🔧', count: '23k+ built' },
  { label: 'CRM & Sales',    icon: '💼', count: '18k+ built' },
  { label: 'AI Assistants',  icon: '🤖', count: '45k+ built' },
  { label: 'Analytics',      icon: '📊', count: '12k+ built' },
  { label: 'Marketplaces',   icon: '🛒', count: '8k+ built'  },
  { label: 'Landing Pages',  icon: '🚀', count: '67k+ built' },
];

const traditionalItems = [
  'Set up dev environment (2+ hours)',
  'Configure backend, auth, database',
  'Write boilerplate code',
  'Debug build tooling issues',
  'Configure deployment pipeline',
  'Set up monitoring and logging',
];

const oneAtlasItems = [
  'Describe your app in plain English',
  'AI generates full-stack code instantly',
  'Auth, database, APIs auto-configured',
  'Preview in browser immediately',
  'Deploy with one click',
  'Analytics and monitoring included',
];

export const FeaturesSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="oa-section" style={{ background: '#F5F5EE' }}>
      <div className="oa-container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="oa-label mb-4">Everything you need</p>
          <h2 className="oa-section-heading mb-5">
            Built for the future of<br />app development
          </h2>
          <p className="oa-body max-w-xl mx-auto">
            From frontend to backend, database to deployment — OneAtlas handles your entire stack.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 cursor-default transition-all duration-200 oa-card-hover"
              >
                <div className="feature-icon mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="oa-card-heading mb-2" style={{ fontSize: '16px' }}>{feature.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Use Cases */}
        <div className="mb-20">
          <h3 className="text-center text-2xl font-bold text-[#111111] mb-10 tracking-tight">
            What are people building?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-5 text-center cursor-pointer oa-card-hover transition-all duration-200"
              >
                <div className="text-3xl mb-3">{uc.icon}</div>
                <div className="font-semibold text-[#111111] text-sm mb-1">{uc.label}</div>
                <div className="text-xs text-[#9CA3AF]">{uc.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison */}
        <div className="bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden">
          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-bold text-[#111111] mb-10 text-center tracking-tight">
              OneAtlas vs. Traditional Development
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-center">
                    <span className="text-xl">😤</span>
                  </div>
                  <div>
                    <div className="font-semibold text-[#111111]">Traditional Development</div>
                    <div className="text-sm text-[#9CA3AF]">Weeks to months</div>
                  </div>
                </div>
                {traditionalItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#6B7280]">
                    <X className="w-4 h-4 text-[#F87171] flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* OneAtlas */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF4EE] border border-[#FFD0B0] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#FF6600]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#111111]">With OneAtlas</div>
                    <div className="text-sm text-[#FF6600]">Minutes</div>
                  </div>
                </div>
                {oneAtlasItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#111111]">
                    <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 text-center">
              <a href="/builder" className="btn-primary inline-flex items-center gap-2">
                Start building for free
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
