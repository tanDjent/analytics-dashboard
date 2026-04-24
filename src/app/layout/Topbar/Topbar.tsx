import "./Topbar-style.scss";

const Topbar = () => {
  return (
    <header className="h-14 flex items-center justify-end p-4 lg:px-6 bg-white topbar">
      <div className="flex items-center gap-3">
        <span className="font-medium hidden md:flex">Welcome, Tanmay</span>
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
};

export default Topbar;
