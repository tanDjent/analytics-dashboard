import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { useFilter } from "../../../../store/useFilter";

const OrderStatusSelect = () => {
  const { orderStatus, setOrderStatus } = useFilter();

  const statuses = ["All", "Completed", "Pending", "Cancelled"]


  return (
    <Select.Root
      value={orderStatus ?? "All"}
      onValueChange={(value) => setOrderStatus(value === "All" ? null : value)}
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
            {statuses?.map((status) => (
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
