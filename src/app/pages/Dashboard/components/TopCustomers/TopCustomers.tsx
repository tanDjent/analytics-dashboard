import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useSearchParams } from "react-router-dom";

import {
  fetchCustomersListData,
  type Customer,
} from "../../../../../api/customers-list";
import DataTable from "../../../../../common/DataTable";

const columnHelper = createColumnHelper<Customer>();

const PAGE_SIZE = 5;

const TopCustomers = () => {
  const [searchParams] = useSearchParams();
  const country = searchParams.get("country") ?? "";

  const filters = useMemo(
    () => ({
      page: 1,
      limit: PAGE_SIZE,
      country: country || undefined,
      sort_by: "total_spent" as const,
      sort_order: "desc" as const,
    }),
    [country],
  );

  const { data, isLoading } = useQuery({
    queryKey: ["top-customers", filters],
    queryFn: () => fetchCustomersListData(filters),
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        header: "Customer",
      }),
      columnHelper.accessor("country", {
        id: "country",
        header: "Country",
      }),
      columnHelper.accessor("orders", {
        id: "orders",
        header: "Orders",
      }),
      columnHelper.accessor("total_spent", {
        id: "total_spent",
        header: "Total Spent",
        cell: (info) => `$${info.getValue()}`,
      }),
    ],
    [],
  );

  return (
    <div className="rounded-lg bg-white p-4">
      <div className="mb-4 text-base font-medium text-gray-700">
        Top 5 Customers
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

export default TopCustomers;
