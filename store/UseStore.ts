import { create } from 'zustand';

interface Project {
  id: string;
  name: string;
  prompt: string;
  code: string;
  status: 'draft' | 'building' | 'live';
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'explorer' | 'builder' | 'studio' | 'scale';
  creditsUsed: number;
  creditsTotal: number;
}

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;

  // Projects
  projects: Project[];
  currentProject: Project | null;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  setCurrentProject: (project: Project | null) => void;

  // Builder
  isGenerating: boolean;
  generatedCode: string;
  prompt: string;
  setIsGenerating: (val: boolean) => void;
  setGeneratedCode: (code: string) => void;
  setPrompt: (prompt: string) => void;

  // UI
  theme: 'dark' | 'light';
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useStore = create<AppState>((set) => ({
  // Auth
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),

  // Projects
  projects: [],
  currentProject: null,
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  setCurrentProject: (project) => set({ currentProject: project }),

  // Builder
  isGenerating: false,
  generatedCode: '',
  prompt: '',
  setIsGenerating: (val) => set({ isGenerating: val }),
  setGeneratedCode: (code) => set({ generatedCode: code }),
  setPrompt: (prompt) => set({ prompt }),

  // UI
  theme: 'dark',
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
