import { getDataURL } from "./utility/utility";

export type Customer = {
  name: string;
  email: string;
  country: string;
  orders: number;
  total_spent: number;
};

export type CustomersResponse = {
  data: Customer[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type SortableFields = "name" | "email" | "orders" | "total_spent";

type FetchCustomersParams = {
  page?: number | null;
  limit?: number | null;
  country?: string | null;
  search?: string | null;
  sort_by?: SortableFields;
  sort_order?: "asc" | "desc";
};

export const fetchCustomersListData = async ({
  page = 1,
  limit = 20,
  country,
  search,
  sort_by = "name",
  sort_order = "asc",
}: Partial<FetchCustomersParams>): Promise<CustomersResponse> => {
  try {
    const url = getDataURL("/customers");

    url.searchParams.append("page", String(page));
    url.searchParams.append("limit", String(limit));

    if (country) {
      url.searchParams.append("country", country);
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
      throw new Error("Failed to fetch customers data");
    }

    return (await response.json()) as CustomersResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
