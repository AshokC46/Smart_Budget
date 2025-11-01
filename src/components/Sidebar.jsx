import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Dashboard,
  CreditCard,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const menuItems = [
  { name: "Dashboard", icon: <Dashboard fontSize="small" />, path: "/" },
  {
    name: "Transactions",
    icon: <CreditCard fontSize="small" />,
    path: "/transactions",
  },
  { name: "Goals", icon: <GpsFixedIcon fontSize="small" />, path: "/goals" },
  {
    name: "Reports",
    icon: <BarChartIcon fontSize="small" />,
    path: "/reports",
  },
];

const Sidebar = ({ isOpen, isMobile, closeSidebar }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    if (isMobile) closeSidebar();
  };
  const getNameFromEmail = (email) => {
    if (!email) return "";
    const username = email.split("@")[0];
    const namePart = username.replace(/[0-9]/g, "");
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-teal-600 text-white flex flex-col transition-all duration-300 z-20
        ${isOpen ? "w-60 px-3 py-6" : "w-0 px-0 py-0 overflow-hidden"}
        ${isMobile ? "shadow-xl" : ""}
      `}
    >
      {user && isOpen && (
        <div className="px-4 mb-6">
          <p className="text-m text-white/150">
            Hi, {getNameFromEmail(user.email)}
          </p>
        </div>
      )}

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={isMobile ? closeSidebar : undefined}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all 
              ${pathname === item.path ? "bg-white/20" : "hover:bg-white/10"}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {isOpen && (
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/10 transition-all text-left"
        >
          <LogoutIcon fontSize="small" />
          <span>Logout</span>
        </button>
      )}
      <div className="mt-auto text-xm text-white-400 text-center pb-4">
        © {new Date().getFullYear()} SmartBudget
      </div>
    </aside>
  );
};

export default Sidebar;
