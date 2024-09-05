import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      isAuthenticated: () => !!useAuthStore.getState().user,
    }),
    {
      name: "user",
    }
  )
);
