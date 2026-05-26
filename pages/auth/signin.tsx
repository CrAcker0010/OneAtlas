import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Zap, Eye, EyeOff, Github, Chrome, ArrowRight, AlertCircle, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function SignIn() {
  const router = useRouter();
  const { login, loginWithOAuth, isAuthenticated, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [oauthLoading, setOauthLoading] = useState<'github' | 'google' | null>(null);

  // If already logged in, redirect to dashboard (or intended destination)
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const redirect = router.query.redirect as string | undefined;
      router.replace(redirect && redirect.startsWith('/') ? redirect : '/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError('');
    setIsSubmitting(true);
    const result = await login(email, password);
    if (result.success) {
      const redirect = router.query.redirect as string | undefined;
      router.push(redirect && redirect.startsWith('/') ? redirect : '/dashboard');
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleOAuth = async (provider: 'github' | 'google') => {
    setOauthLoading(provider);
    const result = await loginWithOAuth(provider);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError('OAuth sign-in failed. Please try again.');
      setOauthLoading(null);
    }
  };

  if (isLoading) return null; // handled by AuthProvider loading screen

  return (
    <div className="min-h-screen bg-dark-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 hero-glow opacity-20" />
      <div className="orb orb-purple w-64 h-64 -top-10 -left-10" />
      <div className="orb orb-pink w-48 h-48 bottom-10 right-10" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500 to-accent-pink blur-sm opacity-70 group-hover:opacity-100 transition" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-pink flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <span className="font-bold text-2xl text-white">OneAtlas</span>
          </Link>
        </div>

        <div className="glass-card border border-white/8 rounded-3xl p-8 shadow-2xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-primary-400 hover:text-primary-300 font-medium transition">
                Sign up free
              </Link>
            </p>
          </div>

          {/* Demo hint */}
          <div className="flex items-start gap-3 p-3 mb-5 bg-primary-500/8 border border-primary-500/20 rounded-xl">
            <Lock className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-primary-300 leading-relaxed">
              <strong>Demo credentials:</strong> <code className="bg-white/10 px-1.5 py-0.5 rounded font-mono">demo@oneatlas.app</code> / <code className="bg-white/10 px-1.5 py-0.5 rounded font-mono">demo123</code>
            </p>
          </div>

          {/* OAuth */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              id="signin-github"
              onClick={() => handleOAuth('github')}
              disabled={!!oauthLoading || isSubmitting}
              className="flex items-center justify-center gap-2 py-3 glass-light border border-white/8 rounded-xl text-sm font-medium text-white hover:border-white/15 hover:bg-white/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {oauthLoading === 'github' ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Github className="w-4 h-4" />
              )}
              GitHub
            </button>
            <button
              id="signin-google"
              onClick={() => handleOAuth('google')}
              disabled={!!oauthLoading || isSubmitting}
              className="flex items-center justify-center gap-2 py-3 glass-light border border-white/8 rounded-xl text-sm font-medium text-white hover:border-white/15 hover:bg-white/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {oauthLoading === 'google' ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Chrome className="w-4 h-4" />
              )}
              Google
            </button>
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-slate-600 text-xs">or with email</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-3 mb-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="signin-email" className="text-sm text-slate-400 mb-2 block">
                Email address
              </label>
              <input
                type="email"
                id="signin-email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="you@company.com"
                required
                autoComplete="email"
                className="input-dark w-full px-4 py-3"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="signin-password" className="text-sm text-slate-400">
                  Password
                </label>
                <a href="/auth/forgot-password" className="text-xs text-primary-400 hover:text-primary-300 transition">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="signin-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
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
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !!oauthLoading || !email || !password}
              id="signin-submit"
              className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in to OneAtlas
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          By signing in, you agree to our{' '}
          <a href="/terms" className="text-slate-400 hover:text-slate-300 transition">Terms</a>
          {' & '}
          <a href="/privacy" className="text-slate-400 hover:text-slate-300 transition">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
