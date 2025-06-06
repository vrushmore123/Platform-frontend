import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import Navbar from "../components/Navbar";

export default function AnnouncementsPage() {
  const { id } = useParams();
  const [announcements, setAnnouncements] = useState([
    {
      id: "n1",
      title: "New Module Released",
      date: "01 Jun 2025",
      summary:
        "Module 3 on Advanced React Hooks is now available. Check it out!",
      unread: true,
    },
    {
      id: "n2",
      title: "Office Hours Reminder",
      date: "30 May 2025",
      summary:
        "Join the live Q&A session tomorrow at 3 PM to get your questions answered.",
      unread: false,
    },
  ]);
  const [search, setSearch] = useState("");

  const filtered = announcements.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );
  const unreadCount = announcements.filter((a) => a.unread).length;

  return (
    <>
      <Navbar />
      <div className="flex">
        <aside className="w-64 bg-white shadow-md p-4 hidden sm:block">
          <nav className="space-y-2">
            <a
              href="/courses"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Courses
            </a>
            <a
              href={`/courses/${id}/assignments`}
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Assignments
            </a>
            <a
              href={`/courses/${id}/announcements`}
              className="block px-3 py-2 rounded bg-blue-50 text-blue-600"
            >
              Announcements
            </a>
            <a
              href={`/courses/${id}/discussion`}
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Discussion
            </a>
          </nav>
        </aside>

        <main className="flex-1">
          <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Page Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <h1 className="text-3xl font-semibold text-gray-800">
                  Course &gt; Announcements
                </h1>
                <button className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  <Bell className="w-5 h-5" /> Mark All Read
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold">{announcements.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <p className="text-sm text-gray-500">Unread</p>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                </div>
              </div>

              {/* Search */}
              <div className="mb-8 max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search announcements..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Announcement Cards */}
              <ul className="space-y-6">
                {filtered.map((a) => (
                  <li
                    key={a.id}
                    className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col sm:flex-row sm:justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-medium text-gray-800">
                          {a.title}
                        </h2>
                        {a.unread && (
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded">
                            Unread
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mt-3 line-clamp-3">
                        {a.summary}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-6 text-right text-sm text-gray-500 whitespace-nowrap">
                      {a.date}
                    </div>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="text-center text-gray-500 py-10">
                    No announcements found.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
