import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import useLayout from "../hooks/useLayout";
import { useSidebar } from "../hooks/useSidebar";

import "./Sidebar-style.scss";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

import Analytix from "../../../assets/analytixLogo.svg?react";

const Sidebar = () => {
  const { navItems } = useLayout();
  const { isOpen, toggle, setSelectedTab, close, selectedTab, open } =
    useSidebar();
  const SideBarIcon = isOpen ? ArrowLeftFromLine : ArrowRightFromLine;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        close();
      } else {
        open();
      }
    };

    if (mediaQuery.matches) {
      close();
    } else {
      open();
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [close, open]);

  const closeOnSmallScreen = () => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    if (mediaQuery.matches) {
      close();
    }
  };

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
          fixed top-0 left-0 z-50 h-full w-64 bg-white
          transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-44"}
          sidebar
        `}
      >
        <div
          className={`flex items-center ${isOpen ? "justify-between px-4" : "justify-end px-2"}  pt-2 lg:px-6 `}
        >
          <div
            className={`flex items-center w-fit ${isOpen ? "" : "cursor-pointer"}`}
            onClick={() => {
              if (!isOpen) {
                toggle();
              }
            }}
          >
            <Analytix className="size-8 m-3" />
            {isOpen && <span className="font-semibold text-lg">Analytix</span>}
          </div>
          {isOpen && (
            <div>
              <SideBarIcon
                className="size-5 lg:hidden cursor-pointer"
                onClick={toggle}
              />
            </div>
          )}
        </div>

        <nav
          className={`flex flex-col ${!isOpen && "items-end"} p-4 lg:p-6 space-y-2`}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                title={item.name}
                className={`flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer ${selectedTab === item.name && "bg-gray-100"}`}
                onClick={() => {
                  setSelectedTab(item.name);
                  closeOnSmallScreen();
                }}
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
