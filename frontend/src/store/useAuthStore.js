import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: null,

  checkAuth: async () => {
    set({ authUSer: true });
  },
}));
