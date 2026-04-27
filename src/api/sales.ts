type SalesData = {
  month: string;
  revenue: number;
  orders: number;
};

const APIRoot = import.meta.env.VITE_API_ROOT;

export const fetchSalesGraphData = async (
  country?: string | null,
): Promise<SalesData[]> => {
  try {
    const url = new URL(APIRoot + "/sales");
    if (country) {
      url.searchParams.append("country", country);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error("Failed to fetch sales data");
    }
    return (await response.json()) as SalesData[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
