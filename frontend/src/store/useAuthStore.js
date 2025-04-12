import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningIn: false,
  isLoggingIn: false,
  isAdmin: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("auth/check");
      set({ authUser: res.data, isAdmin: res.data.isAdmin });
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningIn: true });
    try {
      const res = await axiosInstance.post("auth/signup", data);
      toast.success("Successfully signed in");
      set({ authUser: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isSigningIn: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("auth/login", data);
      toast.success("Successfully logged in");
      set({ authUser: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      axiosInstance.post("auth/logout");
      set({ authUser: null });
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
