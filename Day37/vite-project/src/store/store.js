import { create } from "zustand";
export const useTheme = create((set) => ({
  theme: "light",
  abc: "xyz",
  user: {
    email: "hh@gmail.com",
    role: "admin",
  },

  toggleTheme: () => {
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    }));
  },
  updateUser: (newUser) => {
    set((state) => ({
      user: { ...state.user, ...newUser },
    }));
  },
}));
