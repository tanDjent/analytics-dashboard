import { useLocation } from "react-router-dom";

export type Tabs =
  | "Dashboard"
  | "Customers"
  | "Orders"
  | "Products"
  | "Team"
  | "Settings";

const titleMap: Record<string, Tabs> = {
  "/": "Dashboard",
  "/customers": "Customers",
  "/orders": "Orders",
  "/products": "Products",
  "/team": "Team",
  "/settings": "Settings",
};

export const useSelectedTab = (): Tabs => {
  const { pathname } = useLocation();
  return titleMap[pathname] ?? "Dashboard";
};
