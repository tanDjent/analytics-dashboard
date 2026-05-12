import { getDataURL } from "./utility/utility";

type CountryTraffic = {
  country: string;
  countryName: string;
  users: number;
};

type CountryTrafficAPIResponse = {
  country: string;
  country_name: string;
  users: number;
};

export const fetchCountryTraffic = async (): Promise<CountryTraffic[]> => {
  try {
    const url = getDataURL("/country-traffic").toString();
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch country traffic");
    }
    const data = (await response.json()) as CountryTrafficAPIResponse[];
    return data.map(
      ({ country, country_name, users }: CountryTrafficAPIResponse) => ({
        country,
        countryName: country_name,
        users,
      }),
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
