import { getDataURL } from "./utility/utility";

type SalesData = {
  month: string;
  revenue: number;
  orders: number;
};

export const fetchSalesGraphData = async (
  country?: string | null,
): Promise<SalesData[]> => {
  try {
    const url = getDataURL("/sales", country).toString();

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch sales data");
    }
    return (await response.json()) as SalesData[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
