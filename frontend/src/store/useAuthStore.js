import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoggingIn: false,

  checkAuth: async () => {
    set({ authUser: true });
  },

  login: async (data) => {},
}));
