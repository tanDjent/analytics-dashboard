import { useQuery } from "@tanstack/react-query";
import { fetchSalesGraphData } from "../../../../../api/sales";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
  type YAxisTickContentProps,
} from "recharts";

const SalesGraph = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["sales-chart"],
    queryFn: fetchSalesGraphData,
  });

  const CustomYAxisTickValue = (props: YAxisTickContentProps) => {
    const value = Math.round(props.payload.value / 1000) + "k";
    return <Text {...props}>{value}</Text>;
  };

  const CustomTooltip = ({ active, payload, label }: TooltipContentProps) => {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload[0].payload;

    return (
      <div className="rounded-lg border bg-white px-3 py-2 shadow-sm">
        {/* Month */}
        <p className="text-sm font-medium text-gray-700">{label}</p>

        {/* Revenue */}
        <p className="text-sm text-gray-600">
          Revenue:{" "}
          <span className="font-semibold text-gray-900">
            ${data.revenue.toLocaleString()}
          </span>
        </p>

        {/* Orders */}
        <p className="text-sm text-gray-600">
          Orders:{" "}
          <span className="font-semibold text-gray-900">{data.orders}</span>
        </p>

        {/* Change vs Feb (only for March or if you want always) */}
        {data.change && (
          <p
            className={`text-sm font-medium ${
              data.change > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {data.change > 0 ? "+" : ""}
            {data.change}% vs last month
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col rounded-lg border border-gray-300 p-4">
      <span className="text-base font-medium text-gray-700 mb-4">
        Sales: FY 2025-26
      </span>
      {isLoading ? (
        <></>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tick={CustomYAxisTickValue} />
            <Tooltip content={CustomTooltip} />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SalesGraph;
