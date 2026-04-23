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
import { useState } from "react";
import Button from "../../../../../common/Button";

const SalesGraph = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["sales-chart"],
    queryFn: fetchSalesGraphData,
  });

  const [range, setRange] = useState<"6M" | "1Y">("6M");

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

  const displayedData = range === "6M" ? data?.slice(-6) : data;

  return (
    <div className="flex flex-col justify-between rounded-lg border border-gray-300 p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-base font-medium text-gray-700">
          Sales: FY 2025-26
        </span>

        {!isLoading && (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={range === "6M" ? "primary" : "secondary"}
              onClick={() => setRange("6M")}
            >
              6 Months
            </Button>
            <Button
              size="sm"
              variant={range === "1Y" ? "primary" : "secondary"}
              onClick={() => setRange("1Y")}
            >
              1 Year
            </Button>
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="h-[300px] animate-pulse bg-gray-100 rounded-md" />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={displayedData}>
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
