import { create } from 'zustand';

type UserRole = 'influencer' | 'customer' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AdFormData {
  productName: string;
  productDesc: string;
  targetAudience: string;
  platform: string;
}

interface AppState {
  user: User | null;
  isLoading: boolean;
  adFormData: AdFormData | null;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  saveAdFormData: (data: AdFormData) => void;
  clearAdFormData: () => void;
  logout: () => Promise<void>;
}

export const useUser = create<AppState>((set) => ({
  user: null,
  isLoading: false,
  adFormData: null,
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  saveAdFormData: (data) => set({ adFormData: data }),
  clearAdFormData: () => set({ adFormData: null }),
  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
    set({ user: null, adFormData: null });
  }
}));
