import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Search, CheckCircle } from "lucide-react";

export default function AssignmentsPage() {
  const { id } = useParams();

  const [assignments, setAssignments] = useState([
    {
      id: "a1",
      title: "Assignment 1: Introduction",
      sections: "All sections",
      postedOn: "29 May 2025",
      dueDate: "05 Jun 2025",
    },
    {
      id: "a2",
      title: "Assignment 2: Research Proposal",
      sections: "Section A",
      postedOn: "25 May 2025",
      dueDate: "10 Jun 2025",
    },
  ]);
  const [search, setSearch] = useState("");

  const filtered = assignments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const sectionsCount = new Set(assignments.map((a) => a.sections)).size;
  const overdueCount = assignments.filter(
    (a) => new Date(a.dueDate) < new Date()
  ).length;
  const upcomingDueDate =
    assignments
      .filter((a) => new Date(a.dueDate) >= new Date())
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0]?.dueDate ||
    "N/A";

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
              href="#"
              className="block px-3 py-2 rounded bg-blue-50 text-blue-600"
            >
              Assignments
            </a>
            <a
              href="/courses/:id/announcements"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Announcements
            </a>
            <a
              href="/courses/:id/discussion"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Discussion
            </a>
          </nav>
        </aside>

        <main className="flex-1">
          <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Header & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <h1 className="text-3xl font-semibold text-gray-800">
                  Course &gt; Assignments
                </h1>
                <button className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  <CheckCircle className="w-5 h-5" /> Mark All Done
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <p className="text-sm text-gray-500">Total Assignments</p>
                  <p className="text-2xl font-bold">{assignments.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <p className="text-sm text-gray-500">Sections</p>
                  <p className="text-2xl font-bold">{sectionsCount}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <p className="text-sm text-gray-500">Upcoming Due</p>
                  <p className="text-2xl font-bold">{upcomingDueDate}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <p className="text-sm text-gray-500">Overdue</p>
                  <p className="text-2xl font-bold">{overdueCount}</p>
                </div>
              </div>

              {/* Search */}
              <div className="mb-4">
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search assignments..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Assignment List */}
              <ul className="space-y-3">
                {filtered.map((a) => (
                  <li
                    key={a.id}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-medium">{a.title}</h2>
                        <p className="text-sm text-gray-500">{a.sections}</p>
                      </div>
                      <div className="text-xs text-gray-500 text-right space-y-1">
                        <div>Posted: {a.postedOn}</div>
                        <div>Due: {a.dueDate}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
