import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  fetchCustomersListData,
  type Customer,
  type SortableFields,
} from "../../../api/customers-list";
import Pagination from "../../../common/Pagination";
import { useSearchParams } from "react-router-dom";

import { ChevronsUpDown, MoveUp, MoveDown } from "lucide-react";

const columnHelper = createColumnHelper<Customer>();

const PAGE_SIZE = 15;

const SORTABLE_COLUMNS = new Set<string>([
  "name",
  "email",
  "orders",
  "total_spent",
]);

// Stable reference so react-table doesn't re-init while data is loading.
const EMPTY_CUSTOMERS: Customer[] = [];

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

  const SortIcon = sortOrder === "asc" ? MoveUp : MoveDown;

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

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data?.data ?? EMPTY_CUSTOMERS,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4">
      {isLoading ? (
        <div className="h-[1319px] animate-pulse rounded-md bg-gray-100" />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-gray-200">
                  {headerGroup.headers.map((header) => {
                    const headerContent = flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    );
                    const isSortable = SORTABLE_COLUMNS.has(header.column.id);
                    const isActiveSort =
                      sortBy === header.column.id && sortOrder.length > 0;

                    return (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left font-medium text-gray-600"
                      >
                        {isSortable ? (
                          <button
                            type="button"
                            onClick={() => handleSort(header.column.id)}
                            className="flex items-center gap-1"
                          >
                            {headerContent}
                            {isActiveSort ? (
                              <SortIcon size={14} />
                            ) : (
                              <ChevronsUpDown size={14} />
                            )}
                          </button>
                        ) : (
                          headerContent
                        )}
                      </th>
                    );
                  })}
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
          itemLabel="customers"
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Customers;
