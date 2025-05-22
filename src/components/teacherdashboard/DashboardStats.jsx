import React from "react";
import { BookOpen, Users, UserCheck, Star, Clock } from "lucide-react";

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Courses Stat Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-xl">
            <BookOpen size={24} className="text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Total Courses
            </h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {stats.totalCourses}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500 flex items-center">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            <span>All active and draft courses</span>
          </p>
        </div>
      </div>

      {/* Total Students Stat Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center">
          <div className="bg-green-100 p-3 rounded-xl">
            <Users size={24} className="text-green-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Total Students
            </h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {stats.totalStudents}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500 flex items-center">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span>All enrolled students</span>
          </p>
        </div>
      </div>

      {/* Active Students Stat Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center">
          <div className="bg-purple-100 p-3 rounded-xl">
            <UserCheck size={24} className="text-purple-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Active Students
            </h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {stats.activeStudents}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500 flex items-center">
            <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            <span>Students active this month</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
