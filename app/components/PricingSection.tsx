import React, { useState } from 'react';
import { Check, X, Zap, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Explorer',
    price: { monthly: 0, annual: 0 },
    priceLabel: 'Free forever',
    desc: 'Perfect for learning & experimentation',
    features: [
      { text: '30 monthly credits', included: true },
      { text: 'Core AI models (GPT-4o, Claude Haiku)', included: true },
      { text: 'Unlimited public apps', included: true },
      { text: 'Shared infrastructure', included: true },
      { text: 'Community support', included: true },
      { text: 'Advanced reasoning models', included: false },
      { text: 'Custom domains', included: false },
      { text: 'Private apps', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start free',
    ctaHref: '/builder',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Builder',
    price: { monthly: 29, annual: 19 },
    priceLabel: '/month',
    desc: 'For indie builders & MVPs',
    features: [
      { text: '200 monthly credits', included: true },
      { text: 'Advanced reasoning models (Claude Sonnet, o1)', included: true },
      { text: 'Public + private apps', included: true },
      { text: 'Managed backend & database', included: true },
      { text: 'Custom domains', included: true },
      { text: 'Priority builds', included: true },
      { text: 'Email support', included: true },
      { text: 'GitHub sync', included: true },
      { text: 'Team collaboration', included: false },
    ],
    cta: 'Start building',
    ctaHref: '/builder',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Studio',
    price: { monthly: 79, annual: 59 },
    priceLabel: '/month',
    desc: 'For startups & fast-moving teams',
    features: [
      { text: '800 monthly credits', included: true },
      { text: 'Premium frontier models (Claude Opus, GPT-4o)', included: true },
      { text: 'Unlimited apps + advanced controls', included: true },
      { text: 'Production-grade infrastructure', included: true },
      { text: 'Advanced workflows & APIs', included: true },
      { text: 'Priority support', included: true },
      { text: 'Team collaboration (5 seats)', included: true },
      { text: 'Analytics & usage insights', included: true },
      { text: 'SSO / SAML', included: false },
    ],
    cta: 'Upgrade to Studio',
    ctaHref: '/builder',
    highlighted: false,
    badge: 'Best for Teams',
  },
  {
    name: 'Scale',
    price: { monthly: 199, annual: 149 },
    priceLabel: '/month',
    desc: 'For AI-native companies at scale',
    features: [
      { text: '2,500 monthly credits', included: true },
      { text: 'Priority access + fastest inference', included: true },
      { text: 'Unlimited apps & domain controls', included: true },
      { text: 'High-performance dedicated resources', included: true },
      { text: 'Enterprise-grade security & SOC 2', included: true },
      { text: 'Expanded enterprise APIs', included: true },
      { text: 'Granular permissions & org controls', included: true },
      { text: 'SSO / SAML', included: true },
      { text: 'Dedicated success channel', included: true },
    ],
    cta: 'Contact sales',
    ctaHref: '/contact',
    highlighted: false,
    badge: 'Enterprise',
  },
];

const faqs = [
  { q: 'What is a credit?', a: 'Credits are consumed when you generate, edit, or deploy apps. Each AI generation costs 1-5 credits depending on complexity.' },
  { q: 'Can I upgrade or downgrade anytime?', a: 'Yes! You can change your plan at any time. Upgrades take effect immediately; downgrades at the next billing cycle.' },
  { q: 'Do you offer refunds?', a: 'We offer a 14-day money-back guarantee for all paid plans, no questions asked.' },
  { q: 'What AI models do you support?', a: 'We support Claude Opus/Sonnet/Haiku, GPT-4o/4o-mini, Gemini Pro, and more. Higher plans unlock frontier models.' },
];

export const PricingSection = () => {
  const [billingMode, setBillingMode] = useState<'monthly' | 'annual'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="pricing" className="oa-section" style={{ background: '#FFFFFF' }}>
      <div className="oa-container">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="oa-label mb-4">Pricing</p>
          <h2 className="oa-section-heading mb-5">
            Simple, transparent pricing
          </h2>
          <p className="oa-body max-w-xl mx-auto mb-10">
            Start free. Scale as you grow. No hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-1 p-1.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
            <button
              id="billing-monthly"
              onClick={() => setBillingMode('monthly')}
              className="px-6 py-2 rounded-lg font-semibold text-sm transition-all"
              style={{
                background: billingMode === 'monthly' ? '#FFFFFF' : 'transparent',
                color: billingMode === 'monthly' ? '#111111' : '#6B7280',
                boxShadow: billingMode === 'monthly' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                border: billingMode === 'monthly' ? '1px solid #E5E7EB' : '1px solid transparent',
              }}
            >
              Monthly
            </button>
            <button
              id="billing-annual"
              onClick={() => setBillingMode('annual')}
              className="px-6 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
              style={{
                background: billingMode === 'annual' ? '#FFFFFF' : 'transparent',
                color: billingMode === 'annual' ? '#111111' : '#6B7280',
                boxShadow: billingMode === 'annual' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                border: billingMode === 'annual' ? '1px solid #E5E7EB' : '1px solid transparent',
              }}
            >
              Annual
              <span className="px-2 py-0.5 text-xs bg-[#F0FDF4] text-[#15803D] rounded-full font-medium border border-[#BBF7D0]">-35%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 items-start">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="rounded-2xl relative flex flex-col transition-all duration-200"
              style={{
                background: '#FFFFFF',
                border: plan.highlighted ? '1.5px solid #FF6600' : '1px solid #E5E7EB',
                boxShadow: plan.highlighted ? '0 4px 24px rgba(255,102,0,0.08)' : '0 1px 2px rgba(0,0,0,0.03)',
                marginTop: plan.highlighted ? '0' : '0',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                  style={{
                    background: plan.highlighted ? '#FF6600' : '#F3F4F6',
                    color: plan.highlighted ? '#FFFFFF' : '#6B7280',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-[#111111] mb-1">{plan.name}</h3>
                <p className="text-sm text-[#9CA3AF] mb-6">{plan.desc}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#111111]">
                      ${billingMode === 'monthly' ? plan.price.monthly : plan.price.annual}
                    </span>
                    <span className="text-[#9CA3AF] text-sm">
                      {plan.price.monthly === 0 ? 'free forever' : plan.priceLabel}
                    </span>
                  </div>
                  {billingMode === 'annual' && plan.price.monthly > 0 && (
                    <p className="text-xs text-[#15803D] mt-1">
                      Save ${(plan.price.monthly - plan.price.annual) * 12}/year
                    </p>
                  )}
                </div>

                {/* CTA */}
                <a
                  href={plan.ctaHref}
                  className="w-full py-2.5 rounded-xl font-semibold mb-6 text-center text-sm flex items-center justify-center gap-2 transition-all"
                  style={plan.highlighted
                    ? { background: '#FF6600', color: '#FFFFFF', border: 'none' }
                    : { background: '#F9FAFB', color: '#111111', border: '1px solid #E5E7EB' }
                  }
                  onMouseOver={e => { if (!plan.highlighted) (e.currentTarget as HTMLElement).style.background = '#F3F4F6'; }}
                  onMouseOut={e => { if (!plan.highlighted) (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
                >
                  {plan.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                {/* Feature list */}
                <div className="space-y-2.5 flex-1">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5">
                      {feature.included ? (
                        <div className="w-4 h-4 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#22C55E]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-2.5 h-2.5 text-[#D1D5DB]" />
                        </div>
                      )}
                      <span className={`text-sm ${feature.included ? 'text-[#374151]' : 'text-[#9CA3AF]'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-8 md:p-12 mb-20 text-center">
          <p className="oa-label mb-4">Enterprise</p>
          <h3 className="text-2xl font-bold text-[#111111] mb-3 tracking-tight">Need something custom?</h3>
          <p className="text-[#6B7280] max-w-lg mx-auto mb-6 leading-relaxed">
            We offer custom enterprise plans with dedicated infrastructure, SLAs, custom AI model fine-tuning, and white-label options.
          </p>
          <a href="/contact" className="btn-primary inline-flex items-center gap-2">
            Talk to sales
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* FAQ — Left/Right Layout */}
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <p className="oa-label mb-4">FAQ</p>
            <h3 className="text-2xl font-bold text-[#111111] mb-3 tracking-tight">
              Frequently asked questions
            </h3>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Can't find what you're looking for? <a href="/contact" className="text-[#FF6600] hover:underline">Contact us.</a>
            </p>
          </div>
          <div className="md:col-span-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[#ECECEC]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left"
                >
                  <span className="font-semibold text-[#111111] text-sm">{faq.q}</span>
                  <span className="text-[#9CA3AF] text-lg flex-shrink-0 ml-4">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="pb-6 text-[#6B7280] text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};