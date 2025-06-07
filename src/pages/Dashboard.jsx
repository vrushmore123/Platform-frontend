import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md space-y-4 text-center">
        <h1 className="text-2xl font-bold">Login as</h1>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <Link
            to="/teacher/dashboard"
            className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Teacher Dashboard
          </Link>
          <Link
            to="/courses"
            className="py-2 px-6 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Student Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
