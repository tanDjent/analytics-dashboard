import { getDataURL } from "./utility/utility";

export type Country = {
  code: string;
  name: string;
};

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const url = getDataURL("/country");
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    return (await response.json()) as Country[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
