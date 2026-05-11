import { getDataURL } from "./utility/utility";

type BrowserTraffic = {
  name: string;
  value: number;
};

export const fetchBrowserTraffic = async (
  country?: string | null,
): Promise<BrowserTraffic[]> => {
  try {
    const url = getDataURL("/browser-traffic", country);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch sales data");
    }
    return (await response.json()) as BrowserTraffic[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
