import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
} from "recharts";
import { fetchTrafficSources } from "../../../../../api/traffic-source";
import { colors } from "./colors";

const BrowserTrafficPieChart = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["traffic-sources"],
    queryFn: fetchTrafficSources,
  });

  const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload[0].payload;

    return (
      <div className="rounded-lg border bg-white px-3 py-2 shadow-sm text-sm">
        <p className="font-medium">{data.name}</p>
        <p>{data.value}%</p>
      </div>
    );
  };

  return (
    <div className="rounded-lg border border-gray-300 p-4">
      <div className="mb-4 text-base font-medium text-gray-700">
        Traffic by Browser
      </div>

      {isLoading ? (
        <div className="h-[300px] animate-pulse bg-gray-100 rounded-md" />
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Chart */}
          <div className="w-full md:w-[60%]">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {data?.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index]} />
                  ))}
                </Pie>

                <Tooltip content={CustomTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-col items-start gap-2 w-[40%]">
            {data?.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm w-full md:pr-[45%]"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: colors[index] }}
                  />
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="text-gray-500">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowserTrafficPieChart;
