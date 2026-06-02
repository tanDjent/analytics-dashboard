import { getDataURL } from "./utility/utility";

export type OrderStatus = "Completed" | "Pending" | "Cancelled";

export type Order = {
  id: string;
  customer_email: string;
  customer_name: string;
  country: string;
  product: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
  status: OrderStatus;
  date: string;
};

export type OrdersResponse = {
  data: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
export type SortableFields =
  | "date"
  | "total"
  | "price"
  | "quantity"
  | "customer_name"
  | "customer_email"
  | "product";

type FetchOrdersParams = {
  page?: number | null;
  limit?: number | null;
  country?: string | null;
  status?: OrderStatus;
  search?: string | null;
  sort_by?: SortableFields;
  sort_order?: "asc" | "desc";
};

export const fetchOrdersListData = async ({
  page = 1,
  limit = 20,
  country,
  status,
  search,
  sort_by = "date",
  sort_order = "desc",
}: Partial<FetchOrdersParams>): Promise<OrdersResponse> => {
  try {
    const url = getDataURL("/orders");

    url.searchParams.append("page", String(page));
    url.searchParams.append("limit", String(limit));

    if (country) {
      url.searchParams.append("country", country);
    }

    if (status) {
      url.searchParams.append("status", status);
    }

    if (search) {
      url.searchParams.append("search", search);
    }

    if (sort_by) {
      url.searchParams.append("sort_by", sort_by);
    }

    if (sort_order) {
      url.searchParams.append("order", sort_order);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error("Failed to fetch orders data");
    }

    return (await response.json()) as OrdersResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
