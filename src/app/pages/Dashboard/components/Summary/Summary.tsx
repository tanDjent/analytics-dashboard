import { fetchKpis } from "../../../../../api/kpi";
import { useQuery } from "@tanstack/react-query";
import KpiCard from "./components/KpiCard/KpiCard";
import KpiCardSkeleton from "./components/KpiCardSkeleton/KpiCardSkeleton";

const Summary = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["kpis"],
    queryFn: fetchKpis,
  });

  return (
    <div className="flex flex-col rounded-lg border border-gray-300 p-4">
      <span className="text-base font-medium text-gray-700 mb-4">Summary</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <KpiCardSkeleton key={i} />)
          : data?.map((item) => <KpiCard key={item.title} {...item} />)}
      </div>
    </div>
  );
};

export default Summary;
