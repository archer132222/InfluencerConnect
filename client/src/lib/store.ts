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
}

export const useUser = create<AppState>((set) => ({
  user: null,
  isLoading: false,
  adFormData: null,
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  saveAdFormData: (data) => set({ adFormData: data }),
  clearAdFormData: () => set({ adFormData: null })
}));
