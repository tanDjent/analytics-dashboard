import { getDataURL } from "./utility/utility";

export type VisitorsData = {
  device: string;
  current: number;
  previous: number;
  change: number;
  share: number;
};

export const fetchVisitorsData = async (
  country?: string | null,
): Promise<VisitorsData[]> => {
  try {
    const url = getDataURL("/visitors", country);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch sales data");
    }
    return (await response.json()) as VisitorsData[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
