import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
} from "recharts";
import { fetchCountryTraffic } from "../../../../../api/country-traffic";

const CountryTrafficBarChart = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["country-traffic"],
    queryFn: fetchCountryTraffic,
  });

  const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload[0].payload;

    return (
      <div className="rounded-lg border bg-white px-3 py-2 shadow-sm text-sm">
        <p className="font-medium">{data.country}</p>
        <p>{data.users} users</p>
      </div>
    );
  };

  return (
    <div className="rounded-lg bg-white p-4">
      <div className="mb-4 text-base font-medium text-gray-700">
        Traffic by Country
      </div>

      {isLoading ? (
        <div className="h-[300px] animate-pulse bg-gray-100 rounded-md" />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" hide />
            <YAxis
              dataKey="country"
              type="category"
              width={90}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={CustomTooltip} />
            <Bar dataKey="users" fill="#6366f1" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CountryTrafficBarChart;
