import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserRole } from "../types";

interface AuthState {
  token: string | null;
  role: UserRole | null;
  setAuth: (token: string, role: UserRole) => void;
  clearAuth: () => void;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      setAuth: (token, role) => set({ token, role }),
      clearAuth: () => set({ token: null, role: null }),
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null, role: null }),
    }),
    { name: "fl-auth" },
  ),
);
