import Logo from "../../utils/images/logo.png";
import DashboardIcon from "../../utils/images/dashboard.svg";
import ProjectIcon from "../../utils/images/projects.svg";
import StudentsIcon from "../../utils/images/students.svg";
import SettingsIcon from "../../utils/images/settings.svg";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: DashboardIcon,
  },
  {
    label: "Batches",
    path: "/batches",
    icon: ProjectIcon,
  },
  {
    label: "Team",
    path: "/students",
    icon: StudentsIcon,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: SettingsIcon,
  },
];

const Sidebar = () => {
  return (
    <aside className="min-w-68 bg-white border-r border-gray-200 h-screen py-3">
      <div className="w-full flex justify-center items-center py-4">
        <img src={Logo} alt="Logo" className="w-40 object-contain" />
      </div>
      <hr className="border-gray-200 my-3" />
      <div className="flex-1 no-scrollbar flex flex-col">
        <div className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 text-gray-800 rounded transition-all ${
                  isActive ? "bg-gray-100" : "hover:bg-gray-50"
                }`
              }
            >
              <img src={item.icon} alt={item.label} />
              <p className="text-sm truncate">{item.label}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
