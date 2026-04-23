type CountryTraffic = {
  country: string;
  users: number;
};

export const fetchCountryTraffic = (): Promise<CountryTraffic[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { country: "USA", users: 1200 },
        { country: "India", users: 980 },
        { country: "UK", users: 720 },
        { country: "Germany", users: 540 },
        { country: "Canada", users: 430 },
      ]);
    }, 800);
  });
};
