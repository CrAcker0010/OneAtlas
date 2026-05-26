import React, { useState } from 'react';
import {
  Cpu, Globe, Shield, Zap, Code2, Database, GitBranch, Layers,
  Users, BarChart3, Rocket, CheckCircle, ArrowRight, X
} from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: 'Frontier AI Models',
    desc: 'Access Claude Opus 4, GPT-4o, Gemini Ultra. Always use the latest and most capable models.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: Rocket,
    title: 'One-Click Deploy',
    desc: 'Go from prototype to production in seconds. Global CDN, SSL, and custom domains included.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
  {
    icon: Database,
    title: 'Built-in Database',
    desc: 'Every app gets a managed PostgreSQL database. No configuration required.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  {
    icon: Shield,
    title: 'Auth & Security',
    desc: 'User authentication, role-based access, and OAuth out of the box. SOC 2 compliant.',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
  {
    icon: GitBranch,
    title: 'GitHub Sync',
    desc: 'Export your generated code to GitHub. Full ownership, no lock-in.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: Globe,
    title: 'Global Edge Network',
    desc: 'Apps served from 47+ edge locations worldwide. <50ms response times globally.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: BarChart3,
    title: 'Analytics Built-in',
    desc: 'Real-time usage metrics, error tracking, and performance monitoring for every app.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    desc: 'Shared workspaces, version history, comments, and role management for teams.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
  {
    icon: Code2,
    title: 'Full Code Export',
    desc: 'Every app is real, clean code. Export and run anywhere — no platform lock-in.',
    color: 'text-primary-400',
    bg: 'bg-primary-500/10',
    border: 'border-primary-500/20',
  },
];

const useCases = [
  { label: 'Internal Tools', icon: '🔧', count: '23k+ built' },
  { label: 'CRM & Sales', icon: '💼', count: '18k+ built' },
  { label: 'AI Assistants', icon: '🤖', count: '45k+ built' },
  { label: 'Analytics', icon: '📊', count: '12k+ built' },
  { label: 'Marketplaces', icon: '🛒', count: '8k+ built' },
  { label: 'Landing Pages', icon: '🚀', count: '67k+ built' },
];

export const FeaturesSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/3 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="badge mb-6 mx-auto w-fit">
            <Layers className="w-4 h-4" />
            Everything you need
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Built for the future of{' '}
            <span className="text-gradient">app development</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            From frontend to backend, database to deployment — OneAtlas handles your entire stack.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                className={`glass-card rounded-2xl border p-6 card-hover cursor-default transition-all duration-300 ${
                  hovered === idx ? 'border-white/15 shadow-card-hover' : 'border-white/5'
                }`}
              >
                <div className={`feature-icon ${feature.bg} border ${feature.border} mb-4`}>
                  <Icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Use Cases Row */}
        <div className="mb-24">
          <h3 className="text-center text-2xl font-bold text-white mb-10">
            What are people building?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="glass-light border border-white/5 rounded-2xl p-5 text-center card-hover cursor-pointer"
              >
                <div className="text-3xl mb-3">{uc.icon}</div>
                <div className="font-semibold text-white text-sm mb-1">{uc.label}</div>
                <div className="text-xs text-slate-500">{uc.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison - OneAtlas vs Traditional */}
        <div className="glass-card rounded-3xl border border-white/8 overflow-hidden">
          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              OneAtlas vs. Traditional Development
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <span className="text-xl">😤</span>
                  </div>
                  <div>
                    <div className="font-bold text-white">Traditional Development</div>
                    <div className="text-sm text-slate-500">Weeks to months</div>
                  </div>
                </div>
                {[
                  'Set up dev environment (2+ hours)',
                  'Configure backend, auth, database',
                  'Write boilerplate code',
                  'Debug build tooling issues',
                  'Configure deployment pipeline',
                  'Set up monitoring and logging',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-500">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* OneAtlas */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <div className="font-bold text-white">With OneAtlas</div>
                    <div className="text-sm text-primary-400">Minutes</div>
                  </div>
                </div>
                {[
                  'Describe your app in plain English',
                  'AI generates full-stack code instantly',
                  'Auth, database, APIs auto-configured',
                  'Preview in browser immediately',
                  'Deploy with one click',
                  'Analytics and monitoring included',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 text-center">
              <a href="/auth/signup" className="btn-primary inline-flex items-center gap-2">
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
