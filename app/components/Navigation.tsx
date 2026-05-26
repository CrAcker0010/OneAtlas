import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronDown, Zap, Menu, X, Globe, Shield, Users, BarChart3, Cpu, Layers, LayoutDashboard } from 'lucide-react';

const megaMenus = {
  product: [
    { title: 'Backend Platform', icon: Cpu, desc: 'Deploy apps with backend built for AI agents', color: 'text-blue-400' },
    { title: 'Integrations', icon: Layers, desc: 'Discover integrations that plug into your app', color: 'text-purple-400' },
    { title: 'Global Deployment', icon: Globe, desc: 'Deploy worldwide with edge infrastructure', color: 'text-green-400' },
    { title: 'Security', icon: Shield, desc: 'Enterprise-grade security & compliance', color: 'text-pink-400' },
  ],
  'use cases': [
    { title: 'Productivity Tools', icon: BarChart3, desc: 'Workflows, task systems and business operations', color: 'text-orange-400' },
    { title: 'AI Agents', icon: Cpu, desc: 'Autonomous assistants and AI-powered workflows', color: 'text-blue-400' },
    { title: 'Internal Tools', icon: Layers, desc: 'Admin panels, dashboards and company systems', color: 'text-purple-400' },
    { title: 'Team Collaboration', icon: Users, desc: 'Shared workspaces and collaborative building', color: 'text-green-400' },
  ],
  templates: [
    { title: 'AI Chat Apps', icon: Cpu, desc: 'ChatGPT-style assistants and copilots', color: 'text-blue-400' },
    { title: 'Admin Dashboards', icon: BarChart3, desc: 'Analytics and operations interfaces', color: 'text-purple-400' },
    { title: 'Marketplace Apps', icon: Globe, desc: 'Two-sided marketplaces and listings', color: 'text-orange-400' },
    { title: 'Landing Pages', icon: Layers, desc: 'Marketing sites and startup launch pages', color: 'text-pink-400' },
  ],
};

export const Navigation = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Product', 'Use Cases', 'Templates', 'Enterprise', 'Pricing'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary-500 to-accent-pink blur-sm opacity-70 group-hover:opacity-100 transition" />
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-pink flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <span className="font-bold text-xl text-white tracking-tight">OneAtlas</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item}
                className="relative group"
                onMouseEnter={() => setOpenMenu(item.toLowerCase())}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button className="btn-ghost flex items-center gap-1">
                  {item}
                  {megaMenus[item.toLowerCase() as keyof typeof megaMenus] && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openMenu === item.toLowerCase() ? 'rotate-180' : ''}`} />
                  )}
                </button>
                {openMenu === item.toLowerCase() && megaMenus[item.toLowerCase() as keyof typeof megaMenus] && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] glass rounded-2xl shadow-2xl mt-3 p-2 border border-white/10">
                    <div className="grid grid-cols-2 gap-1">
                      {megaMenus[item.toLowerCase() as keyof typeof megaMenus].map((subitem, idx) => {
                        const Icon = subitem.icon;
                        return (
                          <a key={idx} href="#" className="p-4 rounded-xl hover:bg-white/5 transition group/item flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-white/10 transition">
                              <Icon className={`w-4 h-4 ${subitem.color}`} />
                            </div>
                            <div>
                              <p className="font-semibold text-white text-sm mb-0.5">{subitem.title}</p>
                              <p className="text-xs text-slate-500 leading-snug">{subitem.desc}</p>
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
            <Link href="/dashboard" className="btn-ghost flex items-center gap-2">
              Dashboard
            </Link>
            <Link href="/builder" className="btn-primary flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4" />
              Start Building
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-slate-400 hover:text-white transition" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>


      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/5 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <a key={item} href="#" className="block px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition font-medium">
              {item}
            </a>
          ))}
          <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
            <Link href="/dashboard" className="btn-secondary text-center" onClick={() => setMobileOpen(false)}>Dashboard</Link>
            <Link href="/builder" className="btn-primary text-center flex items-center justify-center gap-2" onClick={() => setMobileOpen(false)}>
              <Zap className="w-4 h-4" /> Start Building
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};