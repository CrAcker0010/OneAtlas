import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  ArrowLeft, Zap, Save, Eye, Code, Smartphone, Monitor, Tablet,
  RefreshCw, Download, Share2, Play, Send, Settings, ChevronDown,
  Copy, CheckCircle, Sparkles, MoreHorizontal, Terminal, Layers,
  GitBranch, Globe, X, Plus, MessageSquare, Folder, FolderOpen, FileCode, FileText, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import Editor from '@monaco-editor/react';

const getSrcDoc = (code: string) => {
  // Strip imports
  let strippedCode = code.replace(/import\s+.*?\s+from\s+['"].*?['"];?/g, '');
  
  // Try to find the default export name
  let componentName = 'App';
  const defaultExportMatch = code.match(/export\s+default\s+function\s+(\w+)/);
  if (defaultExportMatch && defaultExportMatch[1]) {
    componentName = defaultExportMatch[1];
  } else {
    // Check for anonymous or arrow default export
    const constMatch = code.match(/export\s+default\s+(\w+)/);
    if (constMatch && constMatch[1] && constMatch[1] !== 'function') {
      componentName = constMatch[1];
    }
  }

  // Remove the export default prefixes
  strippedCode = strippedCode
    .replace(/export\s+default\s+function\s+/g, 'function ')
    .replace(/export\s+default\s+/g, 'const AppComponent = ');

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/lucide@latest"></script>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #f8fafc; /* light theme slate-50 */
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          ${strippedCode}
          
          // Render the component
          try {
            const root = ReactDOM.createRoot(document.getElementById('root'));
            // Try to find and render the component
            const Target = typeof App !== 'undefined' ? App : 
                           (typeof ${componentName} !== 'undefined' ? ${componentName} : 
                           (typeof AppComponent !== 'undefined' ? AppComponent : null));
            if (Target) {
              root.render(<Target />);
            } else {
              root.render(<div className="p-8 text-center text-red-500 font-semibold">Could not find any component to render. Make sure to export default a React component.</div>);
            }
          } catch (e) {
            console.error('Failed to render component', e);
            document.getElementById('root').innerHTML = \`<div class="p-8 text-center text-red-500 font-semibold">Render Error: \${e.message}</div>\`;
          }
        </script>
      </body>
    </html>
  `;
};

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

const initialFiles: Record<string, string> = {
  'src/App.tsx': `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl p-12 text-slate-800 text-center max-w-md w-full border border-slate-200 shadow-xl">
        <div className="text-6xl mb-6">✨</div>
        <h1 className="text-4xl font-bold mb-4">Welcome to OneAtlas</h1>
        <p className="text-slate-500 mb-8">Your AI-generated app is ready to customize</p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setCount(c => c - 1)}
            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-2xl font-bold transition text-slate-700"
          >−</button>
          <span className="text-5xl font-bold w-20 text-center text-slate-800">{count}</span>
          <button
            onClick={() => setCount(c => c + 1)}
            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-2xl font-bold transition text-slate-700"
          >+</button>
        </div>
        <button
          onClick={() => setCount(0)}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition w-full"
        >
          Reset
        </button>
      </div>
    </div>
  );
}`,
  'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: 'Inter', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: #f8fafc;
}`,
  'package.json': `{
  "name": "oneatlas-generated-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.294.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}`,
  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          600: '#7c3aed',
        }
      }
    },
  },
  plugins: [],
}`,
  'public/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Generated App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
  'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}`
};

export default function Builder() {
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
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Virtual file system states
  const [files, setFiles] = useState<Record<string, string>>(initialFiles);
  const [selectedFile, setSelectedFile] = useState<string>('src/App.tsx');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'src': true,
    'public': true
  });

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  const handleEditorChange = (value: string | undefined) => {
    const val = value || '';
    setFiles(prev => ({
      ...prev,
      [selectedFile]: val
    }));
    if (selectedFile === 'src/App.tsx') {
      setGeneratedCode(val);
    }
  };

  // Sync generatedCode changes to virtual files
  useEffect(() => {
    if (generatedCode) {
      setFiles(prev => ({
        ...prev,
        'src/App.tsx': generatedCode
      }));
    }
  }, [generatedCode]);

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
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: appPrompt }),
      });
      const data = await res.json();
      if (data.success && data.data?.generatedCode) {
        setGeneratedCode(data.data.generatedCode);
      } else {
        alert(data.error || 'Failed to generate app');
      }
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
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user', content: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    
    // Call Groq API again with context
    setIsGenerating(true);
    try {
      // Create a combined prompt that incorporates the previous context and the new request
      const combinedPrompt = `Original request: ${promptValue}\nUpdate requested: ${userMsg.content}\n\nCurrent code:\n${generatedCode}\n\nPlease provide the complete updated React component code.`;
      
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: combinedPrompt }),
      });
      const data = await res.json();
      if (data.success && data.data?.generatedCode) {
        setGeneratedCode(data.data.generatedCode);
        const aiMsg = {
          role: 'assistant',
          content: `I've updated the code based on your request. Check out the preview!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        alert(data.error || 'Failed to update app');
      }
    } catch (e) {
      console.error(e);
      alert('An error occurred while updating the app.');
    } finally {
      setIsGenerating(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const deviceWidths = { desktop: '100%', tablet: '768px', mobile: '375px' };

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Top Bar */}
      <header className="glass border-b border-slate-200 h-14 flex items-center px-4 gap-4 flex-shrink-0 z-40">
        {/* Left */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-px h-5 bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-500 to-accent-pink flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
          </div>
          <input
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="bg-transparent border-0 text-slate-900 font-semibold text-sm focus:outline-none hover:text-primary-600 transition w-40"
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
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition">
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
          <aside className="w-80 sidebar border-r border-slate-200 flex flex-col flex-shrink-0">
            {/* Panel Tabs */}
            <div className="flex border-b border-slate-200">
              {[
                { id: 'chat' as ViewMode, label: 'Chat', icon: MessageSquare },
                { id: 'code' as ViewMode, label: 'Code', icon: Code },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveView(id === activeView ? 'preview' : id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition border-b-2 ${
                    activeView === id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {activeView === 'code' ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 flex">
                  <span className="text-xs text-slate-500 font-mono">{selectedFile}</span>
                  <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition">
                    {copied ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="flex flex-1 overflow-hidden">
                  {/* File Explorer */}
                  <div className="w-48 bg-slate-50 border-r border-slate-200 overflow-y-auto">
                    {['src','public'].map(folder => (
                      <div key={folder}>
                        <button
                          onClick={() => toggleFolder(folder)}
                          className="flex items-center w-full py-1 px-2 hover:bg-slate-100"
                        >
                          {expandedFolders[folder] ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
                          <span className="ml-1 capitalize">{folder}</span>
                        </button>
                        {expandedFolders[folder] && (
                          <div className="ml-4">
                            {Object.keys(files)
                              .filter(f => f.startsWith(`${folder}/`))
                              .map(f => (
                                <button
                                  key={f}
                                  onClick={() => setSelectedFile(f)}
                                  className={`flex items-center w-full py-0.5 px-2 text-sm rounded ${selectedFile === f ? 'bg-primary-100 text-primary-600' : 'hover:bg-slate-100'}`}
                                >
                                  <FileCode className="w-3 h-3 mr-1" />
                                  <span>{f.replace(`${folder}/`, '')}</span>
                                </button>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Editor */}
                  <div className="flex-1 relative">
                    <Editor
                      height="100%"
                      defaultLanguage={selectedFile.endsWith('.tsx') || selectedFile.endsWith('.ts') ? 'typescript' : 'javascript'}
                      theme="light"
                      value={files[selectedFile] ?? ''}
                      onChange={(val) => {
                        const newVal = val || '';
                        setFiles(prev => ({ ...prev, [selectedFile]: newVal }));
                        if (selectedFile === 'src/App.tsx') setGeneratedCode(newVal);
                      }}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: 'on',
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Chat Panel */
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {/* Prompt Context */}
                  {promptValue && (
                    <div className="glass-light border border-slate-200 rounded-xl p-3">
                      <div className="text-xs text-slate-500 mb-1">Prompt</div>
                      <p className="text-sm text-slate-700">{promptValue}</p>
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
                          ? 'bg-primary-500/20 border border-primary-500/20 text-slate-900'
                          : 'glass-light border border-slate-200 text-slate-700'
                      }`}>
                        {msg.content}
                        <div className="text-xs text-slate-600 mt-1">{msg.time}</div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-slate-200">
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
                        className="px-2.5 py-1 rounded-full text-xs bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition"
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
        {activeView !== 'code' && (
  <main className="flex-1 flex flex-col overflow-hidden relative">
    {/* Preview Bar */}
    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-slate-50">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-slate-200 text-xs text-slate-600 font-mono">
          <Globe className="w-3 h-3" />
          myapp.oneatlas.app
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition">
          <Play className="w-3.5 h-3.5" />
          Preview live
        </button>
      </div>
    </div>

    {/* Preview Content */}
    <div className="flex-1 overflow-hidden flex items-center justify-center p-6 bg-slate-100">
      {isGenerating && (
        <GeneratingOverlay onComplete={() => setIsGenerating(false)} />
      )}

      <div
        className="h-full transition-all duration-500 overflow-hidden rounded-xl border border-slate-200 shadow-2xl relative"
        style={{
          width: deviceWidths[deviceMode],
          maxWidth: '100%',
        }}
      >
        {/* Mock browser frame for desktop */}
        {deviceMode !== 'mobile' && (
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 px-3 py-1 bg-slate-100 rounded-md text-xs text-slate-500 font-mono text-center">
              myapp.oneatlas.app
            </div>
          </div>
        )}

        {/* App preview iframe simulation */}
        <div className="bg-white h-full flex items-center justify-center overflow-hidden w-full">
          {generatedCode ? (
            <iframe 
              className="w-full h-full border-none"
              srcDoc={getSrcDoc(generatedCode)}
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
              className="h-full transition-all duration-500 overflow-hidden rounded-xl border border-slate-200 shadow-2xl relative"
              style={{
                width: deviceWidths[deviceMode],
                maxWidth: '100%',
              }}
            
              {/* Mock browser frame for desktop */}
              {deviceMode !== 'mobile' && (
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 px-3 py-1 bg-slate-100 rounded-md text-xs text-slate-500 font-mono text-center">
                    myapp.oneatlas.app
                  </div>
                </div>
              )}

              {/* App preview iframe simulation */}
              <div className="bg-white h-full flex items-center justify-center overflow-hidden w-full">
                {generatedCode ? (
                  <iframe 
                    className="w-full h-full border-none"
                    srcDoc={getSrcDoc(generatedCode)}
                    sandbox="allow-scripts allow-same-origin"
                  />
                ) : (
                  <div className="text-slate-500 text-sm">Preview will appear here</div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Right Panel - Tools */}
        <aside className="w-12 sidebar border-l border-slate-200 flex flex-col items-center py-4 gap-3">
          {[{ icon: Layers, label: 'Layers' },
            { icon: Settings, label: 'Settings' },
            { icon: GitBranch, label: 'Version History' },
            { icon: Terminal, label: 'Console' },
            { icon: Download, label: 'Export' }].map(({ icon: Icon, label }) => (
            <button
              key={label}
              title={label}
              onClick={() => setActiveTool(label)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
          {activeTool && (
            <div className="mt-2 p-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 w-full">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{activeTool}</span>
                <button onClick={() => setActiveTool(null)} className="text-xs text-slate-500 hover:text-slate-900">x</button>
              </div>
              <p>{activeTool === 'Export' ? 'Export functionality placeholder.' : `${activeTool} panel placeholder.`}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}