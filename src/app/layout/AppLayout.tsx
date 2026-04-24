import HeaderActions from "./HeaderActions/HeaderActions";
import { useSidebar } from "./hooks/useSidebar";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const { isOpen, selectedTab } = useSidebar();

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div
        className={`flex-1 ${isOpen ? "ml-20 lg:ml-64" : "ml-20"} min-h-screen bg-white transition-all duration-300 ease-in-out`}
      >
        <Topbar />

        <main className="p-4 lg:p-6 rounded-lg bg-gray-50">
          <div className="flex flex-col lg:flex-row mb-4 justify-between lg:items-center gap-3 lg:gap-0">
            <div className="flex">
              <h1 className="text-3xl font-medium">{selectedTab}</h1>
            </div>
            <HeaderActions />
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
