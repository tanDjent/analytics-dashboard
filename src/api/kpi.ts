// src/api/kpi.ts
import {
  ShoppingCart,
  DollarSign,
  Users,
  Package,
  type LucideProps,
} from "lucide-react";

export type Kpi = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<LucideProps>;
};
export const fetchKpis = (): Promise<Kpi[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          title: "Orders",
          value: "1,248",
          change: "+8.2%",
          isPositive: true,
          icon: ShoppingCart,
        },
        {
          title: "Revenue",
          value: "$24,500",
          change: "+12.5%",
          isPositive: true,
          icon: DollarSign,
        },
        {
          title: "Customers",
          value: "842",
          change: "+5.1%",
          isPositive: true,
          icon: Users,
        },
        {
          title: "Products",
          value: "128",
          change: "-2.3%",
          isPositive: false,
          icon: Package,
        },
      ]);
    }, 8000);
  });
};
