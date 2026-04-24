import { useSidebar } from "../hooks/useSidebar";
import CountrySelect from "./CountrySelect";

const HeaderActions = () => {
  const { selectedTab } = useSidebar();

  switch (selectedTab) {
    case "Dashboard":
      return (
        <div className="flex">
          <CountrySelect />
        </div>
      );
    default:
      return <></>;
  }
};

export default HeaderActions;
