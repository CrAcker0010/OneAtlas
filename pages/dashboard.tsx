import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  LayoutDashboard, Zap, Plus, Search, Bell, Settings,
  Globe, MoreHorizontal, TrendingUp, Users, Clock, Star, ArrowUpRight,
  Filter, Grid, List, Rocket, Eye, Edit3, ExternalLink, LogOut, ChevronDown,
  LucideIcon
} from 'lucide-react';

const projects = [
  { id: 1, name: 'AI Sales CRM',      description: 'Customer relationship management with AI-powered insights',     status: 'live',     url: 'ai-sales-crm.oneatlas.app',   lastUpdated: '2h ago',   users: 142,  views: 3.2,  icon: '💼' },
  { id: 2, name: 'Content Platform',  description: 'AI content generation and multi-platform publishing',            status: 'live',     url: 'content.oneatlas.app',         lastUpdated: '1d ago',   users: 89,   views: 1.8,  icon: '✍️' },
  { id: 3, name: 'Task Dashboard',    description: 'Team project management with sprint planning',                  status: 'draft',    url: '',                             lastUpdated: '3d ago',   users: 0,    views: 0,    icon: '✅' },
  { id: 4, name: 'Analytics Hub',     description: 'Real-time business intelligence and reporting',                 status: 'building', url: '',                             lastUpdated: 'Just now', users: 0,    views: 0,    icon: '📊' },
  { id: 5, name: 'E-Commerce Store',  description: 'Online store with inventory and Stripe payments',               status: 'live',     url: 'mystore.oneatlas.app',         lastUpdated: '5d ago',   users: 367,  views: 12.4, icon: '🛒' },
  { id: 6, name: 'AI Chat Bot',       description: 'GPT-4 powered customer support chatbot',                        status: 'live',     url: 'chatbot.oneatlas.app',         lastUpdated: '12h ago',  users: 521,  views: 8.7,  icon: '🤖' },
];

type SidebarItem = { id: string; icon: LucideIcon; label: string; badge?: string; href?: string; };

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'projects',   icon: Rocket,          label: 'Projects',   badge: '6' },
  { id: 'templates',  icon: Star,            label: 'Templates',  href: '/templates' },
  { id: 'team',       icon: Users,           label: 'Team' },
  { id: 'domains',    icon: Globe,           label: 'Domains' },
  { id: 'analytics',  icon: TrendingUp,      label: 'Analytics' },
  { id: 'settings',   icon: Settings,        label: 'Settings' },
];

const statsConfig = [
  { label: 'Active Projects', value: '6',      change: '+2 this month',       icon: Rocket },
  { label: 'Total Users',     value: '1,219',  change: '+24% from last month', icon: Users },
  { label: 'Page Views',      value: '28.4k',  change: '+12% from last week',  icon: Eye },
  { label: 'Credits Used',    value: '145/200', change: '55 remaining',         icon: Zap },
];

function DashboardPage() {
  const router = useRouter();
  const user = { name: 'Demo User', email: 'demo@oneatlas.app', plan: 'builder', creditsUsed: 145, creditsTotal: 200 };
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const filtered = projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const creditsUsed = user?.creditsUsed ?? 0;
  const creditsTotal = user?.creditsTotal ?? 30;
  const creditPct = Math.min((creditsUsed / creditsTotal) * 100, 100);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':     return <span className="status-live">Live</span>;
      case 'draft':    return <span className="status-draft">Draft</span>;
      case 'building': return <span className="status-building">Building</span>;
      default:         return null;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: '#F5F5EE' }}>

      {/* Sidebar */}
      <aside className="w-60 sidebar flex flex-col flex-shrink-0">
        {/* Brand */}
        <div className="h-14 flex items-center px-4 border-b border-[#E5E7EB]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-[#FF6600] flex items-center justify-center transition-opacity group-hover:opacity-80">
              <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-[#111111] tracking-tight">OneAtlas</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            if (item.href) {
              return (
                <Link key={item.id} href={item.href} className="sidebar-item">
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto text-xs bg-[#F3F4F6] text-[#6B7280] px-1.5 py-0.5 rounded-md">{item.badge}</span>
                  )}
                </Link>
              );
            }
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
                {item.badge && (
                  <span className="ml-auto text-xs bg-[#F3F4F6] text-[#6B7280] px-1.5 py-0.5 rounded-md">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Credits + User */}
        <div className="p-3 border-t border-[#E5E7EB]">
          {/* Credits */}
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#9CA3AF] font-medium">Credits</span>
              <span className="text-xs text-[#111111] font-semibold">{creditsUsed}/{creditsTotal}</span>
            </div>
            <div className="progress-bar h-1.5 mb-3">
              <div className="progress-fill h-full transition-all duration-700" style={{ width: `${creditPct}%` }} />
            </div>
            <Link href="/pricing" className="text-xs text-[#FF6600] hover:text-[#E65C00] transition flex items-center gap-1">
              Upgrade plan <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-[#F3F4F6] transition"
            >
              <div className="w-8 h-8 rounded-full bg-[#FF6600] flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-sm font-semibold text-[#111111] truncate">{user?.name ?? 'User'}</div>
                <div className="text-xs text-[#9CA3AF] capitalize">{user?.plan ?? 'explorer'} plan</div>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#9CA3AF] transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {showUserMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-[#E5E7EB] rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-1 z-50">
                <div className="px-3 py-2 border-b border-[#E5E7EB] mb-1">
                  <div className="text-xs text-[#9CA3AF] truncate">{user?.email}</div>
                </div>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#6B7280] hover:text-[#111111] hover:bg-[#F9FAFB] transition">
                  <Settings className="w-4 h-4" />
                  Account Settings
                </button>
                <button
                  onClick={() => router.push('/')}
                  id="logout-btn"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#EF4444] hover:bg-[#FEF2F2] transition"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-[#E5E7EB] flex items-center px-6 gap-4 flex-shrink-0">
          <div className="hidden md:block">
            <span className="text-[#9CA3AF] text-sm">
              Good morning, <span className="text-[#111111] font-semibold">{user?.name?.split(' ')[0] ?? 'there'}</span> 👋
            </span>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full input-dark pl-9 pr-4 py-2 text-sm"
              style={{ height: '36px' }}
              id="dashboard-search"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2 rounded-lg text-[#9CA3AF] hover:text-[#111111] hover:bg-[#F9FAFB] transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#FF6600] rounded-full" />
            </button>
            <div className="w-px h-5 bg-[#E5E7EB]" />
            <Link href="/builder" className="btn-primary text-sm" style={{ height: '36px', padding: '0 16px' }}>
              <Plus className="w-4 h-4" />
              New Project
            </Link>
          </div>
        </header>

        {/* Content */}
        {activeTab === 'dashboard' || activeTab === 'projects' ? (
          <main className="flex-1 overflow-auto p-6" onClick={() => showUserMenu && setShowUserMenu(false)}>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {statsConfig.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#9CA3AF]" />
                      </div>
                      <TrendingUp className="w-4 h-4 text-[#22C55E]" />
                    </div>
                    <div className="text-2xl font-bold text-[#111111] mb-1 tracking-tight">{stat.value}</div>
                    <div className="text-xs text-[#9CA3AF] font-medium">{stat.label}</div>
                    <div className="text-xs text-[#22C55E] mt-1">{stat.change}</div>
                  </div>
                );
              })}
            </div>

            {/* Projects Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#111111] tracking-tight">Your Projects</h2>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#111111] bg-white border border-[#E5E7EB] px-3 py-1.5 rounded-lg transition">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <div className="flex bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
                  <button onClick={() => setViewMode('grid')} className={`p-1.5 transition ${viewMode === 'grid' ? 'bg-[#FFF4EE] text-[#FF6600]' : 'text-[#9CA3AF] hover:text-[#6B7280]'}`}>
                    <Grid className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-1.5 transition ${viewMode === 'list' ? 'bg-[#FFF4EE] text-[#FF6600]' : 'text-[#9CA3AF] hover:text-[#6B7280]'}`}>
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className={`grid gap-3 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {/* New Project Card */}
              <Link
                href="/builder"
                className={`bg-white border border-dashed border-[#D1D5DB] rounded-2xl hover:border-[#FF6600]/40 hover:bg-[#FFFBF8] transition group cursor-pointer flex ${
                  viewMode === 'grid' ? 'flex-col items-center justify-center py-12' : 'items-center px-6 py-5'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFF4EE] border border-[#FFD0B0] flex items-center justify-center group-hover:scale-105 transition">
                  <Plus className="w-5 h-5 text-[#FF6600]" />
                </div>
                <div className={viewMode === 'grid' ? 'mt-4 text-center' : 'ml-4'}>
                  <div className="font-semibold text-[#111111] group-hover:text-[#111111] transition text-sm">New Project</div>
                  <div className="text-sm text-[#9CA3AF] mt-0.5">Start with AI or a template</div>
                </div>
              </Link>

              {filtered.map((project) => (
                <div
                  key={project.id}
                  className={`bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden group transition-all duration-200 hover:border-[#D1D5DB] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] ${viewMode === 'list' ? 'flex items-center px-5 py-4' : ''}`}
                >
                  {viewMode === 'grid' ? (
                    <>
                      {/* Card header — flat, no colorful gradient */}
                      <div className="h-28 bg-[#F9FAFB] border-b border-[#E5E7EB] relative overflow-hidden flex items-center justify-center">
                        <div className="text-4xl">{project.icon}</div>
                        <div className="absolute top-3 right-3">
                          {getStatusBadge(project.status)}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-1.5">
                          <h3 className="font-semibold text-[#111111] text-sm">{project.name}</h3>
                          <button className="p-1 text-[#D1D5DB] hover:text-[#6B7280] opacity-0 group-hover:opacity-100 transition">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-[#9CA3AF] mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
                        {project.status === 'live' && (
                          <div className="flex items-center gap-4 text-xs text-[#9CA3AF] mb-4">
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{project.users}</span>
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{project.views}k</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{project.lastUpdated}</span>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Link
                            href={`/builder?project=${project.id}`}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111111] transition"
                          >
                            <Edit3 className="w-3 h-3" />
                            Edit
                          </Link>
                          {project.status === 'live' && (
                            <a
                              href={`https://${project.url}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-2 rounded-xl text-xs text-[#9CA3AF] hover:text-[#111111] bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#D1D5DB] transition flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center text-xl flex-shrink-0 mr-4">
                        {project.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-0.5">
                          <span className="font-semibold text-[#111111] text-sm">{project.name}</span>
                          {getStatusBadge(project.status)}
                        </div>
                        <p className="text-sm text-[#9CA3AF] truncate">{project.description}</p>
                      </div>
                      <div className="flex items-center gap-6 mx-8 text-xs text-[#9CA3AF]">
                        {project.status === 'live' && <><span>{project.users} users</span><span>{project.views}k views</span></>}
                        <span>{project.lastUpdated}</span>
                      </div>
                      <Link
                        href={`/builder?project=${project.id}`}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[#FF6600] bg-[#FFF4EE] hover:bg-[#FFE4CC] border border-[#FFD0B0] transition"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </Link>
                    </>
                  )}
                </div>
              ))}
            </div>
          </main>
        ) : (
          <main className="flex-1 flex flex-col items-center justify-center p-6 text-center" onClick={() => showUserMenu && setShowUserMenu(false)}>
            <div className="w-14 h-14 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center mb-5">
              {(() => {
                const activeItem = sidebarItems.find(i => i.id === activeTab);
                const Icon = activeItem?.icon || LayoutDashboard;
                return <Icon className="w-7 h-7 text-[#9CA3AF]" />;
              })()}
            </div>
            <h2 className="text-xl font-bold text-[#111111] mb-2 capitalize tracking-tight">{activeTab}</h2>
            <p className="text-[#9CA3AF] max-w-sm mb-6 leading-relaxed text-sm">
              This section is coming soon. Check back shortly for updates to the {activeTab} features.
            </p>
            <button onClick={() => setActiveTab('dashboard')} className="btn-secondary text-sm" style={{ height: '40px' }}>
              Return to Dashboard
            </button>
          </main>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
