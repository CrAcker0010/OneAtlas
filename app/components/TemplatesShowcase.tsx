import React, { useState } from 'react';
import { Heart, Eye, ArrowRight, Star, Zap } from 'lucide-react';

const templates = [
  {
    id: 1,
    name: 'AI CRM Platform',
    category: 'Business',
    gradient: 'from-blue-500/20 to-cyan-500/10',
    accent: '#3b82f6',
    rating: 4.8,
    uses: 2400,
    buildTime: '~2 min',
    desc: 'Full CRM with deal pipeline, contact management, and AI-powered email tracking',
    tags: ['React', 'AI', 'Database'],
    preview: [
      { type: 'header', label: 'Dashboard' },
      { type: 'stats', values: ['124 Leads', '$48k MRR', '89% Close'] },
      { type: 'chart' },
    ],
  },
  {
    id: 2,
    name: 'Content Studio',
    category: 'Media',
    gradient: 'from-purple-500/20 to-pink-500/10',
    accent: '#8b5cf6',
    rating: 4.9,
    uses: 1890,
    buildTime: '~3 min',
    desc: 'AI-powered content generation, scheduling, and multi-platform publishing hub',
    tags: ['AI', 'CMS', 'API'],
    preview: null,
  },
  {
    id: 3,
    name: 'Task Dashboard',
    category: 'Productivity',
    gradient: 'from-green-500/20 to-emerald-500/10',
    accent: '#10b981',
    rating: 4.7,
    uses: 3200,
    buildTime: '~1 min',
    desc: 'Kanban boards, sprints, team workload tracking with AI task prioritization',
    tags: ['Kanban', 'Real-time', 'Teams'],
    preview: null,
  },
  {
    id: 4,
    name: 'Analytics Hub',
    category: 'Analytics',
    gradient: 'from-orange-500/20 to-red-500/10',
    accent: '#f97316',
    rating: 4.9,
    uses: 1650,
    buildTime: '~2 min',
    desc: 'Real-time business intelligence with custom dashboards and AI-generated insights',
    tags: ['Charts', 'AI', 'Reports'],
    preview: null,
  },
  {
    id: 5,
    name: 'AI Chat Platform',
    category: 'AI Apps',
    gradient: 'from-primary-500/20 to-accent-purple/10',
    accent: '#635bff',
    rating: 5.0,
    uses: 4100,
    buildTime: '~1 min',
    desc: 'GPT-powered chat assistant with custom knowledge base, multi-model support',
    tags: ['ChatGPT', 'RAG', 'Streaming'],
    preview: null,
  },
  {
    id: 6,
    name: 'E-Commerce Store',
    category: 'Commerce',
    gradient: 'from-yellow-500/20 to-orange-500/10',
    accent: '#eab308',
    rating: 4.8,
    uses: 2900,
    buildTime: '~4 min',
    desc: 'Full-stack store with inventory management, payments via Stripe, and admin panel',
    tags: ['Stripe', 'Inventory', 'Admin'],
    preview: null,
  },
  {
    id: 7,
    name: 'Hiring Tracker',
    category: 'Business',
    gradient: 'from-teal-500/20 to-cyan-500/10',
    accent: '#14b8a6',
    rating: 4.6,
    uses: 1200,
    buildTime: '~2 min',
    desc: 'ATS system with candidate pipeline, interview scheduling, and offer management',
    tags: ['ATS', 'Calendar', 'Email'],
    preview: null,
  },
  {
    id: 8,
    name: 'Invoice Manager',
    category: 'Finance',
    gradient: 'from-pink-500/20 to-rose-500/10',
    accent: '#ec4899',
    rating: 4.7,
    uses: 1800,
    buildTime: '~2 min',
    desc: 'Professional invoicing with recurring billing, payment tracking, and PDF export',
    tags: ['Finance', 'PDF', 'Payments'],
    preview: null,
  },
];

const categories = ['All Templates', 'Business', 'AI Apps', 'Productivity', 'Analytics', 'Commerce', 'Finance', 'Media'];

export const TemplatesShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('All Templates');
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const filtered = activeCategory === 'All Templates'
    ? templates
    : templates.filter(t => t.category === activeCategory);

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="badge mb-4">
              <Zap className="w-4 h-4" />
              Templates
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Start from a template
            </h2>
            <p className="text-slate-400 text-xl">
              Battle-tested apps, ready to customize and deploy
            </p>
          </div>
          <a href="/templates" className="flex items-center gap-2 text-primary-400 font-semibold hover:text-primary-300 transition group mt-6 md:mt-0">
            Browse all 200+
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-6 mb-10 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 text-sm font-medium flex-shrink-0 ${
                cat === activeCategory
                  ? 'bg-primary-500 text-white shadow-glow-sm'
                  : 'glass-light border border-white/5 text-slate-400 hover:text-white hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {filtered.map((template) => (
            <div
              key={template.id}
              className="glass-card rounded-2xl border border-white/5 overflow-hidden card-hover group"
            >
              {/* Preview Area */}
              <div className={`h-44 bg-gradient-to-br ${template.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 p-4">
                  {/* Mock UI */}
                  <div className="bg-dark-300/80 rounded-xl p-3 h-full border border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: template.accent }} />
                      <div className="h-2 w-20 skeleton rounded" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-8 rounded-lg glass-light border border-white/5 flex items-center justify-center">
                          <div className="h-1.5 w-8 skeleton rounded" />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-6 rounded-lg glass-light border border-white/5" style={{ width: `${60 + i * 15}%` }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-medium glass border border-white/10" style={{ color: template.accent }}>
                  {template.category}
                </div>

                {/* Like button */}
                <button
                  className="absolute top-3 right-3 p-2 glass rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition"
                  onClick={() => setLiked(prev => {
                    const next = new Set(prev);
                    next.has(template.id) ? next.delete(template.id) : next.add(template.id);
                    return next;
                  })}
                >
                  <Heart className={`w-3.5 h-3.5 transition ${liked.has(template.id) ? 'fill-pink-500 text-pink-500' : 'text-white'}`} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-white text-sm">{template.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3 h-3 fill-yellow-400" />
                    <span className="text-xs text-slate-400">{template.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">{template.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {template.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white/5 rounded-md text-xs text-slate-400 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats + Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">
                    <Eye className="w-3 h-3 inline mr-1" />
                    {template.uses.toLocaleString()} uses
                  </span>
                  <a
                    href={`/builder?template=${template.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{ background: `${template.accent}20`, color: template.accent, border: `1px solid ${template.accent}30` }}
                  >
                    <Zap className="w-3 h-3" />
                    Use template
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Banner */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-purple to-accent-pink" />
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="relative grid md:grid-cols-5 gap-8 p-12 items-center">
            <div className="md:col-span-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                Custom Build
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Don't see what you need?
              </h3>
              <p className="text-white/70 text-lg mb-8 max-w-lg">
                Build any app from scratch with AI. Just describe what you want — no template needed.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/builder" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-bold rounded-xl hover:shadow-2xl transition">
                  Start from scratch
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/templates" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition border border-white/20">
                  View all templates
                </a>
              </div>
            </div>
            <div className="md:col-span-2 flex items-center justify-center">
              <div className="relative">
                <div className="w-48 h-48 rounded-3xl bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center animate-float">
                  <div className="text-center">
                    <div className="text-6xl mb-2">🚀</div>
                    <div className="text-white font-bold">Your App</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center animate-float-delay">
                  <span className="text-2xl">⚡</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};