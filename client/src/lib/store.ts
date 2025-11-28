import { create } from 'zustand';

type UserRole = 'influencer' | 'customer' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AppState {
  user: User | null;
  isLoading: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

export const useUser = create<AppState>((set) => ({
  user: null,
  isLoading: false,
  login: (role) => {
    set({ isLoading: true });
    // Simulate API call
    setTimeout(() => {
      set({
        isLoading: false,
        user: {
          id: '1',
          name: role === 'influencer' ? 'Omar Shalan' : 'Brand Manager',
          email: 'test@example.com',
          role: role,
          avatar: role === 'influencer' ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' : undefined
        }
      });
    }, 800);
  },
  logout: () => set({ user: null })
}));
