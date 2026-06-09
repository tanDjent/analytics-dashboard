import { useSidebar } from "../../store/useSidebar";
import HeaderActions from "./HeaderActions/HeaderActions";
import { type Tabs } from "./hooks/useSidebar";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import { Outlet, useLocation } from "react-router-dom";
import UserDetailsModal from "./UserDetailsModal/UserDetailsModal";
import { useState } from "react";

const AppLayout = () => {
  const { isOpen } = useSidebar();

  const location = useLocation();

  const titleMap: Record<string, Tabs> = {
    "/": "Dashboard",
    "/customers": "Customers",
    "/orders": "Orders",
    "/products": "Products",
    "/team": "Team",
    "/settings": "Settings",
  };

  const selectedTab = titleMap[location.pathname] ?? "Dashboard";

  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <div className="flex h-dvh">
      <Sidebar />

      <div
        className={`flex flex-1 flex-col min-w-0 ${
          isOpen ? "ml-20 lg:ml-64" : "ml-20"
        } bg-white transition-all duration-300 ease-in-out`}
      >
        <Topbar showUserModal={() => setShowUserModal(true)} />

        <main className="flex-1 overflow-auto p-4 lg:p-6 bg-gray-50">
          <div className="flex flex-col lg:flex-row mb-4 justify-between lg:items-center gap-3 lg:gap-0">
            <h1 className="text-3xl font-medium">{selectedTab}</h1>
            <HeaderActions />
          </div>

          <Outlet />

          <UserDetailsModal
            open={showUserModal}
            close={() => setShowUserModal(false)}
          />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
