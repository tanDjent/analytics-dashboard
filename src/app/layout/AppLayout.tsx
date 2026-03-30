import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";

type AppLayoutProps = { children: React.ReactNode };
const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 lg:ml-64 min-h-screen bg-gray-50">
        <Topbar />

        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
