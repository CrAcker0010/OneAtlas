import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronDown, Zap, Menu, X, Globe, Shield, Users, BarChart3, Cpu, Layers } from 'lucide-react';

const megaMenus = {
  product: [
    { title: 'Backend Platform', icon: Cpu, desc: 'Deploy apps with backend built for AI agents' },
    { title: 'Integrations', icon: Layers, desc: 'Discover integrations that plug into your app' },
    { title: 'Global Deployment', icon: Globe, desc: 'Deploy worldwide with edge infrastructure' },
    { title: 'Security', icon: Shield, desc: 'Enterprise-grade security & compliance' },
  ],
  'use cases': [
    { title: 'Productivity Tools', icon: BarChart3, desc: 'Workflows, task systems and business operations' },
    { title: 'AI Agents', icon: Cpu, desc: 'Autonomous assistants and AI-powered workflows' },
    { title: 'Internal Tools', icon: Layers, desc: 'Admin panels, dashboards and company systems' },
    { title: 'Team Collaboration', icon: Users, desc: 'Shared workspaces and collaborative building' },
  ],
  templates: [
    { title: 'AI Chat Apps', icon: Cpu, desc: 'ChatGPT-style assistants and copilots' },
    { title: 'Admin Dashboards', icon: BarChart3, desc: 'Analytics and operations interfaces' },
    { title: 'Marketplace Apps', icon: Globe, desc: 'Two-sided marketplaces and listings' },
    { title: 'Landing Pages', icon: Layers, desc: 'Marketing sites and startup launch pages' },
  ],
};

export const Navigation = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Product', 'Use Cases', 'Templates', 'Enterprise', 'Pricing'];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(245,245,238,0.92)] backdrop-blur-md border-b border-[#E5E7EB]'
          : 'bg-transparent'
      }`}
      style={{ height: '72px' }}
    >
      <div className="max-w-[1280px] mx-auto px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-8 h-8 rounded-[10px] bg-[#FF6600] flex items-center justify-center transition-opacity group-hover:opacity-80">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl text-[#111111] tracking-tight">OneAtlas</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center" style={{ gap: '4px' }}>
          {navItems.map((item) => (
            <div
              key={item}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.toLowerCase())}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button className="flex items-center gap-1 nav-link px-3 py-2 rounded-lg hover:bg-black/4 transition-colors text-[15px]">
                {item}
                {megaMenus[item.toLowerCase() as keyof typeof megaMenus] && (
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openMenu === item.toLowerCase() ? 'rotate-180' : ''}`} />
                )}
              </button>

              {openMenu === item.toLowerCase() && megaMenus[item.toLowerCase() as keyof typeof megaMenus] && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[460px] mt-2 bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-2">
                  <div className="grid grid-cols-2 gap-1">
                    {megaMenus[item.toLowerCase() as keyof typeof megaMenus].map((subitem, idx) => {
                      const Icon = subitem.icon;
                      return (
                        <a key={idx} href="#" className="p-4 rounded-xl hover:bg-[#F9FAFB] transition-colors flex items-start gap-3 group/item">
                          <div className="w-8 h-8 rounded-lg bg-[#F3F4F6] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#E5E7EB] transition-colors">
                            <Icon className="w-4 h-4 text-[#6B7280]" />
                          </div>
                          <div>
                            <p className="font-semibold text-[#111111] text-sm mb-0.5">{subitem.title}</p>
                            <p className="text-xs text-[#6B7280] leading-snug">{subitem.desc}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/dashboard" className="nav-link px-3 py-2 rounded-lg hover:bg-black/4 transition-colors text-[15px]">
            Dashboard
          </Link>
          <Link href="/builder" className="btn-primary text-sm" style={{ height: '40px', padding: '0 18px' }}>
            <Zap className="w-3.5 h-3.5" />
            Start Building
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-[#6B7280] hover:text-[#111111] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F5F5EE] border-t border-[#E5E7EB] px-6 py-5 space-y-1">
          {navItems.map((item) => (
            <a key={item} href="#" className="block px-3 py-2.5 rounded-xl text-[#4B5563] hover:text-[#111111] hover:bg-black/4 transition-colors font-medium text-[15px]">
              {item}
            </a>
          ))}
          <div className="pt-4 border-t border-[#E5E7EB] flex flex-col gap-3 mt-4">
            <Link href="/dashboard" className="btn-secondary text-center" onClick={() => setMobileOpen(false)}>
              Dashboard
            </Link>
            <Link href="/builder" className="btn-primary justify-center" onClick={() => setMobileOpen(false)}>
              <Zap className="w-4 h-4" /> Start Building
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};