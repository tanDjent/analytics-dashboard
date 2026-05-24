import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const OrderStatusSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const statuses = useMemo(
    () => ["All", "Completed", "Pending", "Cancelled"],
    [],
  );

  const paramStatus = searchParams.get("status");

  const orderStatus = statuses.find((s) => s === paramStatus) ?? "All";

  const isStatusValid = statuses.includes(paramStatus || "");

  useEffect(() => {
    if (paramStatus && !isStatusValid) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.delete("status");

        if (params.has("page")) {
          params.set("page", "1");
        }

        return params;
      });
    }
  }, [paramStatus, isStatusValid, setSearchParams]);

  const handleStatusChange = (value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (value !== "All") {
        params.set("status", value);
      } else {
        params.delete("status");
      }

      if (params.has("page")) {
        params.set("page", "1");
      }

      return params;
    });
  };

  return (
    <Select.Root value={orderStatus} onValueChange={handleStatusChange}>
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
            {statuses.map((status) => (
              <Select.Item
                key={status}
                value={status}
                className="relative flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-sm outline-none hover:bg-gray-100"
              >
                <Select.ItemText>{`Status: ${status}`}</Select.ItemText>

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

export default OrderStatusSelect;
