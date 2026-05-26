import React, { useState } from 'react';
import { Heart, Eye, ArrowRight, Star, Zap } from 'lucide-react';

const templates = [
  { id: 1, name: 'AI CRM Platform',   category: 'Business',     rating: 4.8, uses: 2400, buildTime: '~2 min', desc: 'Full CRM with deal pipeline, contact management, and AI-powered email tracking', tags: ['React', 'AI', 'Database'] },
  { id: 2, name: 'Content Studio',    category: 'Media',         rating: 4.9, uses: 1890, buildTime: '~3 min', desc: 'AI-powered content generation, scheduling, and multi-platform publishing hub',  tags: ['AI', 'CMS', 'API'] },
  { id: 3, name: 'Task Dashboard',    category: 'Productivity',  rating: 4.7, uses: 3200, buildTime: '~1 min', desc: 'Kanban boards, sprints, team workload tracking with AI task prioritization',    tags: ['Kanban', 'Real-time', 'Teams'] },
  { id: 4, name: 'Analytics Hub',     category: 'Analytics',     rating: 4.9, uses: 1650, buildTime: '~2 min', desc: 'Real-time business intelligence with custom dashboards and AI-generated insights', tags: ['Charts', 'AI', 'Reports'] },
  { id: 5, name: 'AI Chat Platform',  category: 'AI Apps',       rating: 5.0, uses: 4100, buildTime: '~1 min', desc: 'GPT-powered chat assistant with custom knowledge base, multi-model support',      tags: ['ChatGPT', 'RAG', 'Streaming'] },
  { id: 6, name: 'E-Commerce Store',  category: 'Commerce',      rating: 4.8, uses: 2900, buildTime: '~4 min', desc: 'Full-stack store with inventory management, payments via Stripe, and admin panel', tags: ['Stripe', 'Inventory', 'Admin'] },
  { id: 7, name: 'Hiring Tracker',    category: 'Business',      rating: 4.6, uses: 1200, buildTime: '~2 min', desc: 'ATS system with candidate pipeline, interview scheduling, and offer management',   tags: ['ATS', 'Calendar', 'Email'] },
  { id: 8, name: 'Invoice Manager',   category: 'Finance',       rating: 4.7, uses: 1800, buildTime: '~2 min', desc: 'Professional invoicing with recurring billing, payment tracking, and PDF export',   tags: ['Finance', 'PDF', 'Payments'] },
];

// Monochrome emoji previews per category — no colored gradients
const categoryIcons: Record<string, string> = {
  Business: '💼', Media: '✍️', Productivity: '✅', Analytics: '📊',
  'AI Apps': '🤖', Commerce: '🛍️', Finance: '🧾', Default: '⚡',
};

const categories = ['All Templates', 'Business', 'AI Apps', 'Productivity', 'Analytics', 'Commerce', 'Finance', 'Media'];

export const TemplatesShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('All Templates');
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const filtered = activeCategory === 'All Templates'
    ? templates
    : templates.filter(t => t.category === activeCategory);

  return (
    <section className="oa-section" style={{ background: '#FFFFFF' }}>
      <div className="oa-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <p className="oa-label mb-4">Templates</p>
            <h2 className="oa-section-heading mb-4">
              Start from a template
            </h2>
            <p className="oa-body">
              Battle-tested apps, ready to customize and deploy
            </p>
          </div>
          <a href="/templates" className="flex items-center gap-2 text-[#FF6600] font-semibold hover:text-[#E65C00] transition group mt-6 md:mt-0 text-sm">
            Browse all 200+
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10" style={{ scrollbarWidth: 'none' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 text-sm font-medium flex-shrink-0"
              style={{
                background: cat === activeCategory ? '#FF6600' : '#FFFFFF',
                color: cat === activeCategory ? '#FFFFFF' : '#6B7280',
                border: `1px solid ${cat === activeCategory ? '#FF6600' : '#E5E7EB'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {filtered.map((template) => {
            const emoji = categoryIcons[template.category] || categoryIcons.Default;
            return (
              <div
                key={template.id}
                className="bg-white border border-[#ECECEC] rounded-3xl overflow-hidden group transition-all duration-200 oa-card-hover"
              >
                {/* Preview Area — flat bg, no gradient */}
                <div className="relative bg-[#F9FAFB] border-b border-[#ECECEC]" style={{ height: '160px' }}>
                  <div className="absolute inset-0 flex flex-col p-4">
                    {/* Mini mock UI */}
                    <div className="bg-white border border-[#E5E7EB] rounded-xl p-3 flex-1">
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className="w-2 h-2 rounded-full bg-[#FF6600]" />
                        <div className="h-2 w-20 bg-[#F3F4F6] rounded" />
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 mb-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="h-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg" />
                        ))}
                      </div>
                      <div className="space-y-1.5">
                        {[70, 85, 55].map((w, i) => (
                          <div key={i} className="h-2 bg-[#F3F4F6] rounded" style={{ width: `${w}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white border border-[#E5E7EB] rounded-lg text-xs font-medium text-[#6B7280]">
                    {template.category}
                  </div>

                  {/* Like button */}
                  <button
                    className="absolute top-3 right-3 p-1.5 bg-white border border-[#E5E7EB] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setLiked(prev => {
                      const next = new Set(prev);
                      next.has(template.id) ? next.delete(template.id) : next.add(template.id);
                      return next;
                    })}
                  >
                    <Heart className={`w-3.5 h-3.5 transition ${liked.has(template.id) ? 'fill-[#FF6600] text-[#FF6600]' : 'text-[#9CA3AF]'}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[#111111] text-sm">{template.name}</h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="w-3 h-3 fill-[#EAB308] text-[#EAB308]" />
                      <span className="text-xs text-[#6B7280]">{template.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#6B7280] mb-3 line-clamp-2 leading-relaxed">{template.desc}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {template.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-xs text-[#6B7280]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats + Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#9CA3AF] flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {template.uses.toLocaleString()} uses
                    </span>
                    <a
                      href={`/builder?template=${template.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF4EE] text-[#FF6600] border border-[#FFD0B0] rounded-lg text-xs font-semibold hover:bg-[#FFE4CC] transition-colors"
                    >
                      <Zap className="w-3 h-3" />
                      Use template
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner — flat, no gradient */}
        <div className="bg-[#111111] rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-5 gap-8 p-12 items-center">
            <div className="md:col-span-3">
              <p className="oa-label mb-4" style={{ color: '#6B7280' }}>Custom Build</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
                Don't see what you need?
              </h3>
              <p className="text-[#9CA3AF] text-lg mb-8 max-w-lg leading-relaxed">
                Build any app from scratch with AI. Just describe what you want — no template needed.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/builder" className="btn-primary">
                  Start from scratch
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/templates" className="btn-secondary" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.12)' }}>
                  View all templates
                </a>
              </div>
            </div>
            <div className="md:col-span-2 flex items-center justify-center">
              <div className="w-44 h-44 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">🚀</div>
                  <div className="text-white font-semibold text-sm">Your App</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};