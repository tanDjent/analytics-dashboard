import CountrySelect from "../common/CountrySelect";
import SearchAction from "../common/SearchAction";
import ProductCategoriesSelect from "./ProductCategoriesSelect";

const ProductActions = () => {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <SearchAction placeholder="Search Products" />
      <ProductCategoriesSelect />
      <CountrySelect />
    </div>
  );
};

export default ProductActions;
