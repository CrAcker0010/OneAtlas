import React, { useState } from 'react';
import { Check, X, Zap, ArrowRight, HelpCircle } from 'lucide-react';

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
    ctaHref: '/auth/signup',
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
    ctaHref: '/auth/signup?plan=builder',
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
    ctaHref: '/auth/signup?plan=studio',
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
  {
    q: 'What is a credit?',
    a: 'Credits are consumed when you generate, edit, or deploy apps. Each AI generation costs 1-5 credits depending on complexity.',
  },
  {
    q: 'Can I upgrade or downgrade anytime?',
    a: 'Yes! You can change your plan at any time. Upgrades take effect immediately; downgrades at the next billing cycle.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'We offer a 14-day money-back guarantee for all paid plans, no questions asked.',
  },
  {
    q: 'What AI models do you support?',
    a: 'We support Claude Opus/Sonnet/Haiku, GPT-4o/4o-mini, Gemini Pro, and more. Higher plans unlock frontier models.',
  },
];

export const PricingSection = () => {
  const [billingMode, setBillingMode] = useState<'monthly' | 'annual'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 hero-glow opacity-30" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge mb-6 mx-auto w-fit">
            <Zap className="w-4 h-4" />
            Pricing
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Simple, transparent{' '}
            <span className="text-gradient">pricing</span>
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Start free. Scale as you grow. No hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-1 p-1.5 rounded-xl glass border border-white/10">
            <button
              id="billing-monthly"
              onClick={() => setBillingMode('monthly')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                billingMode === 'monthly'
                  ? 'bg-primary-500 text-white shadow-glow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              id="billing-annual"
              onClick={() => setBillingMode('annual')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                billingMode === 'annual'
                  ? 'bg-primary-500 text-white shadow-glow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Annual
              <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full font-medium">-35%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border relative flex flex-col transition-all duration-300 ${
                plan.highlighted
                  ? 'border-primary-500/50 bg-gradient-to-b from-primary-500/10 to-accent-purple/5 shadow-glow scale-105'
                  : 'border-white/8 glass-card card-hover'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
                  plan.highlighted
                    ? 'bg-primary-500 text-white'
                    : 'bg-white/10 text-slate-300 border border-white/10'
                }`}>
                  {plan.badge}
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500 mb-6">{plan.desc}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      ${billingMode === 'monthly' ? plan.price.monthly : plan.price.annual}
                    </span>
                    <span className="text-slate-500 text-sm">{plan.price.monthly === 0 ? 'free forever' : plan.priceLabel}</span>
                  </div>
                  {billingMode === 'annual' && plan.price.monthly > 0 && (
                    <p className="text-xs text-green-400 mt-1">
                      Save ${(plan.price.monthly - plan.price.annual) * 12}/year
                    </p>
                  )}
                </div>

                {/* CTA */}
                <a
                  href={plan.ctaHref}
                  className={`w-full py-3 rounded-xl font-semibold mb-6 text-center text-sm flex items-center justify-center gap-2 transition-all ${
                    plan.highlighted
                      ? 'bg-primary-500 text-white hover:bg-primary-400 shadow-glow-sm'
                      : 'bg-white/8 text-white hover:bg-white/12 border border-white/10'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Features */}
                <div className="space-y-3 flex-1">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: plan.highlighted ? 'rgba(99,91,255,0.3)' : 'rgba(255,255,255,0.05)' }}>
                          <Check className={`w-3 h-3 ${plan.highlighted ? 'text-primary-300' : 'text-green-400'}`} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-white/3 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3 h-3 text-slate-700" />
                        </div>
                      )}
                      <span className={`text-sm ${feature.included ? (plan.highlighted ? 'text-slate-200' : 'text-slate-300') : 'text-slate-600'}`}>
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
        <div className="glass-card rounded-2xl border border-white/8 p-8 md:p-12 mb-20 text-center">
          <div className="text-4xl mb-4">🏢</div>
          <h3 className="text-2xl font-bold text-white mb-3">Need something custom?</h3>
          <p className="text-slate-400 max-w-lg mx-auto mb-6">
            We offer custom enterprise plans with dedicated infrastructure, SLAs, custom AI model fine-tuning, and white-label options.
          </p>
          <a href="/contact" className="btn-primary inline-flex items-center gap-2">
            Talk to sales
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="text-2xl font-bold text-white text-center mb-8">Frequently asked questions</h3>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-card border border-white/5 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-white">{faq.q}</span>
                  <HelpCircle className={`w-5 h-5 transition-colors ${openFaq === i ? 'text-primary-400' : 'text-slate-600'}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
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