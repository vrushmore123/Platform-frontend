import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Home,
  BookOpen,
  Calendar,
  ClipboardList,
  GraduationCap,
  Briefcase,
  Settings,
  Bell,
  Search,
  User,
  ChevronRight,
  Clock,
  AlertCircle,
  TrendingUp,
  FileText,
  CheckCircle,
  Plus,
  Filter,
  Download,
  Users,
  File,
} from "lucide-react";

const assignmentsData = [
  {
    id: 1,
    title: "Assignment 1",
    dueDate: "2023-08-15",
    completed: false,
  },
  {
    id: 2,
    title: "Assignment 2",
    dueDate: "2023-08-20",
    completed: true,
  },
  {
    id: 3,
    title: "Assignment 3",
    dueDate: "2023-08-25",
    completed: false,
  },
];

const announcementsData = [
  {
    id: 1,
    title: "Announcement 1",
    date: "2023-08-15",
    content: "Important update for all students",
  },
  {
    id: 2,
    title: "Announcement 2",
    date: "2023-08-20",
    content: "New courses available next week",
  },
  {
    id: 3,
    title: "Announcement 3",
    date: "2023-08-22",
    content: "Platform maintenance scheduled",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [userRole, setUserRole] = useState("student"); // 'student', 'teacher', 'admin', 'employer'

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation - Updated with modern styling */}
      <div className="w-72 bg-gradient-to-b from-indigo-700 to-indigo-800 shadow-xl flex flex-col">
        <div className="p-6 flex items-center justify-start border-b border-indigo-600">
          <h1 className="text-2xl font-bold text-white">Pratikly</h1>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className={`flex items-center p-3 rounded-lg transition-all ${
                  activeTab === "home"
                    ? "bg-white/10 text-white shadow-md"
                    : "text-indigo-100 hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => setActiveTab("home")}
              >
                <Home className="w-5 h-5 mr-3" />
                <span className="font-medium">Home</span>
              </Link>
            </li>

            <li>
              <Link
                to="/courses"
                className={`flex items-center p-3 rounded-lg transition-all ${
                  activeTab === "courses"
                    ? "bg-white/10 text-white shadow-md"
                    : "text-indigo-100 hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => setActiveTab("courses")}
              >
                <BookOpen className="w-5 h-5 mr-3" />
                <span className="font-medium">My Courses</span>
              </Link>
            </li>

            <li>
              <Link
                to="/calendar"
                className={`flex items-center p-3 rounded-lg transition-all ${
                  activeTab === "calendar"
                    ? "bg-white/10 text-white shadow-md"
                    : "text-indigo-100 hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => setActiveTab("calendar")}
              >
                <Calendar className="w-5 h-5 mr-3" />
                <span className="font-medium">Calendar</span>
              </Link>
            </li>

            <li>
              <Link
                to="/assignments"
                className={`flex items-center p-3 rounded-lg transition-all ${
                  activeTab === "assignments"
                    ? "bg-white/10 text-white shadow-md"
                    : "text-indigo-100 hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => setActiveTab("assignments")}
              >
                <ClipboardList className="w-5 h-5 mr-3" />
                <span className="font-medium">Assignments</span>
              </Link>
            </li>

            {(userRole === "teacher" || userRole === "admin") && (
              <li>
                <Link
                  to="/grades"
                  className={`flex items-center p-3 rounded-lg transition-all ${
                    activeTab === "grades"
                      ? "bg-white/10 text-white shadow-md"
                      : "text-indigo-100 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("grades")}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  <span className="font-medium">Grade Center</span>
                </Link>
              </li>
            )}

            <li>
              <Link
                to="/internships"
                className={`flex items-center p-3 rounded-lg transition-all ${
                  activeTab === "internships"
                    ? "bg-white/10 text-white shadow-md"
                    : "text-indigo-100 hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => setActiveTab("internships")}
              >
                <GraduationCap className="w-5 h-5 mr-3" />
                <span className="font-medium">Internships</span>
              </Link>
            </li>

            <li>
              <Link
                to="/jobs"
                className={`flex items-center p-3 rounded-lg transition-all ${
                  activeTab === "jobs"
                    ? "bg-white/10 text-white shadow-md"
                    : "text-indigo-100 hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => setActiveTab("jobs")}
              >
                <Briefcase className="w-5 h-5 mr-3" />
                <span className="font-medium">Job Board</span>
              </Link>
            </li>

            {userRole === "admin" && (
              <li>
                <Link
                  to="/admin"
                  className={`flex items-center p-3 rounded-lg transition-all ${
                    activeTab === "admin"
                      ? "bg-white/10 text-white shadow-md"
                      : "text-indigo-100 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("admin")}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  <span className="font-medium">Admin Panel</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* User profile at bottom */}
        <div className="p-4 border-t border-indigo-600">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-indigo-200 capitalize">{userRole}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Updated with better spacing and modern cards */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold text-gray-800">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Routes>
            <Route path="/" element={<HomeTab userRole={userRole} />} />
            <Route path="/courses" element={<CoursesTab />} />
            <Route path="/calendar" element={<CalendarTab />} />
            <Route path="/assignments" element={<AssignmentsTab />} />
            <Route path="/grades" element={<GradesTab />} />
            <Route path="/internships" element={<InternshipsTab />} />
            <Route path="/jobs" element={<JobsTab />} />
            <Route path="/admin" element={<AdminTab />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Tab Components with updated UI
const HomeTab = ({ userRole }) => {
  const [completedCourses, setCompletedCourses] = useState(0);
  const [courses, setCourses] = useState([]);
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome Back, John!
      </h2>

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Upcoming Assignments/Quizzes */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:scale-102">
          <h2 className="text-xl font-bold mb-4 flex items-center text-blue-800">
            <svg
              className="w-6 h-6 mr-2 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            Upcoming Assignments
          </h2>
          <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
            {assignmentsData.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-blue-100 transition-all duration-300 border border-blue-100 shadow-sm hover:shadow-md transform hover:translate-x-1"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Due:{" "}
                      {new Date(item.dueDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full shadow-sm ${
                      item.completed
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-orange-100 text-orange-800 border border-orange-200"
                    }`}
                  >
                    {item.completed ? "Completed" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow border border-blue-200 hover:border-blue-300 transform hover:scale-102">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            View All Assignments
          </button>
        </div>

        {/* Enhanced Course Progress */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-green-200 transition-all duration-300 transform hover:scale-102">
          <h2 className="text-xl font-bold mb-4 flex items-center text-green-800">
            <svg
              className="w-6 h-6 mr-2 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Course Progress
          </h2>
          <div className="text-center mt-8 mb-12">
            <div className="inline-flex items-center justify-center h-40 w-40 rounded-full bg-gradient-to-r from-green-50 to-blue-50 border-4 border-white shadow-lg relative animate-float">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                    strokeDasharray="100, 100"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#4ADE80"
                    strokeWidth="3"
                    strokeDasharray={`${
                      (completedCourses / courses.length) * 100
                    }, 100`}
                    className="progress-ring"
                  />
                </svg>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800">
                  {((completedCourses / courses.length) * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600 mt-1">Completed</div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-gray-600">
                Completed Courses
              </div>
              <div className="text-sm font-bold text-gray-800">
                {completedCourses} of {courses.length}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2.5 rounded-full"
                style={{
                  width: `${(completedCourses / courses.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <button className="w-full mt-8 flex items-center justify-center bg-green-50 hover:bg-green-100 text-green-600 font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow border border-green-200 hover:border-green-300 transform hover:scale-102">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            View My Progress
          </button>
        </div>

        {/* Announcements */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-yellow-100 hover:shadow-lg hover:border-yellow-200 transition-all duration-300 transform hover:scale-102">
          <h2 className="text-xl font-bold mb-4 flex items-center text-yellow-800">
            <svg
              className="w-6 h-6 mr-2 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
            Announcements
          </h2>
          <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
            {announcementsData.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-gradient-to-r from-gray-50 to-yellow-50 rounded-xl hover:from-yellow-50 hover:to-yellow-100 transition-all duration-300 border border-yellow-100 shadow-sm hover:shadow-md transform hover:translate-x-1"
              >
                <div>
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 flex items-center justify-center bg-yellow-50 hover:bg-yellow-100 text-yellow-600 font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow border border-yellow-200 hover:border-yellow-300 transform hover:scale-102">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            View All Announcements
          </button>
        </div>
      </div>
    </div>
  );
};

const CoursesTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>
        <button className="flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus className="w-5 h-5 mr-2" />
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Course Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
          <div className="h-40 bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg mb-1">
                Web Development Bootcamp
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <p className="text-gray-500 mb-4">Instructor: John Doe</p>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Progress</span>
                <span className="font-medium text-indigo-600">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
              Continue Learning <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
          <div className="h-40 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg mb-1">
                Data Science Fundamentals
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                In Progress
              </span>
            </div>
            <p className="text-gray-500 mb-4">Instructor: Jane Smith</p>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Progress</span>
                <span className="font-medium text-indigo-600">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
            <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
              Continue Learning <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Calendar</h2>
          <p className="text-gray-600">
            View your schedule and upcoming events
          </p>
        </div>
        <button className="flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add Event
        </button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        {/* Calendar component would go here */}
        <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <div className="text-center">
            <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500 text-lg">Interactive Calendar View</p>
            <p className="text-gray-400 text-sm mt-1">
              [With assignments, classes, and events]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AssignmentsTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Assignments</h2>
          <p className="text-gray-600">Track and manage your work</p>
        </div>
        <button className="flex items-center px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="w-5 h-5 mr-2" />
          Export
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              All
            </button>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Pending
            </button>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Submitted
            </button>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Graded
            </button>
          </div>
          <div className="relative">
            <select className="appearance-none block pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option>Sort by: Due Date</option>
              <option>Sort by: Course</option>
              <option>Sort by: Status</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronRight className="w-4 h-4 transform rotate-90" />
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">
                  Assignment 1 - React Components
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Web Development • Due: May 15, 2023
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Create a React component that displays a list of items with
                  filtering functionality.
                </p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Submitted
                </div>
                <p className="text-sm text-gray-500 mt-2">Grade: 85/100</p>
              </div>
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">
                  Quiz 2 - Data Structures
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Data Science • Due: May 20, 2023
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Multiple choice quiz covering arrays, linked lists, and hash
                  tables.
                </p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Pending
                </div>
                <p className="text-sm text-gray-500 mt-2">3 days remaining</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GradesTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Grade Center</h2>
          <p className="text-gray-600">View and manage student grades</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Add Grade
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Student
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Course
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Assignment
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Grade
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        John Smith
                      </div>
                      <div className="text-sm text-gray-500">
                        john@example.com
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Web Development
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Assignment 1
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    85%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Graded
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    Edit
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const InternshipsTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Internship Opportunities
          </h2>
          <p className="text-gray-600">Find and apply for internships</p>
        </div>
        <button className="flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          New Internship
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl mb-1">
                  Frontend Developer Intern
                </h3>
                <p className="text-gray-600">TechCorp • San Francisco, CA</p>
              </div>
              <div className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                New
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span>Duration: 3 months (Summer 2023)</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <AlertCircle className="w-4 h-4 mr-2 text-gray-500" />
                <span>Application Deadline: May 15, 2023</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                <span>Stipend: $25/hour</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800">
                React
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800">
                JavaScript
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800">
                HTML/CSS
              </span>
            </div>
            <div className="flex space-x-3">
              <button className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Apply Now
              </button>
              <button className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl mb-1">Data Analyst Intern</h3>
                <p className="text-gray-600">DataWorld • New York, NY</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span>Duration: 6 months</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <AlertCircle className="w-4 h-4 mr-2 text-gray-500" />
                <span>Application Deadline: May 30, 2023</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                <span>Stipend: $22/hour</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800">
                Python
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800">
                SQL
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800">
                Excel
              </span>
            </div>
            <div className="flex space-x-3">
              <button className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Apply Now
              </button>
              <button className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobsTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Job Board</h2>
          <p className="text-gray-600">Find your next career opportunity</p>
        </div>
        <button className="flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Post Job
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search jobs by title, company, or keywords..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <select className="appearance-none block pl-3 pr-8 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option>All Categories</option>
                <option>Technology</option>
                <option>Business</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronRight className="w-4 h-4 transform rotate-90" />
              </div>
            </div>
            <button className="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-xl">Junior Web Developer</h3>
                <p className="text-gray-600">
                  WebSolutions Inc. • San Francisco, CA
                </p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                New
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                Remote
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                Full-time
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                $70,000 - $90,000
              </span>
            </div>
            <p className="text-gray-700 mb-4 line-clamp-2">
              We're looking for a Junior Web Developer with experience in React
              and Node.js to join our growing team. You'll work on building and
              maintaining client websites and web applications.
            </p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Posted: 2 days ago • 12 applicants
              </p>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Save
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-xl">UX/UI Designer</h3>
                <p className="text-gray-600">CreativeMinds • New York, NY</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                Hybrid
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                Full-time
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                $80,000 - $100,000
              </span>
            </div>
            <p className="text-gray-700 mb-4 line-clamp-2">
              Join our design team to create beautiful and functional user
              experiences for our clients. We're looking for someone with strong
              Figma skills and a portfolio showcasing UX/UI work.
            </p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Posted: 1 week ago • 24 applicants
              </p>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Save
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-gray-600">
            Manage system settings and configurations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            System Logs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all group">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-100 mr-4 group-hover:bg-indigo-200 transition-colors">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <span className="font-medium block">Manage Users</span>
              <span className="text-sm text-gray-500">142 active users</span>
            </div>
          </div>
        </button>

        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all group">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-100 mr-4 group-hover:bg-indigo-200 transition-colors">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <span className="font-medium block">Manage Courses</span>
              <span className="text-sm text-gray-500">24 active courses</span>
            </div>
          </div>
        </button>

        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all group">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-100 mr-4 group-hover:bg-indigo-200 transition-colors">
              <Settings className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <span className="font-medium block">System Settings</span>
              <span className="text-sm text-gray-500">Configure platform</span>
            </div>
          </div>
        </button>

        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all group">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-100 mr-4 group-hover:bg-indigo-200 transition-colors">
              <File className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <span className="font-medium block">Reports</span>
              <span className="text-sm text-gray-500">Generate analytics</span>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-indigo-100 mr-4">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-medium">New user registered</p>
              <p className="text-sm text-gray-500">
                Jane Doe signed up 2 hours ago
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-indigo-100 mr-4">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-medium">New course created</p>
              <p className="text-sm text-gray-500">
                "Advanced React" was added yesterday
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
