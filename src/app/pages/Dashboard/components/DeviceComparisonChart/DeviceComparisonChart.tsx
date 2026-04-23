import { useQuery } from "@tanstack/react-query";
import { fetchVisitorsData } from "../../../../../api/visitors";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
} from "recharts";
import { useState } from "react";

const DeviceComparisonChart = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["visitors-chart"],
    queryFn: fetchVisitorsData,
  });

  const [activeSeries, setActiveSeries] = useState<
    "both" | "current" | "previous"
  >("both");

  const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload[0].payload;

    return (
      <div className="rounded-lg border bg-white px-3 py-2 shadow-sm">
        {/* Device */}
        <p className="text-sm font-medium text-gray-700">{data.device}</p>

        {/* Current */}
        <p className="text-sm text-gray-600">
          Current:{" "}
          <span className="font-semibold text-gray-900">{data.current}</span>
        </p>

        {/* Previous */}
        <p className="text-sm text-gray-600">
          Previous:{" "}
          <span className="font-semibold text-gray-900">{data.previous}</span>
        </p>

        {/* Change */}
        <p
          className={`text-sm font-medium ${
            data.change > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {data.change > 0 ? "+" : ""}
          {data.change}% vs last month
        </p>

        {/* Share */}
        <p className="text-xs text-gray-500">Share: {data.share}%</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-between rounded-lg border border-gray-300 p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-base font-medium text-gray-700">
          Visitors: Device Comparison
        </span>

        {!isLoading && (
          <div className="flex gap-4 text-sm">
            {/* Previous */}
            <div
              className={`flex items-center gap-2 cursor-pointer ${
                activeSeries === "current" ? "opacity-40" : ""
              }`}
              onClick={() =>
                setActiveSeries((prev) =>
                  prev === "previous" ? "both" : "previous",
                )
              }
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              <span>Previous</span>
            </div>

            {/* Current */}
            <div
              className={`flex items-center gap-2 cursor-pointer ${
                activeSeries === "previous" ? "opacity-40" : ""
              }`}
              onClick={() =>
                setActiveSeries((prev) =>
                  prev === "current" ? "both" : "current",
                )
              }
            >
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span>Current</span>
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="h-[300px] animate-pulse bg-gray-100 rounded-md" />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data} cx="50%" cy="60%">
            <PolarGrid stroke="#e5e7eb" strokeOpacity={0.8} />
            <PolarAngleAxis dataKey="device" tick={{ dy: 2 }} />
            <PolarRadiusAxis tick={false} axisLine={false} />

            <Tooltip content={CustomTooltip} />

            {/* Previous */}
            {(activeSeries === "both" || activeSeries === "previous") && (
              <Radar
                dataKey="previous"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.25}
              />
            )}

            {/* Current */}
            {(activeSeries === "both" || activeSeries === "current") && (
              <Radar
                dataKey="current"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.4}
              />
            )}
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DeviceComparisonChart;
