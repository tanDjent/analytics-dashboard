import { Search } from "lucide-react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "../../../../common/Utility";


const OrderSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";

  const updateSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchParams((prev) => {
          const params = new URLSearchParams(prev);

          if (value.trim()) {
            params.set("search", value);
          } else {
            params.delete("search");
          }

          params.set("page", "1");

          return params;
        });
      }, 500),
    [setSearchParams]
  );

  return (
    <div className="relative w-full lg:w-[300px]">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        defaultValue={search}
        placeholder="Search orders"
        onChange={(e) => updateSearch(e.target.value)}
        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm shadow-sm outline-none focus:border-indigo-500"
      />
    </div>
  );
};

export default OrderSearch;