import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Zap, ArrowRight } from 'lucide-react';

const footerLinks = {
  Product:   ['Features', 'Pricing', 'Templates', 'Builder', 'Enterprise', 'Security', 'Changelog'],
  Resources: ['Documentation', 'API Reference', 'Help Center', 'Blog', 'Community', 'Status'],
  Company:   ['About', 'Careers', 'Press', 'Partners', 'Contact'],
  Legal:     ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security'],
};

export const Footer = () => {
  return (
    <footer style={{ background: '#F5F5EE', borderTop: '1px solid #E5E7EB' }}>
      {/* CTA Banner */}
      <div className="oa-container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="text-center max-w-2xl mx-auto">
          <p className="oa-label mb-6">Get started today</p>
          <h2 className="oa-section-heading mb-5">
            Ready to build something amazing?
          </h2>
          <p className="oa-body mb-10">
            Join 50,000+ builders turning ideas into production apps with OneAtlas.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/builder" className="btn-primary text-base" style={{ height: '52px', padding: '0 28px' }}>
              <Zap className="w-4 h-4" />
              Start building for free
            </Link>
            <Link href="/builder" className="btn-secondary text-base" style={{ height: '52px', padding: '0 28px' }}>
              Try the builder
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-[#9CA3AF] text-sm mt-6">
            No credit card required · Free plan available · Deploy in seconds
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ borderTop: '1px solid #E5E7EB' }}>
        <div className="oa-container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
          <div className="grid md:grid-cols-6 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-6 group">
                <div className="w-8 h-8 rounded-[10px] bg-[#FF6600] flex items-center justify-center transition-opacity group-hover:opacity-80">
                  <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-xl text-[#111111] tracking-tight">OneAtlas</span>
              </Link>
              <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6 max-w-xs">
                Build AI-powered applications in minutes, deploy in seconds. The fastest way to go from idea to production.
              </p>
              <div className="flex gap-3">
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
                    className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] hover:text-[#111111] hover:border-[#D1D5DB] transition-all"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-[#111111] mb-4 text-sm">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-[#9CA3AF] hover:text-[#6B7280] transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#E5E7EB] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#9CA3AF]">
              © 2024 OneAtlas, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-[#9CA3AF]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                All systems operational
              </span>
              <span>·</span>
              <span>Built for builders</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};