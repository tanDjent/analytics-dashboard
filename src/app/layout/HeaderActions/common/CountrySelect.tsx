import * as Select from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../../../../api/country";
import { ChevronDown, Check } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const CountrySelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  const paramCountry = searchParams.get("country");

  const selectedCountry =
    paramCountry?.length && data?.some((item) => item.code === paramCountry)
      ? paramCountry
      : "ALL";

  const handleCountryChange = (value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (value !== "ALL") {
        params.set("country", value);
      } else {
        params.delete("country");
      }

      if (params.has("page")) {
        params.set("page", "1");
      }

      return params;
    });
  };
  const isCountryValid = data?.some((item) => item.code === paramCountry);

  useEffect(() => {
    if (!isLoading && data && paramCountry && !isCountryValid) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.delete("country");

        if (params.has("page")) {
          params.set("page", "1");
        }

        return params;
      });
    }
  }, [isLoading, data, paramCountry, isCountryValid, setSearchParams]);

  if (isLoading) {
    return (
      <div className="h-9 w-[180px] animate-pulse rounded-md bg-gray-100" />
    );
  }

  return (
    <Select.Root value={selectedCountry} onValueChange={handleCountryChange}>
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
            {data?.map((item) => (
              <Select.Item
                key={item.code}
                value={item.code}
                className="relative flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-sm outline-none hover:bg-gray-100"
              >
                <Select.ItemText>{item.name}</Select.ItemText>

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

export default CountrySelect;
