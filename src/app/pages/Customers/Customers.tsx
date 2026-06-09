import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";

import {
  fetchCustomersListData,
  type Customer,
  type SortableFields,
} from "../../../api/customers-list";
import Pagination from "../../../common/Pagination";
import DataTable from "../../../common/DataTable";
import { useSearchParams } from "react-router-dom";

const columnHelper = createColumnHelper<Customer>();

const PAGE_SIZE = 15;

const SORTABLE_COLUMNS = new Set<string>([
  "name",
  "email",
  "orders",
  "total_spent",
]);

const Customers = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";
  const country = searchParams.get("country") ?? "";
  const sortBy = (searchParams.get("sort_by") ?? "") as SortableFields | "";
  const sortOrder = (searchParams.get("sort_order") ?? "") as
    | "asc"
    | "desc"
    | "";

  const filters = useMemo(() => {
    return {
      page,
      limit: PAGE_SIZE,
      search: search || undefined,
      country: country || undefined,
      sort_by: sortBy || undefined,
      sort_order: sortOrder || undefined,
    };
  }, [page, search, country, sortBy, sortOrder]);

  const { data, isLoading } = useQuery({
    queryKey: ["customers", filters],
    queryFn: () => fetchCustomersListData({ ...filters }),
  });

  const handleSort = useCallback(
    (field: string) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        const currentField = params.get("sort_by");
        const currentOrder = params.get("sort_order");

        if (currentField !== field) {
          params.set("sort_by", field);
          params.set("sort_order", "asc");
        } else if (currentOrder === "asc") {
          params.set("sort_order", "desc");
        } else {
          params.delete("sort_by");
          params.delete("sort_order");
        }

        params.set("page", "1");

        return params;
      });
    },
    [setSearchParams],
  );

  const handlePageChange = useCallback(
    (nextPage: number) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("page", String(nextPage));
        return params;
      });
    },
    [setSearchParams],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        header: "Customer",
      }),
      columnHelper.accessor("email", {
        id: "email",
        header: "Email",
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
    <div className="rounded-lg border border-gray-300 bg-white p-4">
      <DataTable
        data={data?.data}
        columns={columns}
        isLoading={isLoading}
        sortableColumns={SORTABLE_COLUMNS}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        skeletonRows={PAGE_SIZE}
      />

      {data && (
        <Pagination
          page={data.page}
          limit={data.limit}
          total={data.total}
          totalPages={data.totalPages}
          itemLabel="customers"
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Customers;
