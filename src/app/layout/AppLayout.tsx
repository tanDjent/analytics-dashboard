import { useSidebar } from "./hooks/useSidebar";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const { isOpen } = useSidebar();

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div
        className={`flex-1 ${isOpen ? "ml-20 lg:ml-64" : "ml-20"} min-h-screen bg-gray-50 transition-all duration-300 ease-in-out`}
      >
        <Topbar />

        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
