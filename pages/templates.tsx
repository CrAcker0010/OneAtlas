import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Eye, Search, Star, Zap, ArrowRight, Grid, List, Filter } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const allTemplates = [
  { id: 1, name: 'AI CRM Platform', category: 'Business', rating: 4.8, uses: 2400, time: '~2 min', desc: 'Full CRM with deal pipeline, contact management, and AI-powered email tracking', tags: ['React', 'AI', 'Database'], gradient: 'from-blue-500/20 to-cyan-500/10', accent: '#3b82f6', icon: '💼', featured: true },
  { id: 2, name: 'Content Studio', category: 'Media', rating: 4.9, uses: 1890, time: '~3 min', desc: 'AI-powered content generation, scheduling, and multi-platform publishing hub', tags: ['AI', 'CMS', 'API'], gradient: 'from-purple-500/20 to-pink-500/10', accent: '#8b5cf6', icon: '✍️', featured: false },
  { id: 3, name: 'Task Dashboard', category: 'Productivity', rating: 4.7, uses: 3200, time: '~1 min', desc: 'Kanban boards, sprints, team workload tracking with AI task prioritization', tags: ['Kanban', 'Real-time', 'Teams'], gradient: 'from-green-500/20 to-emerald-500/10', accent: '#10b981', icon: '✅', featured: false },
  { id: 4, name: 'Analytics Hub', category: 'Analytics', rating: 4.9, uses: 1650, time: '~2 min', desc: 'Real-time business intelligence with custom dashboards and AI-generated insights', tags: ['Charts', 'AI', 'Reports'], gradient: 'from-orange-500/20 to-red-500/10', accent: '#f97316', icon: '📊', featured: false },
  { id: 5, name: 'AI Chat Platform', category: 'AI Apps', rating: 5.0, uses: 4100, time: '~1 min', desc: 'GPT-powered chat assistant with custom knowledge base, multi-model support', tags: ['ChatGPT', 'RAG', 'Streaming'], gradient: 'from-primary-500/20 to-accent-purple/10', accent: '#635bff', icon: '🤖', featured: true },
  { id: 6, name: 'E-Commerce Store', category: 'Commerce', rating: 4.8, uses: 2900, time: '~4 min', desc: 'Full-stack store with inventory management, payments via Stripe, and admin panel', tags: ['Stripe', 'Inventory', 'Admin'], gradient: 'from-yellow-500/20 to-orange-500/10', accent: '#eab308', icon: '🛒', featured: false },
  { id: 7, name: 'Hiring Tracker', category: 'Business', rating: 4.6, uses: 1200, time: '~2 min', desc: 'ATS system with candidate pipeline, interview scheduling, and offer management', tags: ['ATS', 'Calendar', 'Email'], gradient: 'from-teal-500/20 to-cyan-500/10', accent: '#14b8a6', icon: '👥', featured: false },
  { id: 8, name: 'Invoice Manager', category: 'Finance', rating: 4.7, uses: 1800, time: '~2 min', desc: 'Professional invoicing with recurring billing, payment tracking, and PDF export', tags: ['Finance', 'PDF', 'Payments'], gradient: 'from-pink-500/20 to-rose-500/10', accent: '#ec4899', icon: '💰', featured: false },
  { id: 9, name: 'Social Dashboard', category: 'Media', rating: 4.6, uses: 980, time: '~2 min', desc: 'Social media management, scheduling, analytics across all major platforms', tags: ['Social', 'Schedule', 'Analytics'], gradient: 'from-sky-500/20 to-blue-500/10', accent: '#0ea5e9', icon: '📱', featured: false },
  { id: 10, name: 'AI Resume Builder', category: 'Productivity', rating: 4.8, uses: 5600, time: '~1 min', desc: 'Create stunning resumes with AI writing assistance and ATS optimization', tags: ['AI', 'PDF', 'Templates'], gradient: 'from-violet-500/20 to-purple-500/10', accent: '#7c3aed', icon: '📄', featured: true },
  { id: 11, name: 'Event Platform', category: 'Business', rating: 4.5, uses: 720, time: '~3 min', desc: 'Event management, ticketing, registrations, and attendee engagement tools', tags: ['Events', 'Payments', 'CRM'], gradient: 'from-red-500/20 to-pink-500/10', accent: '#ef4444', icon: '🎫', featured: false },
  { id: 12, name: 'Learning Management', category: 'Education', rating: 4.7, uses: 1340, time: '~4 min', desc: 'Course platform with video hosting, quizzes, certificates, and student progress', tags: ['LMS', 'Video', 'Certificates'], gradient: 'from-amber-500/20 to-yellow-500/10', accent: '#f59e0b', icon: '🎓', featured: false },
];

const categories = ['All', 'Business', 'AI Apps', 'Productivity', 'Analytics', 'Commerce', 'Finance', 'Media', 'Education'];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');

  const filtered = allTemplates
    .filter(t =>
      (activeCategory === 'All' || t.category === activeCategory) &&
      (t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       t.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'popular') return b.uses - a.uses;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

  const featured = allTemplates.filter(t => t.featured);

  return (
    <div className="min-h-screen bg-dark-400">
      <Navigation />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="absolute inset-0 hero-glow opacity-20" />
          <div className="relative max-w-4xl mx-auto">
            <div className="badge mb-6 mx-auto w-fit">
              <Zap className="w-4 h-4" />
              200+ Templates
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Start from a{' '}
              <span className="text-gradient">template</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Battle-tested, production-ready starting points. Customize and deploy in minutes.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              <input
                type="text"
                id="template-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                className="input-dark w-full pl-12 pr-4 py-4 text-base rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Featured */}
        {!searchQuery && (
          <section className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-xl font-bold text-white mb-6">⭐ Featured</h2>
              <div className="grid md:grid-cols-3 gap-5">
                {featured.map((template) => (
                  <div
                    key={template.id}
                    className={`relative glass-card border border-white/8 rounded-2xl overflow-hidden card-hover group`}
                  >
                    <div className={`h-36 bg-gradient-to-br ${template.gradient} flex items-center justify-center text-6xl relative`}>
                      {template.icon}
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-xs text-yellow-400 font-medium">
                        Featured
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-white">{template.name}</h3>
                        <div className="flex items-center gap-1 text-yellow-400 text-xs">
                          <Star className="w-3 h-3 fill-yellow-400" />
                          {template.rating}
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">{template.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">{template.uses.toLocaleString()} uses · {template.time}</span>
                        <a
                          href={`/builder?template=${template.id}`}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition btn-primary"
                        >
                          <Zap className="w-3 h-3" />
                          Use
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Templates */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Category Pills */}
              <div className="flex gap-2 overflow-x-auto pb-2 flex-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium flex-shrink-0 transition ${
                      cat === activeCategory
                        ? 'bg-primary-500 text-white shadow-glow-sm'
                        : 'glass-light border border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort + View */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-dark px-3 py-2 text-sm rounded-xl"
                  id="template-sort"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">A-Z</option>
                </select>
                <div className="flex rounded-xl glass-light border border-white/5 overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 transition ${viewMode === 'grid' ? 'bg-primary-500/20 text-primary-400' : 'text-slate-500 hover:text-white'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 transition ${viewMode === 'list' ? 'bg-primary-500/20 text-primary-400' : 'text-slate-500 hover:text-white'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results count */}
            <p className="text-slate-500 text-sm mb-6">{filtered.length} templates</p>

            {/* Grid */}
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-3 lg:grid-cols-4 gap-5' : 'space-y-3'}>
              {filtered.map((template) => (
                <div
                  key={template.id}
                  className={`glass-card border border-white/5 rounded-2xl overflow-hidden card-hover group ${
                    viewMode === 'list' ? 'flex items-center p-4' : ''
                  }`}
                >
                  {viewMode === 'grid' ? (
                    <>
                      <div className={`h-36 bg-gradient-to-br ${template.gradient} flex items-center justify-center text-5xl relative`}>
                        {template.icon}
                        <button
                          onClick={() => setLiked(prev => {
                            const next = new Set(prev);
                            next.has(template.id) ? next.delete(template.id) : next.add(template.id);
                            return next;
                          })}
                          className="absolute top-3 right-3 p-1.5 glass rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition"
                        >
                          <Heart className={`w-3.5 h-3.5 transition ${liked.has(template.id) ? 'fill-pink-500 text-pink-500' : 'text-white'}`} />
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-white text-sm">{template.name}</h3>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {template.rating}
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mb-3 line-clamp-2">{template.desc}</p>
                        <div className="flex gap-1 mb-3">
                          {template.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-white/5 rounded-md text-xs text-slate-500">{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">{template.time}</span>
                          <a
                            href={`/builder?template=${template.id}`}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                            style={{ background: `${template.accent}15`, color: template.accent, border: `1px solid ${template.accent}25` }}
                          >
                            <Zap className="w-3 h-3" />
                            Use
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.gradient} flex items-center justify-center text-2xl flex-shrink-0 mr-4`}>
                        {template.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-white">{template.name}</h3>
                          <span className="text-xs text-slate-500 px-2 py-0.5 bg-white/5 rounded">{template.category}</span>
                        </div>
                        <p className="text-sm text-slate-500 truncate">{template.desc}</p>
                      </div>
                      <div className="flex items-center gap-6 mx-6 text-xs text-slate-500">
                        <span>{template.uses.toLocaleString()} uses</span>
                        <span>{template.time}</span>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="w-3 h-3 fill-yellow-400" />
                          {template.rating}
                        </div>
                      </div>
                      <a
                        href={`/builder?template=${template.id}`}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-primary-400 bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/20 transition"
                      >
                        <Zap className="w-4 h-4" />
                        Use template
                      </a>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
