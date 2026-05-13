import { useLocation } from "react-router-dom";
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
};

const titleMap: Record<string, Tabs> = {
  "/": "Dashboard",
  "/customers": "Customers",
  "/orders": "Orders",
  "/products": "Products",
  "/team": "Team",
  "/settings": "Settings",
};

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: true,

  toggle: () => set((state) => ({ isOpen: !state.isOpen })),

  open: () => set({ isOpen: true }),

  close: () => set({ isOpen: false }),
}));

export const useSelectedTab = (): Tabs => {
  const { pathname } = useLocation();
  return titleMap[pathname] ?? "Dashboard";
};
