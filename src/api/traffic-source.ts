type TrafficSource = {
  name: string;
  value: number;
};

export const fetchTrafficSources = (): Promise<TrafficSource[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: "Chrome", value: 62 },
        { name: "Safari", value: 18 },
        { name: "Firefox", value: 10 },
        { name: "Edge", value: 7 },
        { name: "Others", value: 3 },
      ]);
    }, 800);
  });
};
