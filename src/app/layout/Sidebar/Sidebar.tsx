import {
  ArrowLeftStartOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import useLayout from "../hooks/useLayout";
import { useSidebar } from "../hooks/useSidebar";

const Sidebar = () => {
  const { navItems } = useLayout();
  const { isOpen, toggle } = useSidebar();
  const SideBarIcon = isOpen
    ? ArrowLeftStartOnRectangleIcon
    : ArrowRightStartOnRectangleIcon;
  return (
    <>
      {/* Overlay (mobile) */}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={toggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r
          transform transition-transform duration-200

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold text-lg">Analytics</span>
          <div className="lg:hidden" onClick={toggle}>
            <SideBarIcon className="size-5" />
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              {item.name}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
