import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import logo from "../assets/logoPraktikly.png";
import { FiUser, FiSettings } from "react-icons/fi";

function Header({title}) {
  const [course, setCourse] = useState(null);

  const [progressPercentage, setProgressPercentage] = useState(0);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <header className="bg-gradient-to-r from-indigo-700 to-purple-700 border-b border-indigo-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4 p-2 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-colors lg:hidden"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src={logo}
                alt="Logo"
                className="h-8 transition-opacity hover:opacity-80"
              />
            </Link>
          </div>

          <div className="flex-1 text-center hidden md:block">
            <h1 className="text-white text-xl font-bold truncate max-w-md mx-auto">
              {course?.title}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div
              className="relative w-12 h-12 cursor-pointer group"
              title={`${progressPercentage}% Complete`}
            >
              <svg className="w-12 h-12" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeDasharray={`${progressPercentage}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold group-hover:text-indigo-200 transition-colors">
                {progressPercentage}%
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center cursor-pointer hover:bg-indigo-100 transition-colors">
              <FiUser className="text-indigo-700" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
