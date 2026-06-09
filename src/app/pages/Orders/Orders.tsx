import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";

import {
  fetchOrdersListData,
  type Order,
  type OrderStatus,
  type SortableFields,
} from "../../../api/orders-list";
import Pagination from "../../../common/Pagination";
import DataTable from "../../../common/DataTable";
import { useSearchParams } from "react-router-dom";

const columnHelper = createColumnHelper<Order>();

const PAGE_SIZE = 15;

const SORTABLE_COLUMNS = new Set<string>([
  "date",
  "total",
  "price",
  "quantity",
  "customer_name",
  "customer_email",
  "product",
]);

const Orders = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";
  const country = searchParams.get("country") ?? "";
  const status = (searchParams.get("status") ?? "") as OrderStatus | "";
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
      status: status || undefined,
      sort_by: sortBy || undefined,
      sort_order: sortOrder || undefined,
    };
  }, [page, search, country, status, sortBy, sortOrder]);

  const { data, isLoading } = useQuery({
    queryKey: ["orders", filters],
    queryFn: () => fetchOrdersListData({ ...filters }),
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
      columnHelper.accessor("id", {
        id: "order_id",
        header: "Order ID",
      }),
      columnHelper.accessor("customer_name", {
        id: "customer_name",
        header: "Customer",
      }),
      columnHelper.accessor("customer_email", {
        id: "customer_email",
        header: "Customer Email",
      }),
      columnHelper.accessor("product", {
        id: "product",
        header: "Product",
      }),
      columnHelper.accessor("country", {
        id: "country",
        header: "Country",
      }),
      columnHelper.accessor("quantity", {
        id: "quantity",
        header: "Qty",
      }),
      columnHelper.accessor("total", {
        id: "total",
        header: "Total",
        cell: (info) => `$${info.getValue()}`,
      }),
      columnHelper.accessor("status", {
        id: "status",
        header: "Status",
      }),
      columnHelper.accessor("date", {
        id: "date",
        header: "Date",
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
          itemLabel="orders"
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Orders;
