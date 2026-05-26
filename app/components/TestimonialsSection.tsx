import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen', role: 'Founder, LeadFlow AI', avatar: 'SC', rating: 5,
    content: 'I built and launched a complete B2B SaaS platform in 4 days using OneAtlas. We went from idea to paying customers in a week. This would have taken months the traditional way.',
    metric: '4 days to launch',
  },
  {
    name: 'Marcus Rodriguez', role: 'CTO, Shipfast Logistics', avatar: 'MR', rating: 5,
    content: 'The code quality is genuinely impressive. Clean, well-structured React with proper TypeScript. I was able to hand it to my team and they could work with it immediately.',
    metric: '10× faster development',
  },
  {
    name: 'Priya Sharma', role: 'Product Manager, NexaHR', avatar: 'PS', rating: 5,
    content: "Non-technical founder here. I described our hiring workflow and OneAtlas built the entire ATS system. Our engineering team was shocked — they said it would've taken 3 sprints.",
    metric: '0 to 500 users in 2 weeks',
  },
  {
    name: 'Alex Kim', role: 'Solo Developer', avatar: 'AK', rating: 5,
    content: "As a solo dev, I was able to ship 6 client projects in the time it used to take me to do 2. OneAtlas handles all the boilerplate so I can focus on the unique parts.",
    metric: '3× more revenue',
  },
  {
    name: 'Emma Wilson', role: 'CEO, DataPilot', avatar: 'EW', rating: 5,
    content: "The AI understood exactly what I wanted. I described a complex analytics dashboard and it generated something better than what I had in mind. The bar charts, filters, everything.",
    metric: 'Raised $500k with MVP',
  },
  {
    name: 'James Foster', role: 'Indie Hacker', avatar: 'JF', rating: 5,
    content: "I've tried every AI code tool out there. OneAtlas is the only one that actually builds complete, production-ready apps — not just snippets. It changed my whole workflow.",
    metric: '$12k MRR in 6 weeks',
  },
];

// Simple initials avatar colors — muted, not neon
const avatarColors = ['#E5E7EB', '#FEE2E2', '#FEF3C7', '#D1FAE5', '#DBEAFE', '#EDE9FE'];
const avatarTextColors = ['#374151', '#991B1B', '#92400E', '#065F46', '#1E40AF', '#5B21B6'];

export const TestimonialsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const displayed = testimonials.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <section className="oa-section" style={{ background: '#F5F5EE' }}>
      <div className="oa-container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="oa-label mb-4">Loved by builders</p>
          <h2 className="oa-section-heading mb-5">
            What our builders are saying
          </h2>
          <div className="flex items-center justify-center gap-2 text-[#6B7280]">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#EAB308] text-[#EAB308]" />
              ))}
            </div>
            <span className="text-sm">4.9 out of 5 from 2,800+ reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {displayed.map((t, i) => (
            <div key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 relative oa-card-hover transition-all duration-200">
              {/* Decorative quote */}
              <div className="absolute top-5 right-5">
                <Quote className="w-7 h-7 text-[#F3F4F6]" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-[#EAB308] text-[#EAB308]" />
                ))}
              </div>

              {/* Content */}
              <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
                "{t.content}"
              </p>

              {/* Metric chip */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] mb-5">
                <span className="text-xs font-semibold text-[#111111]">📈 {t.metric}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: avatarColors[i % avatarColors.length],
                    color: avatarTextColors[i % avatarTextColors.length],
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-[#111111] text-sm">{t.name}</div>
                  <div className="text-xs text-[#9CA3AF]">{t.role}</div>
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
            className="w-9 h-9 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#111111] disabled:opacity-30 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === currentPage ? '24px' : '6px',
                  background: i === currentPage ? '#FF6600' : '#D1D5DB',
                }}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="w-9 h-9 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#111111] disabled:opacity-30 transition"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
