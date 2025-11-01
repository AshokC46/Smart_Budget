import React from "react";
import { Menu } from "@mui/icons-material";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="flex justify-between items-center p-4 border-b bg-white sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-teal-600 transition-all"
        >
          <Menu />
        </button>
        <h2 className="text-lg font-medium">SmartBudget</h2>
      </div>
    </header>
  );
};

export default Navbar;
