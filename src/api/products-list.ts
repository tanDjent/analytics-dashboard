import { getDataURL } from "./utility/utility";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  revenue: number;
  country: string;
};

export type ProductsResponse = {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type SortableFields =
  | "id"
  | "name"
  | "category"
  | "price"
  | "stock"
  | "sales"
  | "revenue";

type FetchProductsParams = {
  page?: number | null;
  limit?: number | null;
  country?: string | null;
  category?: string | null;
  search?: string | null;
  sort_by?: SortableFields;
  sort_order?: "asc" | "desc";
};

export const fetchProductsListData = async ({
  page = 1,
  limit = 20,
  country,
  category,
  search,
  sort_by = "id",
  sort_order = "asc",
}: Partial<FetchProductsParams>): Promise<ProductsResponse> => {
  try {
    const url = getDataURL("/products");

    url.searchParams.append("page", String(page));
    url.searchParams.append("limit", String(limit));

    if (country) {
      url.searchParams.append("country", country);
    }

    if (category) {
      url.searchParams.append("category", category);
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
      throw new Error("Failed to fetch products data");
    }

    return (await response.json()) as ProductsResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
