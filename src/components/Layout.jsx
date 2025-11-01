import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-10"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          !isMobile && isSidebarOpen ? "ml-60" : "ml-0"
        }`}
      >
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
