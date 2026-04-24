export type Country = {
  code: string;
  name: string;
};

export const fetchCountries = (): Promise<Country[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { code: "ALL", name: "All Countries" },
        { code: "US", name: "United States" },
        { code: "IN", name: "India" },
        { code: "UK", name: "United Kingdom" },
        { code: "DE", name: "Germany" },
        { code: "CA", name: "Canada" },
      ]);
    }, 400);
  });
};
