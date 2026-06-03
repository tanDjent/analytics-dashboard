import CountrySelect from "../common/CountrySelect";
import SearchAction from "../common/SearchAction";

const CustomerActions = () => {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <SearchAction placeholder="Search Customer" />
      <CountrySelect />
    </div>
  );
};

export default CustomerActions;
