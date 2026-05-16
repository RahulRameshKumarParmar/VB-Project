import axios from "axios";
import { create } from "zustand";
import { User } from "./useUserStore";

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean | undefined>;
  logout: () => void;
  getAuthUser: () => void;
  currentUser: User | null;
  updateIsAuthenticate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  currentUser: null,

  login: async (username, password) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        set({
          user: data,
          token: data.accessToken,
          isAuthenticated: true,
        });
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        return true;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },

  updateIsAuthenticate: () => {
    set({
      isAuthenticated: JSON.parse(
        localStorage.getItem("isAuthenticated") || "",
      ),
    });
  },

  getAuthUser: async () => {
    try {
      const token = localStorage.getItem("token") || null;
      let response;
      if (token !== null){
        response = await axios.get("https://dummyjson.com/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass JWT via Authorization header
          },
        });
      }
      if (response) {
        set({
          currentUser: response.data,
        });
      }
    } catch (error) {
      console.error("Error while Getting Auth User:", error);
    } 
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("token");
    localStorage.setItem("isAuthenticated", JSON.stringify(false));
  },
}));
