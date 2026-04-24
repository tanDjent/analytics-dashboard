import { create } from "zustand";

type FilterState = {
  country: string | null;
  setCountry: (country: string | null) => void;
  clearCountry: () => void;
};

export const useFilter = create<FilterState>((set) => ({
  country: null,

  setCountry: (country) => set({ country }),

  clearCountry: () => set({ country: null }),
}));
