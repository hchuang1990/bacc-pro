import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  subscription: 'free' | 'pro' | 'premium' | null;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const demoUser = {
  id: '1',
  email: 'a',
  subscription: 'free' as const
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  setUser: (user) => set({ user }),
  signIn: async (email, password) => {
    // Demo credentials check
    if (email === 'a' && password === 'a') {
      set({ user: demoUser });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  signUp: async (email, password) => {
    set({
      user: {
        id: Date.now().toString(),
        email,
        subscription: 'free'
      }
    });
  },
  signOut: async () => {
    set({ user: null });
  },
}));