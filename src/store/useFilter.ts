import { create } from "zustand";

type FilterState = {
  country: string | null;
  setCountry: (country: string | null) => void;
  clearCountry: () => void;
  orderStatus: string | null;
  setOrderStatus: (orderStatus: string | null) => void;
  clearOrderStatus: () => void;
};

export const useFilter = create<FilterState>((set) => ({
  country: null,
  orderStatus: null,
  setCountry: (country) => set({ country }),
  setOrderStatus: (orderStatus) => set({ orderStatus }),
  clearCountry: () => set({ country: null }),
  clearOrderStatus: () => set({ orderStatus: null }),
}));
