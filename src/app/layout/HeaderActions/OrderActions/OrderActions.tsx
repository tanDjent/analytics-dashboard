import CountrySelect from "../common/CountrySelect";
import OrderSearch from "./OrderSearch";
import OrderStatusSelect from "./OrderStatusSelect";

const OrderActions = () => {
  return <div className="flex flex-col gap-3 lg:flex-row">
    <OrderSearch/>
    <OrderStatusSelect/>
    <CountrySelect/> 
  </div>;
};

export default OrderActions;