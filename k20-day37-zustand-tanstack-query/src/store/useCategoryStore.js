import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  selectedCategory: "",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
