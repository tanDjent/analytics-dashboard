import { useSelectedTab } from "../hooks/useSidebar";
import CountrySelect from "./common/CountrySelect";
import OrderActions from "./OrderActions/OrderActions";

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
    default:
      return <></>;
  }
};

export default HeaderActions;
