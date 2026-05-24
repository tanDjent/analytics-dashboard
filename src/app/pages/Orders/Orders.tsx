import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  fetchOrdersListData,
  type Order,
  type OrderStatus,
} from "../../../api/orders-list";
import Pagination from "../../../common/Pagination";
import { useSearchParams } from "react-router-dom";

const columnHelper = createColumnHelper<Order>();

const Orders = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";
  const country = searchParams.get("country") ?? "";
  const status = (searchParams.get("status") as OrderStatus) ?? "";

  const filters = useMemo(() => {
    return {
      page,
      limit: 20,
      search,
      country,
      status,
    };
  }, [page, search, country, status]);

  const { data, isLoading } = useQuery({
    queryKey: ["orders", filters],
    queryFn: () => fetchOrdersListData({ ...filters }),
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", { header: "Order ID" }),
      columnHelper.accessor("customer_name", { header: "Customer" }),
      columnHelper.accessor("customer_email", { header: "Customer Email" }),
      columnHelper.accessor("product", { header: "Product" }),
      columnHelper.accessor("country", { header: "Country" }),
      columnHelper.accessor("quantity", { header: "Qty" }),
      columnHelper.accessor("total", {
        header: "Total",
        cell: (info) => `$${info.getValue()}`,
      }),
      columnHelper.accessor("status", { header: "Status" }),
      columnHelper.accessor("date", { header: "Date" }),
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4 h-full">
      {isLoading ? (
        <div className="h-[1319px] animate-pulse rounded-md bg-gray-100" />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-gray-200">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left font-medium text-gray-600"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-gray-700">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data && (
        <Pagination
          page={data.page}
          limit={data.limit}
          total={data.total}
          totalPages={data.totalPages}
          itemLabel="orders"
          onPageChange={(nextPage) => {
            setSearchParams((prev) => {
              const params = new URLSearchParams(prev);
              params.set("page", String(nextPage));
              return params;
            });
          }}
        />
      )}
    </div>
  );
};

export default Orders;
