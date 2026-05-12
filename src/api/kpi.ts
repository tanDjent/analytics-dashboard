// src/api/kpi.ts
import {
  ShoppingCart,
  DollarSign,
  Users,
  Package,
  type LucideProps,
} from "lucide-react";
import { getDataURL } from "./utility/utility";

export type Kpi = {
  title: string;
  value: number;
  change: number;
  isPositive: boolean;
  icon: React.ComponentType<LucideProps>;
};

const Icon = {
  orders: ShoppingCart,
  revenue: DollarSign,
  customers: Users,
  products: Package,
};

type MetricKey = "orders" | "revenue" | "customers" | "products";

type Metric = {
  value: number;
  change: number;
};

type SummaryResponse = Record<MetricKey, Metric>;

export const fetchKpis = async (country?: string | null): Promise<Kpi[]> => {
  try {
    const summaryData: Kpi[] = [];

    const url = getDataURL("/summary", country).toString();

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch sales data");
    }
    const data = (await response.json()) as SummaryResponse;

    Object.keys(data).forEach((dataKey) => {
      const item = data[dataKey as MetricKey];
      summaryData.push({
        title: dataKey,
        value: item.value,
        change: item.change,
        isPositive: item.change >= 0,
        icon: Icon[dataKey as MetricKey],
      });
    });

    return summaryData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
