import { create } from "zustand";

export type Tabs =
  | "Dashboard"
  | "Customers"
  | "Orders"
  | "Products"
  | "Team"
  | "Settings";

type SidebarState = {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  selectedTab: Tabs;
  setSelectedTab: (tab: Tabs) => void;
};

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: true,

  toggle: () => set((state) => ({ isOpen: !state.isOpen })),

  open: () => set({ isOpen: true }),

  close: () => set({ isOpen: false }),

  selectedTab: "Dashboard",

  setSelectedTab: (tab: Tabs) => set({ selectedTab: tab }),
}));
