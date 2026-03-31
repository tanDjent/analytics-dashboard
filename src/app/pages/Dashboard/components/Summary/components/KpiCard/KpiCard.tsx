import { TrendingDown, TrendingUp } from "lucide-react";
import type { Kpi } from "../../../../../../../api/kpi";

type KpiCardProps = Kpi;

const KpiCard = ({
  title,
  value,
  change,
  isPositive,
  icon: DataIcon,
}: KpiCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{title}</p>

        <div className="p-2 bg-gray-100 rounded-lg">
          <DataIcon className="w-5 h-5 text-gray-700 stroke-[1.5]" />
        </div>
      </div>

      {/* Value */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-gray-900">{value}</h2>
      </div>

      {/* Change */}
      <div className="mt-3 flex items-center gap-2">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-green-600" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-600" />
        )}

        <span
          className={`text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </span>

        <span className="text-sm text-gray-400">vs last month</span>
      </div>
    </div>
  );
};

export default KpiCard;
