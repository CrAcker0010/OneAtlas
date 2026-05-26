import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Zap, ArrowRight } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Templates', 'Builder', 'Enterprise', 'Security', 'Changelog'],
  Resources: ['Documentation', 'API Reference', 'Help Center', 'Blog', 'Community', 'Status'],
  Company: ['About', 'Careers', 'Press', 'Partners', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security'],
};

export const Footer = () => {
  return (
    <footer className="relative border-t border-white/5">
      {/* CTA Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-purple/5 to-accent-pink/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to build something{' '}
              <span className="text-gradient">amazing?</span>
            </h2>
            <p className="text-xl text-slate-400 mb-10">
              Join 50,000+ builders turning ideas into production apps with OneAtlas.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/auth/signup" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
                <Zap className="w-5 h-5" />
                Start building for free
              </Link>
              <Link href="/builder" className="btn-secondary flex items-center gap-2 text-base px-8 py-4">
                Try the builder
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-slate-600 text-sm mt-6">No credit card required · Free plan available · Deploy in seconds</p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-dark-300/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-6 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="relative w-9 h-9">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500 to-accent-pink blur-sm opacity-70 group-hover:opacity-100 transition" />
                  <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-pink flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <span className="font-bold text-xl text-white">OneAtlas</span>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
                Build AI-powered applications in minutes, deploy in seconds. The fastest way to go from idea to production.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: '#', label: 'GitHub' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Mail, href: '#', label: 'Email' },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-white mb-5 text-sm">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600">
              © 2024 OneAtlas, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                All systems operational
              </span>
              <span>·</span>
              <span>Built with ❤️ for builders</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};