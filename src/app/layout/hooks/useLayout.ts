import {
  House,
  Package,
  Settings,
  Shirt,
  UserRound,
  Users,
  type LucideProps,
} from "lucide-react";
import type { Tabs } from "./useSidebar";

type Path =
  | "/"
  | "/customers"
  | "/orders"
  | "/products"
  | "/team"
  | "/settings";
type NavItemType = {
  name: Tabs;
  icon: React.ComponentType<LucideProps>;
  path: Path;
};
const useLayout = () => {
  const navItems: NavItemType[] = [
    { name: "Dashboard", icon: House, path: "/" },
    { name: "Customers", icon: UserRound, path: "/customers" },
    { name: "Orders", icon: Package, path: "/orders" },
    { name: "Products", icon: Shirt, path: "/products" },
    { name: "Team", icon: Users, path: "/team" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return { navItems };
};

export default useLayout;
