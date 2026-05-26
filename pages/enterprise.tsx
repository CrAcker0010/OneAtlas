import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Shield, Globe, Users, Zap, Lock, BarChart3, CheckCircle, ArrowRight, Server } from 'lucide-react';
import Head from 'next/head';

const features = [
  { icon: Shield, title: 'SOC 2 Type II Certified', desc: 'Enterprise-grade security compliance you can trust', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Globe, title: 'Global Infrastructure', desc: '47+ edge regions with 99.99% uptime SLA', color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: Lock, title: 'SSO / SAML', desc: 'Integrate with Okta, Azure AD, Google Workspace and more', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: Users, title: 'Granular Permissions', desc: 'Role-based access control with org-level governance', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { icon: Server, title: 'Dedicated Infrastructure', desc: 'Private cloud deployments with your own compute resources', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { icon: BarChart3, title: 'Advanced Analytics', desc: 'Usage dashboards, cost allocation, and audit logs', color: 'text-pink-400', bg: 'bg-pink-500/10' },
];

export default function Enterprise() {
  const [form, setForm] = useState({ name: '', email: '', company: '', size: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Enterprise — OneAtlas</title>
        <meta name="description" content="Enterprise-grade AI app platform with dedicated infrastructure, SOC 2, SSO, and dedicated support." />
      </Head>
      <div className="min-h-screen bg-dark-400">
        <Navigation />
        <main className="pt-20">
          {/* Hero */}
          <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 hero-glow opacity-20" />
            <div className="max-w-4xl mx-auto text-center relative">
              <div className="badge mb-6 mx-auto w-fit">
                <Shield className="w-4 h-4" />
                Enterprise
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Built for enterprise{' '}
                <span className="text-gradient">at scale</span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Dedicated infrastructure, enterprise security, and the support your organization needs to build mission-critical applications.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="#contact" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
                  Talk to sales <ArrowRight className="w-5 h-5" />
                </a>
                <a href="/pricing" className="btn-secondary flex items-center gap-2 text-base px-8 py-4">
                  View pricing
                </a>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {features.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div key={i} className="glass-card border border-white/5 rounded-2xl p-6 card-hover">
                      <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                        <Icon className={`w-6 h-6 ${f.color}`} />
                      </div>
                      <h3 className="font-bold text-white mb-2">{f.title}</h3>
                      <p className="text-slate-500 text-sm">{f.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Trusted by */}
              <div className="text-center mb-20">
                <p className="text-slate-500 text-sm mb-8">Trusted by engineering teams at</p>
                <div className="flex flex-wrap justify-center gap-8">
                  {['Acme Corp', 'TechGiant', 'ScaleUP', 'MegaStartup', 'Enterprise Co'].map((c, i) => (
                    <div key={i} className="glass-light border border-white/5 px-6 py-3 rounded-xl text-slate-400 font-semibold">
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div id="contact" className="grid lg:grid-cols-2 gap-16 items-start">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Talk to our team</h2>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    Fill out the form and we'll get back to you within one business day to discuss how OneAtlas can work for your organization.
                  </p>
                  {['Custom pricing based on usage', 'Dedicated onboarding support', '24/7 enterprise SLA', 'Proof of concept in days'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>

                {submitted ? (
                  <div className="glass-card border border-white/8 rounded-2xl p-10 text-center">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold text-white mb-3">We'll be in touch!</h3>
                    <p className="text-slate-400">Expect a response within 24 hours from our enterprise team.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="glass-card border border-white/8 rounded-2xl p-8 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-slate-400 mb-2 block">Name</label>
                        <input
                          type="text"
                          required
                          className="input-dark w-full px-4 py-3"
                          value={form.name}
                          onChange={e => setForm({...form, name: e.target.value})}
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-400 mb-2 block">Work Email</label>
                        <input
                          type="email"
                          required
                          className="input-dark w-full px-4 py-3"
                          value={form.email}
                          onChange={e => setForm({...form, email: e.target.value})}
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Company</label>
                      <input
                        type="text"
                        required
                        className="input-dark w-full px-4 py-3"
                        value={form.company}
                        onChange={e => setForm({...form, company: e.target.value})}
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Team Size</label>
                      <select
                        className="input-dark w-full px-4 py-3"
                        value={form.size}
                        onChange={e => setForm({...form, size: e.target.value})}
                      >
                        <option value="">Select...</option>
                        <option>1-10</option>
                        <option>11-50</option>
                        <option>51-200</option>
                        <option>200+</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">How can we help?</label>
                      <textarea
                        rows={4}
                        className="input-dark w-full px-4 py-3 resize-none"
                        value={form.message}
                        onChange={e => setForm({...form, message: e.target.value})}
                        placeholder="Tell us about your use case..."
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full py-3.5 flex items-center justify-center gap-2">
                      Send message <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
