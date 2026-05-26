import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  ArrowLeft, Zap, Save, Eye, Code, Smartphone, Monitor, Tablet,
  RefreshCw, Share2, Play, Send, Settings, CheckCircle, Sparkles,
  Terminal, Layers, GitBranch, Globe, Download, MessageSquare,
  Folder, FolderOpen, FileCode, Copy,
} from 'lucide-react';
import Link from 'next/link';
import Editor from '@monaco-editor/react';

/* ─── iframe srcDoc builder ───────────────────────────────── */
const getSrcDoc = (code: string) => {
  let stripped = code.replace(/import\s+.*?\s+from\s+['"].*?['"];?/g, '');
  let componentName = 'App';
  const m1 = code.match(/export\s+default\s+function\s+(\w+)/);
  if (m1?.[1]) componentName = m1[1];
  else {
    const m2 = code.match(/export\s+default\s+(\w+)/);
    if (m2?.[1] && m2[1] !== 'function') componentName = m2[1];
  }
  stripped = stripped
    .replace(/export\s+default\s+function\s+/g, 'function ')
    .replace(/export\s+default\s+/g, 'const AppComponent = ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>body{margin:0;padding:0;background:#F5F5EE;font-family:Inter,sans-serif;}</style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    ${stripped}
    try {
      const root = ReactDOM.createRoot(document.getElementById('root'));
      const T = typeof App!=='undefined'?App:(typeof ${componentName}!=='undefined'?${componentName}:(typeof AppComponent!=='undefined'?AppComponent:null));
      if(T) root.render(React.createElement(T));
      else root.render(React.createElement('div',{style:{padding:32,color:'#EF4444'}},'Could not find component to render.'));
    } catch(e) {
      document.getElementById('root').innerHTML='<div style="padding:32px;color:#EF4444">Render Error: '+e.message+'</div>';
    }
  </script>
</body>
</html>`;
};

/* ─── types ───────────────────────────────────────────────── */
type ViewMode   = 'preview' | 'code' | 'chat';
type DeviceMode = 'desktop' | 'tablet' | 'mobile';

/* ─── initial state ───────────────────────────────────────── */
const INITIAL_CODE = `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{background:'#F5F5EE'}}>
      <div className="bg-white rounded-3xl p-12 text-center max-w-md w-full border border-[#E5E7EB] shadow-sm">
        <div className="text-5xl mb-6">✨</div>
        <h1 className="text-3xl font-bold mb-2 text-[#111111]">Welcome to OneAtlas</h1>
        <p className="text-[#6B7280] mb-8">Your AI-generated app is ready to customize</p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <button onClick={()=>setCount(c=>c-1)} className="w-12 h-12 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-2xl font-bold transition text-[#374151]">−</button>
          <span className="text-5xl font-bold w-20 text-center text-[#111111]">{count}</span>
          <button onClick={()=>setCount(c=>c+1)} className="w-12 h-12 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-2xl font-bold transition text-[#374151]">+</button>
        </div>
        <button onClick={()=>setCount(0)} className="px-8 py-3 bg-[#FF6600] hover:bg-[#E65C00] text-white rounded-xl font-semibold transition w-full">Reset</button>
      </div>
    </div>
  );
}`;

const INITIAL_FILES: Record<string, string> = {
  'src/App.tsx':      INITIAL_CODE,
  'src/index.css':    `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\nbody {\n  margin: 0;\n  font-family: 'Inter', -apple-system, sans-serif;\n  background: #F5F5EE;\n}`,
  'package.json':     `{\n  "name": "oneatlas-generated-app",\n  "version": "0.1.0",\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0",\n    "lucide-react": "^0.294.0"\n  },\n  "scripts": { "dev": "vite", "build": "tsc && vite build" }\n}`,
  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],\n  theme: { extend: {} },\n  plugins: [],\n};`,
  'tsconfig.json':    `{\n  "compilerOptions": {\n    "target": "ES2020",\n    "lib": ["DOM","DOM.Iterable","ES2020"],\n    "module": "ESNext",\n    "jsx": "react-jsx",\n    "strict": true\n  },\n  "include": ["src"]\n}`,
};

const GEN_STEPS = [
  'Analyzing your prompt…',
  'Planning app architecture…',
  'Generating React components…',
  'Setting up routing & state…',
  'Connecting backend APIs…',
  'Finalizing & optimizing…',
];

/* ─── GeneratingOverlay ───────────────────────────────────── */
function GeneratingOverlay({ onComplete }: { onComplete: () => void }) {
  const [step, setStep]       = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setStep(p => {
        if (p >= GEN_STEPS.length - 1) { clearInterval(iv); setTimeout(onComplete, 400); return p; }
        return p + 1;
      });
      setProgress(p => Math.min(p + 100 / GEN_STEPS.length, 100));
    }, 600);
    return () => clearInterval(iv);
  }, [onComplete]);

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(245,245,238,0.96)', backdropFilter: 'blur(4px)' }}
    >
      <div className="text-center max-w-xs mx-auto px-8">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-[#E5E7EB]" />
          <div
            className="absolute inset-0 rounded-full border-2 border-t-[#FF6600] border-r-transparent border-b-transparent border-l-transparent"
            style={{ animation: 'spin 0.8s linear infinite' }}
          />
          <div className="absolute inset-2 rounded-full bg-[#FFF4EE] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#FF6600]" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-[#111111] mb-2">Building your app</h3>
        <p className="text-[#9CA3AF] text-sm mb-5 transition-all" style={{ minHeight: '20px' }}>
          {GEN_STEPS[step]}
        </p>
        <div className="progress-bar h-1.5 mb-2">
          <div className="progress-fill h-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-xs text-[#9CA3AF]">{Math.round(progress)}% complete</div>
      </div>
    </div>
  );
}

/* ─── constants ───────────────────────────────────────────── */
const DEVICE_WIDTHS: Record<DeviceMode, string> = {
  desktop: '100%',
  tablet:  '768px',
  mobile:  '390px',
};

const RIGHT_TOOLS = [
  { icon: Layers,    label: 'Layers'   },
  { icon: Settings,  label: 'Settings' },
  { icon: GitBranch, label: 'Versions' },
  { icon: Terminal,  label: 'Console'  },
  { icon: Download,  label: 'Export'   },
];

/* ─── main component ──────────────────────────────────────── */
export default function Builder() {
  const router            = useRouter();
  const { prompt }        = router.query;

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(INITIAL_CODE);
  const [appName, setAppName]           = useState('My App');
  const [activeView, setActiveView]     = useState<ViewMode>('preview');
  const [deviceMode, setDeviceMode]     = useState<DeviceMode>('desktop');
  const [copied, setCopied]             = useState(false);
  const [saved, setSaved]               = useState(false);
  const [chatInput, setChatInput]       = useState('');
  const [messages, setMessages]         = useState([
    { role: 'assistant', content: "I've generated your app! What would you like to change or add?", time: 'Just now' },
  ]);
  const [promptValue, setPromptValue]   = useState('');
  const [activeTool, setActiveTool]     = useState<string | null>(null);
  const [files, setFiles]               = useState<Record<string, string>>(INITIAL_FILES);
  const [selectedFile, setSelectedFile] = useState('src/App.tsx');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({ src: true, public: false });
  const chatEndRef = useRef<HTMLDivElement>(null);

  /* sync generatedCode → files */
  useEffect(() => {
    if (generatedCode) setFiles(prev => ({ ...prev, 'src/App.tsx': generatedCode }));
  }, [generatedCode]);

  /* handle ?prompt= query param */
  useEffect(() => {
    if (prompt) {
      const p = prompt as string;
      setPromptValue(p);
      setAppName(p.split(' ').slice(0, 4).join(' '));
      generateApp(p);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt]);

  const toggleFolder = (f: string) =>
    setExpandedFolders(prev => ({ ...prev, [f]: !prev[f] }));

  const generateApp = async (appPrompt: string) => {
    setIsGenerating(true);
    try {
      const res  = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: appPrompt }),
      });
      const data = await res.json();
      if (data.success && data.data?.generatedCode) setGeneratedCode(data.data.generatedCode);
      else alert(data.error || 'Failed to generate app');
    } catch (e) {
      console.error(e);
      alert('An error occurred while generating the app.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(files[selectedFile] ?? '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    const time    = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { role: 'user', content: chatInput, time };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsGenerating(true);
    try {
      const combined = `Original request: ${promptValue}\nUpdate: ${userMsg.content}\n\nCurrent code:\n${generatedCode}\n\nProvide the complete updated React component code.`;
      const res  = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: combined }),
      });
      const data = await res.json();
      if (data.success && data.data?.generatedCode) {
        setGeneratedCode(data.data.generatedCode);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I've updated your app based on your request. Check the preview!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);
      } else {
        alert(data.error || 'Failed to update app');
      }
    } catch (e) {
      console.error(e);
      alert('An error occurred.');
    } finally {
      setIsGenerating(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  /* ── render ─────────────────────────────────────────────── */
  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#F5F5EE' }}>

      {/* ── TOP BAR ─────────────────────────────────────────── */}
      <header className="bg-white border-b border-[#E5E7EB] h-14 flex items-center px-4 gap-3 flex-shrink-0 z-40">

        {/* Left */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-1.5 text-[#9CA3AF] hover:text-[#111111] transition rounded-lg hover:bg-[#F3F4F6]">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-px h-5 bg-[#E5E7EB]" />
          <div className="w-6 h-6 rounded-md bg-[#FF6600] flex items-center justify-center flex-shrink-0">
            <Zap className="w-3 h-3 text-white" />
          </div>
          <input
            id="app-name-input"
            type="text"
            value={appName}
            onChange={e => setAppName(e.target.value)}
            className="bg-transparent border-0 text-[#111111] font-semibold text-sm focus:outline-none hover:text-[#FF6600] transition w-40"
          />
        </div>

        {/* Centre — view + device switchers */}
        <div className="flex-1 flex items-center justify-center gap-2">
          {/* View tabs */}
          <div className="flex bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-1 gap-0.5">
            {([
              { id: 'preview' as ViewMode, icon: Eye,           label: 'Preview' },
              { id: 'code'    as ViewMode, icon: Code,          label: 'Code'    },
              { id: 'chat'    as ViewMode, icon: MessageSquare, label: 'Chat'    },
            ] as const).map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveView(id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background:  activeView === id ? '#FFFFFF' : 'transparent',
                  color:       activeView === id ? '#111111' : '#9CA3AF',
                  boxShadow:   activeView === id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  border:      activeView === id ? '1px solid #E5E7EB' : '1px solid transparent',
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Device switcher — preview only */}
          {activeView === 'preview' && (
            <div className="flex bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-1 gap-0.5">
              {([
                { mode: 'desktop' as DeviceMode, icon: Monitor   },
                { mode: 'tablet'  as DeviceMode, icon: Tablet    },
                { mode: 'mobile'  as DeviceMode, icon: Smartphone },
              ] as const).map(({ mode, icon: Icon }) => (
                <button
                  key={mode}
                  onClick={() => setDeviceMode(mode)}
                  className="p-1.5 rounded-lg transition-all"
                  style={{
                    background: deviceMode === mode ? '#FFFFFF' : 'transparent',
                    color:      deviceMode === mode ? '#FF6600' : '#9CA3AF',
                    boxShadow:  deviceMode === mode ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    border:     deviceMode === mode ? '1px solid #E5E7EB' : '1px solid transparent',
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => generateApp(promptValue || 'a simple app')}
            disabled={isGenerating}
            title="Regenerate"
            className="p-2 rounded-lg text-[#9CA3AF] hover:text-[#111111] hover:bg-[#F3F4F6] transition"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          </button>
          <button title="Share" className="p-2 rounded-lg text-[#9CA3AF] hover:text-[#111111] hover:bg-[#F3F4F6] transition">
            <Share2 className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-[#E5E7EB]" />
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
            style={saved
              ? { background: '#F0FDF4', color: '#15803D', border: '1px solid #BBF7D0' }
              : { background: '#FF6600', color: '#FFFFFF',  border: 'none' }
            }
          >
            {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'Saved!' : 'Save & Deploy'}
          </button>
        </div>
      </header>

      {/* ── BODY ────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── CHAT VIEW ─────────────────────────────────────── */}
        {activeView === 'chat' && (
          <aside className="flex-1 flex flex-col bg-white border-r border-[#E5E7EB]">
            <div className="flex-1 overflow-auto p-5 space-y-4">
              {promptValue && (
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-2">Original prompt</p>
                  <p className="text-sm text-[#374151] leading-relaxed">{promptValue}</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-[#FF6600] flex items-center justify-center flex-shrink-0">
                      <Zap className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className="max-w-[75%] rounded-xl px-4 py-3 text-sm leading-relaxed"
                    style={msg.role === 'user'
                      ? { background: '#FFF4EE', border: '1px solid #FFD0B0', color: '#111111' }
                      : { background: '#F9FAFB', border: '1px solid #E5E7EB', color: '#374151' }
                    }
                  >
                    {msg.content}
                    <div className="text-xs text-[#9CA3AF] mt-1.5">{msg.time}</div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t border-[#E5E7EB]">
              <div className="flex gap-2 mb-3">
                <input
                  id="chat-input"
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleChatSend()}
                  placeholder="Ask for changes…"
                  className="flex-1 input-dark px-3 py-2.5 text-sm"
                />
                <button
                  onClick={handleChatSend}
                  className="p-2.5 rounded-xl bg-[#FF6600] text-white hover:bg-[#E65C00] transition flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Add dark mode', 'Add charts', 'Make mobile-friendly'].map(s => (
                  <button
                    key={s}
                    onClick={() => setChatInput(s)}
                    className="px-3 py-1 rounded-full text-xs bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280] hover:text-[#111111] hover:border-[#D1D5DB] transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* ── CODE VIEW ─────────────────────────────────────── */}
        {activeView === 'code' && (
          <div className="flex-1 flex overflow-hidden">

            {/* File explorer */}
            <div className="w-48 bg-[#F9FAFB] border-r border-[#E5E7EB] overflow-y-auto flex-shrink-0">
              <div className="px-3 py-3 border-b border-[#E5E7EB]">
                <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">Files</p>
              </div>

              {/* Folders */}
              {['src', 'public'].map(folder => (
                <div key={folder}>
                  <button
                    onClick={() => toggleFolder(folder)}
                    className="flex items-center w-full py-1.5 px-3 hover:bg-[#F3F4F6] transition gap-1.5 text-[#6B7280] text-sm"
                  >
                    {expandedFolders[folder]
                      ? <FolderOpen className="w-3.5 h-3.5 text-[#FF6600]" />
                      : <Folder     className="w-3.5 h-3.5 text-[#9CA3AF]" />}
                    <span className="font-medium">{folder}</span>
                  </button>
                  {expandedFolders[folder] && (
                    <div className="ml-3 border-l border-[#E5E7EB] pl-2 pb-1">
                      {Object.keys(files)
                        .filter(f => f.startsWith(`${folder}/`))
                        .map(f => (
                          <button
                            key={f}
                            onClick={() => setSelectedFile(f)}
                            className="flex items-center w-full py-1.5 px-2 text-xs rounded-lg transition gap-1.5 my-0.5"
                            style={{
                              background: selectedFile === f ? '#FFF4EE' : 'transparent',
                              color:      selectedFile === f ? '#FF6600' : '#6B7280',
                            }}
                          >
                            <FileCode className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{f.replace(`${folder}/`, '')}</span>
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Root-level files */}
              <div className="mt-1 px-1">
                {Object.keys(files)
                  .filter(f => !f.includes('/'))
                  .map(f => (
                    <button
                      key={f}
                      onClick={() => setSelectedFile(f)}
                      className="flex items-center w-full py-1.5 px-2 text-xs rounded-lg transition gap-1.5 my-0.5"
                      style={{
                        background: selectedFile === f ? '#FFF4EE' : 'transparent',
                        color:      selectedFile === f ? '#FF6600' : '#6B7280',
                      }}
                    >
                      <FileCode className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{f}</span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Monaco editor */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E5E7EB] bg-white flex-shrink-0">
                <span className="text-xs text-[#9CA3AF] font-mono">{selectedFile}</span>
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-[#111111] transition">
                  {copied
                    ? <CheckCircle className="w-3.5 h-3.5 text-[#22C55E]" />
                    : <Copy        className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="flex-1 relative">
                <Editor
                  height="100%"
                  language={
                    selectedFile.endsWith('.tsx') || selectedFile.endsWith('.ts') ? 'typescript'
                    : selectedFile.endsWith('.css')  ? 'css'
                    : selectedFile.endsWith('.json') ? 'json'
                    : 'javascript'
                  }
                  theme="light"
                  value={files[selectedFile] ?? ''}
                  onChange={val => {
                    const v = val ?? '';
                    setFiles(prev => ({ ...prev, [selectedFile]: v }));
                    if (selectedFile === 'src/App.tsx') setGeneratedCode(v);
                  }}
                  options={{
                    minimap:               { enabled: false },
                    fontSize:              13,
                    wordWrap:              'on',
                    lineNumbersMinChars:   3,
                    scrollBeyondLastLine:  false,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── PREVIEW VIEW ──────────────────────────────────── */}
        {activeView === 'preview' && (
          <main className="flex-1 flex flex-col overflow-hidden relative">

            {/* URL bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#E5E7EB] bg-white flex-shrink-0">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#6B7280] font-mono">
                <Globe className="w-3 h-3" />
                myapp.oneatlas.app
              </div>
              <button className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#111111] px-3 py-1.5 rounded-lg hover:bg-[#F3F4F6] transition">
                <Play className="w-3.5 h-3.5" />
                Preview live
              </button>
            </div>

            {/* Canvas */}
            <div className="flex-1 overflow-hidden flex items-center justify-center p-6 bg-[#F3F4F6] relative">
              {isGenerating && (
                <GeneratingOverlay onComplete={() => setIsGenerating(false)} />
              )}

              <div
                className="h-full transition-all duration-500 overflow-hidden rounded-xl bg-white"
                style={{
                  width:    DEVICE_WIDTHS[deviceMode],
                  maxWidth: '100%',
                  border:   '1px solid #E5E7EB',
                  boxShadow:'0 1px 2px rgba(0,0,0,0.04),0 8px 32px rgba(0,0,0,0.08)',
                }}
              >
                {/* Browser chrome */}
                {deviceMode !== 'mobile' && (
                  <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] px-4 py-2.5 flex items-center gap-3 flex-shrink-0">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FECACA]" />
                      <div className="w-3 h-3 rounded-full bg-[#FEF08A]" />
                      <div className="w-3 h-3 rounded-full bg-[#BBF7D0]" />
                    </div>
                    <div className="flex-1 px-3 py-1 bg-white border border-[#E5E7EB] rounded-md text-xs text-[#9CA3AF] font-mono text-center">
                      myapp.oneatlas.app
                    </div>
                  </div>
                )}

                <div
                  className="overflow-hidden"
                  style={{ height: deviceMode !== 'mobile' ? 'calc(100% - 44px)' : '100%' }}
                >
                  {generatedCode ? (
                    <iframe
                      className="w-full h-full border-none"
                      srcDoc={getSrcDoc(generatedCode)}
                      sandbox="allow-scripts allow-same-origin"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-[#9CA3AF] text-sm">
                      Preview will appear here
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        )}

        {/* ── RIGHT TOOL STRIP ──────────────────────────────── */}
        <aside className="w-12 bg-white border-l border-[#E5E7EB] flex flex-col items-center py-4 gap-2 flex-shrink-0">
          {RIGHT_TOOLS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              title={label}
              onClick={() => setActiveTool(activeTool === label ? null : label)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{
                color:      activeTool === label ? '#FF6600' : '#9CA3AF',
                background: activeTool === label ? '#FFF4EE' : 'transparent',
                border:     activeTool === label ? '1px solid #FFD0B0' : '1px solid transparent',
              }}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </aside>

      </div>
    </div>
  );
}