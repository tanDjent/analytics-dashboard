import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  fetchProductsListData,
  type Product,
  type SortableFields,
} from "../../../api/products-list";
import Pagination from "../../../common/Pagination";
import { useSearchParams } from "react-router-dom";

import { ChevronsUpDown, MoveUp, MoveDown } from "lucide-react";

const columnHelper = createColumnHelper<Product>();

const PAGE_SIZE = 15;

const SORTABLE_COLUMNS = new Set<string>([
  "id",
  "name",
  "category",
  "price",
  "stock",
  "sales",
  "revenue",
]);

// Stable reference so react-table doesn't re-init while data is loading.
const EMPTY_PRODUCTS: Product[] = [];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";
  const country = searchParams.get("country") ?? "";
  const category = searchParams.get("category") ?? "";
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
      category: category || undefined,
      sort_by: sortBy || undefined,
      sort_order: sortOrder || undefined,
    };
  }, [page, search, country, category, sortBy, sortOrder]);

  const { data, isLoading } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProductsListData({ ...filters }),
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
      columnHelper.accessor("id", {
        id: "id",
        header: "Product ID",
      }),
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
      columnHelper.accessor("price", {
        id: "price",
        header: "Price",
        cell: (info) => `$${info.getValue()}`,
      }),
      columnHelper.accessor("stock", {
        id: "stock",
        header: "Stock",
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

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data?.data ?? EMPTY_PRODUCTS,
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
          itemLabel="products"
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Products;
