import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export type PaginationData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type PaginationProps = PaginationData & {
  itemLabel?: string;
  limitOptions?: number[];
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  className?: string;
};

type PageItem = number | "ellipsis";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

const getRange = (page: number, limit: number, total: number) => {
  if (total === 0) {
    return { start: 0, end: 0 };
  }

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return { start, end };
};

const getPageItems = (page: number, totalPages: number): PageItem[] => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page < 3) {
    return [1, 2, 3, "ellipsis", totalPages];
  }

  if (page >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "ellipsis", page, "ellipsis", totalPages];
};

const pageButtonBase =
  "inline-flex min-h-8 min-w-8 items-center justify-center rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-violet-300";

const Pagination = ({
  page,
  limit,
  total,
  totalPages,
  itemLabel = "items",
  onPageChange,

  className = "",
}: PaginationProps) => {
  const [pageInput, setPageInput] = useState(String(page));

  useEffect(() => {
    setPageInput(String(page));
  }, [page]);

  const { start, end } = getRange(page, limit, total);
  const pageItems = getPageItems(page, totalPages);
  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages || totalPages === 0;

  const commitPageInput = () => {
    if (totalPages === 0) {
      setPageInput("");
      return;
    }

    const parsed = Number(pageInput);

    if (
      !pageInput ||
      Number.isNaN(parsed) ||
      parsed < 1 ||
      parsed > totalPages
    ) {
      setPageInput(String(page));
      return;
    }

    const nextPage = Math.floor(parsed);

    if (nextPage !== page) {
      onPageChange(nextPage);
    } else {
      setPageInput(String(page));
    }
  };

  const handlePageInputChange = (value: string) => {
    if (value === "" || /^\d+$/.test(value)) {
      setPageInput(value);
    }
  };

  return (
    <div
      className={`flex flex-col gap-4 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <p className="text-sm text-gray-600">
        {total === 0 ? (
          <>Showing 0 {itemLabel}</>
        ) : (
          <>
            Showing {formatNumber(start)} to {formatNumber(end)} of{" "}
            {formatNumber(total)} {itemLabel}
          </>
        )}
      </p>

      {totalPages > 1 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous page"
              disabled={isFirstPage}
              onClick={() => onPageChange(page - 1)}
              className={`${pageButtonBase} px-2 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent`}
            >
              <ChevronLeft size={18} />
            </button>

            {pageItems.map((item, index) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="inline-flex min-h-8 min-w-8 items-center justify-center text-sm text-gray-400"
                  aria-hidden
                >
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  aria-label={`Page ${item}`}
                  aria-current={item === page ? "page" : undefined}
                  onClick={() => onPageChange(item)}
                  className={`${pageButtonBase} ${
                    item === page
                      ? "bg-violet-600 font-bold text-white hover:bg-violet-600"
                      : "bg-transparent text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ),
            )}

            <button
              type="button"
              aria-label="Next page"
              disabled={isLastPage}
              onClick={() => onPageChange(page + 1)}
              className={`${pageButtonBase} px-2 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent`}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            aria-label={`Go to page (1–${totalPages})`}
            value={pageInput}
            onChange={(event) => handlePageInputChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                commitPageInput();
              }
            }}
            onBlur={commitPageInput}
            className="ml-1 h-8 w-12 rounded-lg border border-gray-300 bg-white px-1 text-center text-sm text-gray-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-300 disabled:cursor-not-allowed disabled:opacity-40"
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;
