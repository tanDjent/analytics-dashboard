import * as Select from "@radix-ui/react-select";

import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../../../api/country";
import { ChevronDown, Check } from "lucide-react";
import { useFilter } from "../../../store/useFilter";

const CountrySelect = () => {
  const { country, setCountry } = useFilter();

  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  if (isLoading) {
    return (
      <div className="h-9 w-[180px] rounded-md bg-gray-100 animate-pulse" />
    );
  }

  return (
    <Select.Root
      value={country ?? "ALL"}
      onValueChange={(value) => setCountry(value === "ALL" ? null : value)}
    >
      <Select.Trigger className="inline-flex items-center justify-between rounded-md border px-3 py-2 text-sm w-full lg:w-[180px] bg-white shadow-sm">
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
                  <Check />
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
