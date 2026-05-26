import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  LayoutDashboard, Zap, Plus, Search, Bell, Settings,
  Globe, MoreHorizontal, TrendingUp, Users, Clock, Star, ArrowUpRight,
  Filter, Grid, List, Rocket, Eye, Edit3, ExternalLink, LogOut, ChevronDown
} from 'lucide-react';


const projects = [
  { id: 1, name: 'AI Sales CRM', description: 'Customer relationship management with AI-powered insights', status: 'live', url: 'ai-sales-crm.oneatlas.app', lastUpdated: '2h ago', users: 142, views: 3.2, gradient: 'from-blue-500/20 to-cyan-500/10', accent: '#3b82f6', icon: '💼' },
  { id: 2, name: 'Content Platform', description: 'AI content generation and multi-platform publishing', status: 'live', url: 'content.oneatlas.app', lastUpdated: '1d ago', users: 89, views: 1.8, gradient: 'from-purple-500/20 to-pink-500/10', accent: '#8b5cf6', icon: '✍️' },
  { id: 3, name: 'Task Dashboard', description: 'Team project management with sprint planning', status: 'draft', url: '', lastUpdated: '3d ago', users: 0, views: 0, gradient: 'from-green-500/20 to-emerald-500/10', accent: '#10b981', icon: '✅' },
  { id: 4, name: 'Analytics Hub', description: 'Real-time business intelligence and reporting', status: 'building', url: '', lastUpdated: 'Just now', users: 0, views: 0, gradient: 'from-orange-500/20 to-red-500/10', accent: '#f97316', icon: '📊' },
  { id: 5, name: 'E-Commerce Store', description: 'Online store with inventory and Stripe payments', status: 'live', url: 'mystore.oneatlas.app', lastUpdated: '5d ago', users: 367, views: 12.4, gradient: 'from-yellow-500/20 to-orange-500/10', accent: '#eab308', icon: '🛒' },
  { id: 6, name: 'AI Chat Bot', description: 'GPT-4 powered customer support chatbot', status: 'live', url: 'chatbot.oneatlas.app', lastUpdated: '12h ago', users: 521, views: 8.7, gradient: 'from-primary-500/20 to-accent-purple/10', accent: '#635bff', icon: '🤖' },
];

const sidebarItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'projects', icon: Rocket, label: 'Projects', badge: '6' },
  { id: 'templates', icon: Star, label: 'Templates', href: '/templates' },
  { id: 'team', icon: Users, label: 'Team' },
  { id: 'domains', icon: Globe, label: 'Domains' },
  { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

const statsConfig = [
  { label: 'Active Projects', value: '6', change: '+2 this month', icon: Rocket, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Total Users', value: '1,219', change: '+24% from last month', icon: Users, color: 'text-green-400', bg: 'bg-green-500/10' },
  { label: 'Page Views', value: '28.4k', change: '+12% from last week', icon: Eye, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { label: 'Credits Used', value: '145/200', change: '55 remaining', icon: Zap, color: 'text-orange-400', bg: 'bg-orange-500/10' },
];

const statusConfig = {
  live: { label: 'Live', color: 'text-green-400', bg: 'bg-green-500/10', dot: 'bg-green-400' },
  draft: { label: 'Draft', color: 'text-slate-400', bg: 'bg-white/5', dot: 'bg-slate-500' },
  building: { label: 'Building', color: 'text-yellow-400', bg: 'bg-yellow-500/10', dot: 'bg-yellow-400 animate-pulse' },
};

function DashboardPage() {
  const router = useRouter();
  const user = { name: 'Demo User', email: 'demo@oneatlas.app', plan: 'builder', creditsUsed: 145, creditsTotal: 200 };
  const logout = () => router.push('/');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const filtered = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Determine credits from user plan
  const creditsUsed = user?.creditsUsed ?? 0;
  const creditsTotal = user?.creditsTotal ?? 30;
  const creditPct = Math.min((creditsUsed / creditsTotal) * 100, 100);

  return (
    <div className="h-screen flex bg-dark-400 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 sidebar border-r border-white/5 flex flex-col">
        {/* Brand */}
        <div className="h-14 flex items-center px-4 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-pink flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-white">OneAtlas</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            if (item.href) {
              return (
                <Link key={item.id} href={item.href} className="sidebar-item">
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {item.badge && <span className="ml-auto text-xs bg-white/10 text-slate-400 px-1.5 py-0.5 rounded-md">{item.badge}</span>}
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
                {item.badge && <span className="ml-auto text-xs bg-white/10 text-slate-400 px-1.5 py-0.5 rounded-md">{item.badge}</span>}
              </button>
            );
          })}
        </nav>

        {/* Credits + User */}
        <div className="p-3 border-t border-white/5">
          {/* Credit bar */}
          <div className="glass-light border border-white/5 rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500">Credits</span>
              <span className="text-xs text-white font-medium">{creditsUsed}/{creditsTotal}</span>
            </div>
            <div className="progress-bar h-1.5 mb-3">
              <div className="progress-fill h-full transition-all duration-700" style={{ width: `${creditPct}%` }} />
            </div>
            <Link href="/pricing" className="text-xs text-primary-400 hover:text-primary-300 transition flex items-center gap-1">
              Upgrade plan <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-pink flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-sm font-medium text-white truncate">{user?.name ?? 'User'}</div>
                <div className="text-xs text-slate-500 capitalize">{user?.plan ?? 'explorer'} plan</div>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {showUserMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 glass border border-white/10 rounded-xl shadow-2xl p-1 z-50">
                <div className="px-3 py-2 border-b border-white/5 mb-1">
                  <div className="text-xs text-slate-500 truncate">{user?.email}</div>
                </div>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition">
                  <Settings className="w-4 h-4" />
                  Account Settings
                </button>
                <button
                  onClick={handleLogout}
                  id="logout-btn"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition"
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
        <header className="h-14 glass border-b border-white/5 flex items-center px-6 gap-4 flex-shrink-0">
          {/* Welcome message */}
          <div className="hidden md:block">
            <span className="text-slate-500 text-sm">
              Good morning, <span className="text-white font-medium">{user?.name?.split(' ')[0] ?? 'there'}</span> 👋
            </span>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full input-dark pl-10 pr-4 py-2 text-sm"
              id="dashboard-search"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="w-px h-5 bg-white/10" />
            <Link href="/builder" className="btn-primary flex items-center gap-2 text-sm py-2">
              <Plus className="w-4 h-4" />
              New Project
            </Link>
          </div>
        </header>

        {/* Content */}
        {activeTab === 'dashboard' || activeTab === 'projects' ? (
        <main className="flex-1 overflow-auto p-6" onClick={() => showUserMenu && setShowUserMenu(false)}>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsConfig.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="glass-card rounded-2xl border border-white/5 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-600">{stat.label}</div>
                  <div className="text-xs text-green-400 mt-1">{stat.change}</div>
                </div>
              );
            })}
          </div>

          {/* Projects Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Your Projects</h2>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white glass-light border border-white/5 px-3 py-2 rounded-lg transition">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <div className="flex rounded-lg glass-light border border-white/5 overflow-hidden">
                <button onClick={() => setViewMode('grid')} className={`p-2 transition ${viewMode === 'grid' ? 'bg-primary-500/20 text-primary-400' : 'text-slate-500 hover:text-slate-300'}`}>
                  <Grid className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 transition ${viewMode === 'list' ? 'bg-primary-500/20 text-primary-400' : 'text-slate-500 hover:text-slate-300'}`}>
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {/* New Project Card */}
            <Link
              href="/builder"
              className={`glass-light border border-dashed border-white/10 rounded-2xl hover:border-primary-500/30 hover:bg-primary-500/3 transition group cursor-pointer flex ${
                viewMode === 'grid' ? 'flex-col items-center justify-center py-12' : 'items-center px-6 py-5'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center group-hover:scale-110 transition">
                <Plus className="w-6 h-6 text-primary-400" />
              </div>
              <div className={viewMode === 'grid' ? 'mt-4 text-center' : 'ml-4'}>
                <div className="font-semibold text-slate-300 group-hover:text-white transition">New Project</div>
                <div className="text-sm text-slate-600">Start with AI or a template</div>
              </div>
            </Link>

            {filtered.map((project) => {
              const status = statusConfig[project.status as keyof typeof statusConfig];
              return (
                <div
                  key={project.id}
                  className={`glass-card border border-white/5 rounded-2xl overflow-hidden card-hover group ${viewMode === 'list' ? 'flex items-center px-5 py-4' : ''}`}
                >
                  {viewMode === 'grid' ? (
                    <>
                      <div className={`h-32 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 flex items-center justify-center text-5xl">{project.icon}</div>
                        <div className="absolute top-3 right-3">
                          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                            {status.label}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-bold text-white">{project.name}</h3>
                          <button className="p-1 text-slate-600 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 mb-4 line-clamp-2">{project.description}</p>
                        {project.status === 'live' && (
                          <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{project.users}</span>
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{project.views}k</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{project.lastUpdated}</span>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Link
                            href={`/builder?project=${project.id}`}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition"
                            style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}25` }}
                          >
                            <Edit3 className="w-3 h-3" />
                            Edit
                          </Link>
                          {project.status === 'live' && (
                            <a href={`https://${project.url}`} target="_blank" rel="noreferrer"
                              className="px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white glass-light border border-white/5 hover:border-white/10 transition flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-xl flex-shrink-0 mr-4`}>{project.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-0.5">
                          <span className="font-semibold text-white">{project.name}</span>
                          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${status.bg} ${status.color}`}>
                            <div className={`w-1 h-1 rounded-full ${status.dot}`} /> {status.label}
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 truncate">{project.description}</p>
                      </div>
                      <div className="flex items-center gap-6 mx-8 text-xs text-slate-500">
                        {project.status === 'live' && <><span>{project.users} users</span><span>{project.views}k views</span></>}
                        <span>{project.lastUpdated}</span>
                      </div>
                      <Link
                        href={`/builder?project=${project.id}`}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-primary-400 bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/20 transition"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </Link>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          </div>
        </main>
        ) : (
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center" onClick={() => showUserMenu && setShowUserMenu(false)}>
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
            {(() => {
              const activeItem = sidebarItems.find(i => i.id === activeTab);
              const Icon = activeItem?.icon || LayoutDashboard;
              return <Icon className="w-8 h-8 text-primary-400" />;
            })()}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 capitalize">{activeTab}</h2>
          <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
            This section is currently under construction. Check back soon for updates to the {activeTab} features.
          </p>
          <button onClick={() => setActiveTab('dashboard')} className="btn-secondary">
            Return to Dashboard
          </button>
        </main>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
