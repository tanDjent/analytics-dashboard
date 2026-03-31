import { ArrowLeftFromLine, ArrowRightFromLine, Boxes } from "lucide-react";
import useLayout from "../hooks/useLayout";
import { useSidebar } from "../hooks/useSidebar";

import "./Sidebar-style.scss";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { navItems } = useLayout();
  const { isOpen, toggle, setSelectedTab } = useSidebar();
  const SideBarIcon = isOpen ? ArrowLeftFromLine : ArrowRightFromLine;

  return (
    <>
      {/* Overlay (mobile) */}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={(event) => {
            toggle();
            event.stopPropagation();
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r
          transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-44"}
          sidebar
        `}
      >
        <div
          className={`flex items-center ${isOpen ? "justify-between" : "justify-end"} p-4 border-b cursor-pointer h-14`}
          onClick={toggle}
        >
          <div className="flex items-center w-fit">
            <Boxes className="size-5 m-3 cursor-pointer" />
            {isOpen && <span className="font-semibold text-lg">Analytix</span>}
          </div>
          {isOpen && (
            <div>
              <SideBarIcon className="size-5" />
            </div>
          )}
        </div>

        <nav
          className={`flex flex-col ${!isOpen && "items-end"} p-4 space-y-2`}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                title={item.name}
                className={`flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer`}
                onClick={() => setSelectedTab(item.name)}
              >
                <Icon className="size-5" />
                {isOpen && (
                  <span className=" ml-3 font-medium">{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
