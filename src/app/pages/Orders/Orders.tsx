import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { fetchOrdersListData, type Order } from "../../../api/orders-list";
import { useFilter } from "../../../store/useFilter";

const columnHelper = createColumnHelper<Order>();

const Orders = () => {
  const country = useFilter((s) => s.country);

  const [filters] = useState({
    page: 1,
    limit: 20,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["orders", country, filters],
    queryFn: () =>
      fetchOrdersListData({
        country,
        ...filters,
      }),
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "Order ID",
      }),

      columnHelper.accessor("customer_email", {
        header: "Customer",
      }),

      columnHelper.accessor("product", {
        header: "Product",
      }),

      columnHelper.accessor("country", {
        header: "Country",
      }),

      columnHelper.accessor("quantity", {
        header: "Qty",
      }),

      columnHelper.accessor("total", {
        header: "Total",
        cell: (info) => `$${info.getValue()}`,
      }),

      columnHelper.accessor("status", {
        header: "Status",
      }),

      columnHelper.accessor("date", {
        header: "Date",
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4">
      {isLoading ? (
        <div className="h-[400px] animate-pulse rounded-md bg-gray-100" />
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
    </div>
  );
};

export default Orders;
