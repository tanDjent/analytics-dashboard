export type VisitorsData = {
  device: string;
  current: number;
  previous: number;
  change: number;
  share: number;
};

export const fetchVisitorsData = (): Promise<VisitorsData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          device: "Desktop",
          current: 1200,
          previous: 1000,
          change: 20,
          share: 35,
        },
        {
          device: "Mobile",
          current: 1800,
          previous: 1500,
          change: 20,
          share: 53,
        },
        {
          device: "Tablet",
          current: 400,
          previous: 500,
          change: -20,
          share: 12,
        },
      ]);
    }, 800);
  });
};
