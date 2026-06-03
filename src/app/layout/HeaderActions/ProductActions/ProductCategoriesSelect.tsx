import * as Select from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { fetchProductCategories } from "../../../../api/product-categories";
import { ChevronDown, Check } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const ProductCategoriesSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["product-categories"],
    queryFn: fetchProductCategories,
  });

  const paramCategory = searchParams.get("category");

  const selectedCategory =
    paramCategory?.length && data?.some((item) => item === paramCategory)
      ? paramCategory
      : "ALL";

  const handleCategoryChange = (value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (value !== "ALL") {
        params.set("category", value);
      } else {
        params.delete("category");
      }

      if (params.has("page")) {
        params.set("page", "1");
      }

      return params;
    });
  };

  const isCategoryValid = data?.some((item) => item === paramCategory!);

  useEffect(() => {
    if (!isLoading && data && paramCategory && !isCategoryValid) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.delete("category");

        if (params.has("page")) {
          params.set("page", "1");
        }

        return params;
      });
    }
  }, [isLoading, data, paramCategory, isCategoryValid, setSearchParams]);

  if (isLoading) {
    return (
      <div className="h-9 w-[180px] animate-pulse rounded-md bg-gray-100" />
    );
  }

  return (
    <Select.Root value={selectedCategory} onValueChange={handleCategoryChange}>
      <Select.Trigger className="inline-flex w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm shadow-sm lg:w-[180px]">
        <Select.Value />
        <Select.Icon>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="z-50 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border bg-white shadow-md"
          position="popper"
        >
          <Select.Viewport className="p-1">
            <Select.Item
              value="ALL"
              className="relative flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-sm outline-none hover:bg-gray-100"
            >
              <Select.ItemText>All Categories</Select.ItemText>

              <Select.ItemIndicator className="absolute right-2">
                <Check size={16} />
              </Select.ItemIndicator>
            </Select.Item>

            {data?.map((category) => (
              <Select.Item
                key={category}
                value={category}
                className="relative flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-sm outline-none hover:bg-gray-100"
              >
                <Select.ItemText>{category}</Select.ItemText>

                <Select.ItemIndicator className="absolute right-2">
                  <Check size={16} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default ProductCategoriesSelect;
