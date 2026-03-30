import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import "./Topbar-style.scss";
import { useSidebar } from "../hooks/useSidebar";

const Topbar = () => {
  const { toggle } = useSidebar();

  return (
    <header className="h-14 border-b flex items-center justify-between p-4 lg:px-6 bg-white topbar">
      <div className="flex items-center gap-3">
        <div className="lg:hidden" onClick={toggle}>
          <ArrowRightStartOnRectangleIcon className="size-5" />
        </div>

        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
};

export default Topbar;
