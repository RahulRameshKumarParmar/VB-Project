import { create } from 'zustand';

// Define the shape of your state
interface UserState {
  count: number;
  increase: () => void;
  reset: () => void;
}

// Create the store
export const useUserStore = create<UserState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));