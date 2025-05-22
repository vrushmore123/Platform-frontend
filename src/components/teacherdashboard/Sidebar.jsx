import React, { useState } from "react";
import {
  FiBarChart2,
  FiFileText,
  FiUser,
  FiBook,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiPlus,
} from "react-icons/fi";

const Sidebar = ({ activeTab, setActiveTab, isMobile, toggleSidebar }) => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: "dashboard", icon: <FiBarChart2 size={20} />, label: "Dashboard" },
    {
      id: "add course",
      icon: <FiPlus size={20} />,
      label: "Add Course",
    },
    { id: "draft", icon: <FiFileText size={20} />, label: "Draft Courses" },
    { id: "profile", icon: <FiUser size={20} />, label: "Profile" },
  ];

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`bg-white shadow-lg flex flex-col transition-all duration-300 ease-in-out 
      ${isMobile ? "fixed inset-y-0 z-50" : "h-screen"} 
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div
        className={`flex items-center p-4 ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              {/* Replace with your logo image */}
              <FiBook className="text-blue-600 text-xl" />
            </div>
            <span className="text-lg font-semibold text-gray-800">
              Praktikly
            </span>
          </div>
        )}

        <button
          onClick={isMobile ? toggleSidebar : toggleCollapse}
          className={`text-gray-500 hover:text-gray-700 ${
            collapsed ? "mx-auto" : ""
          }`}
        >
          {isMobile ? (
            <FiX size={24} />
          ) : collapsed ? (
            <FiMenu size={24} />
          ) : (
            <FiChevronLeft size={24} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto">
        {navItems.map(({ id, icon, label }) => (
          <button
            key={id}
            onClick={() => {
              setActiveTab(id);
              if (isMobile) toggleSidebar();
            }}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all 
              ${
                activeTab === id
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }
              ${collapsed ? "justify-center" : ""}`}
          >
            <span
              className={`${
                activeTab === id ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {icon}
            </span>
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Collapsed Tooltips */}
      {collapsed && (
        <div className="absolute left-full ml-2 hidden group-hover:block bg-white shadow-lg rounded-lg p-2 w-48">
          {navItems.map(({ id, label }) => (
            <div key={id} className="p-2 text-sm text-gray-700">
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
