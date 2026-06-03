import { useSelectedTab } from "../hooks/useSidebar";
import CountrySelect from "./common/CountrySelect";
import CustomerActions from "./CustomerActions/CustomerActions";
import OrderActions from "./OrderActions/OrderActions";
import ProductActions from "./ProductActions/ProductActions";

const HeaderActions = () => {
  const selectedTab = useSelectedTab();

  switch (selectedTab) {
    case "Dashboard":
      return (
        <div className="flex">
          <CountrySelect />
        </div>
      );
    case "Orders":
      return <OrderActions />;
    case "Customers":
      return <CustomerActions />;
    case "Products":
      return <ProductActions />;
    default:
      return <></>;
  }
};

export default HeaderActions;
