import { useSidebar } from "../hooks/useSidebar";
import "./Topbar-style.scss";

const Topbar = () => {
  const { selectedTab } = useSidebar();
  return (
    <header className="h-14 border-b flex items-center justify-between p-4 lg:px-6 bg-white topbar">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">{selectedTab}</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <span className="font-medium hidden md:flex">Welcome, Tanmay</span>
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
};

export default Topbar;
