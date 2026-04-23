type SalesData = {
  month: string;
  revenue: number;
  orders: number;
};

export const fetchSalesGraphData = (): Promise<SalesData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { month: "Apr", revenue: 18000, orders: 900 },
        { month: "May", revenue: 19500, orders: 980 },
        { month: "Jun", revenue: 21000, orders: 1050 },

        { month: "Jul", revenue: 23000, orders: 1150 },
        { month: "Aug", revenue: 25000, orders: 1250 },
        { month: "Sep", revenue: 22000, orders: 1100 },

        { month: "Oct", revenue: 26000, orders: 1300 },
        { month: "Nov", revenue: 29000, orders: 1450 },
        { month: "Dec", revenue: 33000, orders: 1650 },

        { month: "Jan", revenue: 28000, orders: 1400 },
        { month: "Feb", revenue: 21780, orders: 1152 },
        { month: "Mar", revenue: 24500, orders: 1248 },
      ]);
    }, 800);
  });
};
