import "./Topbar-style.scss";
import TanmayDisplayPicture from "../../../assets/TanmayLinkedin.jpeg";
type TopbarProps = {
  showUserModal: () => void;
};
const Topbar = ({ showUserModal }: TopbarProps) => {
  return (
    <header className="h-14 flex items-center justify-end p-4 lg:px-6 bg-white topbar">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={showUserModal}
      >
        <span className="font-medium hidden md:flex">Welcome, Tanmay</span>
        <img
          className="w-8 h-8 rounded-full bg-gray-300"
          src={TanmayDisplayPicture}
        />
      </div>
    </header>
  );
};

export default Topbar;
