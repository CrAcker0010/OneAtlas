import React, { useState, useEffect, useRef } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Founder, LeadFlow AI',
    avatar: '👩‍💼',
    rating: 5,
    content: 'I built and launched a complete B2B SaaS platform in 4 days using OneAtlas. We went from idea to paying customers in a week. This would have taken months the traditional way.',
    metric: '4 days to launch',
    gradient: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO, Shipfast Logistics',
    avatar: '👨‍💻',
    rating: 5,
    content: 'The code quality is genuinely impressive. Clean, well-structured React with proper TypeScript. I was able to hand it to my team and they could work with it immediately.',
    metric: '10x faster development',
    gradient: 'from-purple-500/20 to-pink-500/10',
  },
  {
    name: 'Priya Sharma',
    role: 'Product Manager, NexaHR',
    avatar: '👩‍🔬',
    rating: 5,
    content: "Non-technical founder here. I described our hiring workflow and OneAtlas built the entire ATS system. Our engineering team was shocked — they said it would've taken 3 sprints.",
    metric: '0 to 500 users in 2 weeks',
    gradient: 'from-green-500/20 to-emerald-500/10',
  },
  {
    name: 'Alex Kim',
    role: 'Solo Developer',
    avatar: '🧑‍🎨',
    rating: 5,
    content: "As a solo dev, I was able to ship 6 client projects in the time it used to take me to do 2. OneAtlas handles all the boilerplate so I can focus on the unique parts.",
    metric: '3x more revenue',
    gradient: 'from-orange-500/20 to-red-500/10',
  },
  {
    name: 'Emma Wilson',
    role: 'CEO, DataPilot',
    avatar: '👩‍💻',
    rating: 5,
    content: "The AI understood exactly what I wanted. I described a complex analytics dashboard and it generated something better than what I had in mind. The bar charts, filters, everything.",
    metric: 'Raised $500k with MVP',
    gradient: 'from-primary-500/20 to-accent-purple/10',
  },
  {
    name: 'James Foster',
    role: 'Indie Hacker',
    avatar: '🧑‍💻',
    rating: 5,
    content: "I've tried every AI code tool out there. OneAtlas is the only one that actually builds complete, production-ready apps — not just snippets. It changed my whole workflow.",
    metric: '$12k MRR in 6 weeks',
    gradient: 'from-teal-500/20 to-cyan-500/10',
  },
];

export const TestimonialsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const displayed = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/3 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge mb-6 mx-auto w-fit">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            Loved by builders
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            What our builders{' '}
            <span className="text-gradient">are saying</span>
          </h2>
          <div className="flex items-center justify-center gap-3 text-slate-400">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span>4.9 out of 5 from 2,800+ reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {displayed.map((t, i) => (
            <div
              key={i}
              className={`glass-card border border-white/8 rounded-2xl p-6 card-hover relative`}
            >
              {/* Quote Icon */}
              <div className="absolute top-5 right-5">
                <Quote className="w-8 h-8 text-white/5" />
              </div>

              {/* Rating */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                "{t.content}"
              </p>

              {/* Metric */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${t.gradient} border border-white/5 mb-5`}>
                <span className="text-xs font-bold text-white">📈 {t.metric}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500/30 to-accent-pink/30 border border-white/10 flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="w-10 h-10 rounded-full glass-light border border-white/8 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`h-2 rounded-full transition-all ${i === currentPage ? 'w-8 bg-primary-500' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="w-10 h-10 rounded-full glass-light border border-white/8 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 transition"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
