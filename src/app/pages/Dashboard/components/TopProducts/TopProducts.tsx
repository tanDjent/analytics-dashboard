import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useSearchParams } from "react-router-dom";

import {
  fetchProductsListData,
  type Product,
} from "../../../../../api/products-list";
import DataTable from "../../../../../common/DataTable";

const columnHelper = createColumnHelper<Product>();

const PAGE_SIZE = 5;

const TopProducts = () => {
  const [searchParams] = useSearchParams();
  const country = searchParams.get("country") ?? "";

  const filters = useMemo(
    () => ({
      page: 1,
      limit: PAGE_SIZE,
      country: country || undefined,
      sort_by: "sales" as const,
      sort_order: "desc" as const,
    }),
    [country],
  );

  const { data, isLoading } = useQuery({
    queryKey: ["top-products", filters],
    queryFn: () => fetchProductsListData(filters),
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        header: "Product",
      }),
      columnHelper.accessor("category", {
        id: "category",
        header: "Category",
      }),
      columnHelper.accessor("country", {
        id: "country",
        header: "Country",
      }),
      columnHelper.accessor("sales", {
        id: "sales",
        header: "Sales",
      }),
      columnHelper.accessor("revenue", {
        id: "revenue",
        header: "Revenue",
        cell: (info) => `$${info.getValue()}`,
      }),
    ],
    [],
  );

  return (
    <div className="rounded-lg bg-white p-4">
      <div className="mb-4 text-base font-medium text-gray-700">
        Top 5 Products
      </div>
      <DataTable
        data={data?.data}
        columns={columns}
        isLoading={isLoading}
        skeletonRows={PAGE_SIZE}
      />
    </div>
  );
};

export default TopProducts;
