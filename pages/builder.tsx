import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  ArrowLeft, Zap, Save, Eye, Code, Smartphone, Monitor, Tablet,
  RefreshCw, Download, Share2, Play, Send, Settings, ChevronDown,
  Copy, CheckCircle, Sparkles, MoreHorizontal, Terminal, Layers,
  GitBranch, Globe, X, Plus, MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { withAuth } from '@/contexts/AuthContext';

type ViewMode = 'preview' | 'code' | 'chat';
type DeviceMode = 'desktop' | 'tablet' | 'mobile';

const sampleApps: Record<string, { name: string; code: string; description: string }> = {
  default: {
    name: 'My App',
    description: 'AI-generated application',
    code: `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-white text-center max-w-md w-full border border-white/20">
        <div className="text-6xl mb-6">✨</div>
        <h1 className="text-4xl font-bold mb-4">Welcome to OneAtlas</h1>
        <p className="text-white/70 mb-8">Your AI-generated app is ready to customize</p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setCount(c => c - 1)}
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-2xl font-bold transition"
          >−</button>
          <span className="text-5xl font-bold w-20 text-center">{count}</span>
          <button
            onClick={() => setCount(c => c + 1)}
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-2xl font-bold transition"
          >+</button>
        </div>
        <button
          onClick={() => setCount(0)}
          className="px-8 py-3 bg-purple-500 hover:bg-purple-400 rounded-xl font-semibold transition w-full"
        >
          Reset
        </button>
      </div>
    </div>
  );
}`,
  },
};

const chatMessages = [
  { role: 'assistant', content: 'I\'ve generated your app! What would you like to change or add?', time: '2:34 PM' },
];

const generationSteps = [
  'Analyzing your prompt...',
  'Planning app architecture...',
  'Generating React components...',
  'Setting up routing & state...',
  'Connecting backend APIs...',
  'Finalizing & optimizing...',
];

function GeneratingOverlay({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= generationSteps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return prev;
        }
        return prev + 1;
      });
      setProgress((prev) => Math.min(prev + 100 / generationSteps.length, 100));
    }, 600);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 bg-dark-400/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center max-w-sm mx-auto px-8">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-primary-500/20" />
          <div
            className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"
            style={{ transition: 'none' }}
          />
          <div className="absolute inset-2 rounded-full bg-primary-500/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary-400" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">Building your app</h3>
        <p className="text-primary-400 text-sm mb-6 h-5 transition-all">
          {generationSteps[step]}
        </p>
        <div className="progress-bar h-1.5 rounded-full mb-2">
          <div
            className="progress-fill h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-slate-600">{Math.round(progress)}% complete</div>
      </div>
    </div>
  );
}

function Builder() {
  const router = useRouter();
  const { prompt, template } = router.query;
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [appName, setAppName] = useState('My App');
  const [activeView, setActiveView] = useState<ViewMode>('preview');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  const [promptValue, setPromptValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prompt) {
      const p = prompt as string;
      setPromptValue(p);
      setAppName(p.split(' ').slice(0, 4).join(' '));
      generateApp(p);
    } else {
      setGeneratedCode(sampleApps.default.code);
    }
  }, [prompt]);

  const generateApp = async (appPrompt: string) => {
    setIsGenerating(true);
    setGeneratedCode('');
    await new Promise((resolve) => setTimeout(resolve, 4000));
    setGeneratedCode(sampleApps.default.code);
    setIsGenerating(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user', content: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const aiMsg = {
      role: 'assistant',
      content: `Got it! I'll update the app to ${chatInput.toLowerCase()}. Regenerating...`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, aiMsg]);
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const deviceWidths = { desktop: '100%', tablet: '768px', mobile: '375px' };

  return (
    <div className="h-screen flex flex-col bg-dark-400 overflow-hidden">
      {/* Top Bar */}
      <header className="glass border-b border-white/5 h-14 flex items-center px-4 gap-4 flex-shrink-0 z-40">
        {/* Left */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-px h-5 bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-500 to-accent-pink flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
          </div>
          <input
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="bg-transparent border-0 text-white font-semibold text-sm focus:outline-none hover:text-primary-300 transition w-40"
            id="app-name-input"
          />
        </div>

        {/* Center - Device Switcher */}
        <div className="flex-1 flex items-center justify-center">
          <div className="tab-bar flex">
            {([
              { mode: 'desktop' as DeviceMode, icon: Monitor },
              { mode: 'tablet' as DeviceMode, icon: Tablet },
              { mode: 'mobile' as DeviceMode, icon: Smartphone },
            ]).map(({ mode, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setDeviceMode(mode)}
                className={`tab-item p-2 ${deviceMode === mode ? 'active' : ''}`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => generateApp(promptValue || 'app')}
            disabled={isGenerating}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition">
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              saved ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'btn-primary'
            }`}
          >
            {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'Saved!' : 'Save & Deploy'}
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Prompt/Chat */}
        {isSidebarOpen && (
          <aside className="w-80 sidebar border-r border-white/5 flex flex-col flex-shrink-0">
            {/* Panel Tabs */}
            <div className="flex border-b border-white/5">
              {[
                { id: 'chat' as ViewMode, label: 'Chat', icon: MessageSquare },
                { id: 'code' as ViewMode, label: 'Code', icon: Code },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveView(id === activeView ? 'preview' : id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition border-b-2 ${
                    activeView === id
                      ? 'border-primary-500 text-primary-400'
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {activeView === 'code' ? (
              /* Code Panel */
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                  <span className="text-xs text-slate-500 font-mono">App.tsx</span>
                  <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition">
                    {copied ? <CheckCircle className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="flex-1 overflow-auto p-4 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
                  {generatedCode || '// Your code will appear here'}
                </pre>
              </div>
            ) : (
              /* Chat Panel */
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {/* Prompt Context */}
                  {promptValue && (
                    <div className="glass-light border border-white/8 rounded-xl p-3">
                      <div className="text-xs text-slate-500 mb-1">Prompt</div>
                      <p className="text-sm text-slate-300">{promptValue}</p>
                    </div>
                  )}

                  {/* Messages */}
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                      {msg.role === 'assistant' && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-accent-pink flex items-center justify-center flex-shrink-0">
                          <Zap className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                      <div className={`max-w-[75%] rounded-xl px-3 py-2.5 text-sm ${
                        msg.role === 'user'
                          ? 'bg-primary-500/20 border border-primary-500/20 text-white'
                          : 'glass-light border border-white/8 text-slate-300'
                      }`}>
                        {msg.content}
                        <div className="text-xs text-slate-600 mt-1">{msg.time}</div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-white/5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                      placeholder="Ask for changes..."
                      id="chat-input"
                      className="flex-1 input-dark px-3 py-2 text-sm"
                    />
                    <button
                      onClick={handleChatSend}
                      className="p-2 rounded-lg bg-primary-500/20 border border-primary-500/30 text-primary-400 hover:bg-primary-500/30 transition"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick suggestions */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {['Add dark mode', 'Add charts', 'Make it mobile-friendly'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setChatInput(s)}
                        className="px-2.5 py-1 rounded-full text-xs bg-white/5 border border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10 transition"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </aside>
        )}

        {/* Preview Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Preview Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-dark-300/50">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/8 text-xs text-slate-500 font-mono">
                <Globe className="w-3 h-3" />
                myapp.oneatlas.app
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 px-3 py-1.5 rounded-lg hover:bg-white/5 transition">
                <Play className="w-3.5 h-3.5" />
                Preview live
              </button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-hidden flex items-center justify-center p-6 bg-dark-500/30">
            {isGenerating && (
              <GeneratingOverlay onComplete={() => setIsGenerating(false)} />
            )}

            <div
              className="h-full transition-all duration-500 overflow-hidden rounded-xl border border-white/10 shadow-2xl relative"
              style={{
                width: deviceWidths[deviceMode],
                maxWidth: '100%',
              }}
            >
              {/* Mock browser frame for desktop */}
              {deviceMode !== 'mobile' && (
                <div className="bg-dark-200 border-b border-white/10 px-4 py-2.5 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 px-3 py-1 bg-white/5 rounded-md text-xs text-slate-600 font-mono text-center">
                    myapp.oneatlas.app
                  </div>
                </div>
              )}

              {/* App preview iframe simulation */}
              <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 h-full flex items-center justify-center overflow-auto">
                {generatedCode ? (
                  <div className="text-center text-white p-8 w-full h-full flex flex-col items-center justify-center">
                    <div className="text-8xl mb-8 animate-float">✨</div>
                    <h1 className="text-4xl font-bold mb-4">{appName}</h1>
                    <p className="text-white/60 mb-10 max-w-md">
                      Your AI-generated app is ready! Use the chat panel to make changes.
                    </p>
                    <div className="flex items-center gap-4 mb-8">
                      <button
                        className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 text-2xl font-bold transition backdrop-blur-sm"
                      >−</button>
                      <span className="text-6xl font-bold w-24 text-center">0</span>
                      <button
                        className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 text-2xl font-bold transition backdrop-blur-sm"
                      >+</button>
                    </div>
                    <button className="px-8 py-3 bg-purple-500 hover:bg-purple-400 rounded-xl font-semibold transition">
                      Reset
                    </button>
                  </div>
                ) : (
                  <div className="text-slate-500 text-sm">Preview will appear here</div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Right Panel - Tools */}
        <aside className="w-12 sidebar border-l border-white/5 flex flex-col items-center py-4 gap-3">
          {[
            { icon: Layers, label: 'Layers' },
            { icon: Settings, label: 'Settings' },
            { icon: GitBranch, label: 'Version History' },
            { icon: Terminal, label: 'Console' },
            { icon: Download, label: 'Export' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              title={label}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-300 hover:bg-white/5 transition"
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </aside>
      </div>
    </div>
  );
}

export default withAuth(Builder);