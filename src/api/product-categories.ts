import { getDataURL } from "./utility/utility";

export type ProductCategories = string[];

export const fetchProductCategories = async (): Promise<ProductCategories> => {
  try {
    const url = getDataURL("/product-categories").toString();
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch product categories");
    }

    return (await response.json()) as ProductCategories;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
