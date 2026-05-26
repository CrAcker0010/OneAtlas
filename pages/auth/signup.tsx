import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Zap, Eye, EyeOff, Github, Chrome, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const benefits = [
  'Free forever plan with 30 credits/month',
  'Access to latest AI models including Claude Opus',
  'Deploy unlimited public apps instantly',
  'No credit card required to start',
];

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: 'At least 8 characters', pass: password.length >= 8 },
    { label: 'Contains a number', pass: /\d/.test(password) },
    { label: 'Contains uppercase', pass: /[A-Z]/.test(password) },
    { label: 'Contains special char', pass: /[^a-zA-Z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.pass).length;
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-2">
        {checks.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score - 1] : 'bg-white/10'}`}
          />
        ))}
      </div>
      {password && (
        <div className="grid grid-cols-2 gap-1">
          {checks.map((c, i) => (
            <div key={i} className={`flex items-center gap-1.5 text-xs ${c.pass ? 'text-green-400' : 'text-slate-600'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${c.pass ? 'bg-green-400' : 'bg-white/10'}`} />
              {c.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SignUp() {
  const router = useRouter();
  const { signup, loginWithOAuth, isAuthenticated, isLoading } = useAuth();
  const [step, setStep] = useState<'info' | 'verify'>('info');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'github' | 'google' | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const next = router.query.next as string | undefined;
      router.replace(next && next.startsWith('/') ? next : '/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || isSubmitting) return;
    setError('');
    setIsSubmitting(true);
    const result = await signup(name, email, password);
    if (result.success) {
      // If there's a next URL, redirect directly (skip verify screen)
      const next = router.query.next as string | undefined;
      if (next && next.startsWith('/')) {
        router.push(next);
      } else {
        setStep('verify');
      }
    } else {
      setError(result.error || 'Sign up failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleOAuth = async (provider: 'github' | 'google') => {
    setOauthLoading(provider);
    const result = await loginWithOAuth(provider);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError('OAuth sign-up failed. Please try again.');
      setOauthLoading(null);
    }
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-dark-400 flex">
      {/* Left Panel — Marketing */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-dark-200 to-dark-400" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 hero-glow opacity-40" />
        <div className="orb orb-purple w-64 h-64 top-10 left-10" />
        <div className="orb orb-pink w-48 h-48 bottom-20 right-10" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-pink flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl text-white">OneAtlas</span>
          </Link>

          <div>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Build your next<br />
              <span className="text-gradient">big idea today</span>
            </h2>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">
              Join 50,000+ builders turning ideas into production-ready apps using frontier AI.
            </p>
            <div className="space-y-4">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <span className="text-slate-300 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="glass-light border border-white/8 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex -space-x-2">
                {['💜', '💙', '💚'].map((e, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-pink border-2 border-dark-200 flex items-center justify-center text-sm">
                    {e}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-white text-sm font-semibold">50k+ builders</div>
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm italic">
              "Built and launched my SaaS in 2 days. Would have taken months otherwise."
            </p>
            <p className="text-slate-600 text-xs mt-2">— Alex Chen, Founder at BuildFast</p>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-pink flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-white">OneAtlas</span>
            </Link>
          </div>

          {step === 'info' ? (
            <>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
                <p className="text-slate-400">
                  Already have an account?{' '}
                  <Link href="/auth/signin" className="text-primary-400 hover:text-primary-300 transition font-medium">
                    Sign in
                  </Link>
                </p>
              </div>

              {/* OAuth */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <button
                  id="signup-github"
                  onClick={() => handleOAuth('github')}
                  disabled={!!oauthLoading || isSubmitting}
                  className="flex items-center justify-center gap-2.5 py-3 glass-light border border-white/8 rounded-xl text-sm font-medium text-white hover:border-white/15 hover:bg-white/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {oauthLoading === 'github' ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Github className="w-4 h-4" />}
                  GitHub
                </button>
                <button
                  id="signup-google"
                  onClick={() => handleOAuth('google')}
                  disabled={!!oauthLoading || isSubmitting}
                  className="flex items-center justify-center gap-2.5 py-3 glass-light border border-white/8 rounded-xl text-sm font-medium text-white hover:border-white/15 hover:bg-white/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {oauthLoading === 'google' ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Chrome className="w-4 h-4" />}
                  Google
                </button>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-slate-600 text-xs">or with email</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              {error && (
                <div className="flex items-start gap-3 p-3 mb-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="signup-name" className="text-sm text-slate-400 mb-2 block">Full name</label>
                  <input
                    type="text"
                    id="signup-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    autoComplete="name"
                    className="input-dark w-full px-4 py-3"
                  />
                </div>

                <div>
                  <label htmlFor="signup-email" className="text-sm text-slate-400 mb-2 block">Work email</label>
                  <input
                    type="email"
                    id="signup-email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="you@company.com"
                    required
                    autoComplete="email"
                    className="input-dark w-full px-4 py-3"
                  />
                </div>

                <div>
                  <label htmlFor="signup-password" className="text-sm text-slate-400 mb-2 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="signup-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className="input-dark w-full px-4 py-3 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {password && <PasswordStrength password={password} />}
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="signup-terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 accent-primary-500"
                  />
                  <span className="text-sm text-slate-400">
                    I agree to the{' '}
                    <a href="/terms" className="text-primary-400 hover:text-primary-300 transition">Terms of Service</a>
                    {' & '}
                    <a href="/privacy" className="text-primary-400 hover:text-primary-300 transition">Privacy Policy</a>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!agreed || isSubmitting || !!oauthLoading || !name || !email || password.length < 8}
                  id="signup-submit"
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Create free account <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success state — show continue to dashboard */
            <div className="text-center">
              <div className="w-20 h-20 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-3">Account created! 🎉</h1>
              <p className="text-slate-400 mb-2">
                Welcome to OneAtlas, <strong className="text-white">{name}</strong>!
              </p>
              <p className="text-slate-500 text-sm mb-8">
                A verification link was sent to <strong className="text-slate-400">{email}</strong>
              </p>
              <Link
                href="/dashboard"
                id="signup-go-to-dashboard"
                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-slate-600 text-sm mt-4">
                Didn't get the email?{' '}
                <button className="text-primary-400 hover:text-primary-300 transition">Resend</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
