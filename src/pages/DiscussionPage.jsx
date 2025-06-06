import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  MoreVertical,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function DiscussionPage() {
  const { id } = useParams();
  const [threads] = useState([
    {
      id: "t1",
      title: "Questions regarding Management Accounting",
      author: "Niuosha Samani",
      authorRole: "Teacher",
      date: "20 Mar 11:17",
      replies: [
        {
          id: "r1",
          author: "Scott Anthony Quinn",
          authorInitials: "SQ",
          authorRole: "Student",
          date: "28 May 13:37",
          lastReply: "29 May 13:53",
          text: "Hello, did we discover why we excluded short-term liabilities when calculating the Asset Turnover ratio? The usual is Sales / Avg. Total Assets.",
        },
        {
          id: "r2",
          author: "Huni Johannesson",
          authorInitials: "HJ",
          authorRole: "Teacher",
          date: "29 May 13:53",
          text: "Hi, did you see the announcement?",
        },
      ],
    },
  ]);
  const [openThread, setOpenThread] = useState("t1");

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
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Announcements
            </a>
            <a
              href={`/courses/${id}/discussion`}
              className="block px-3 py-2 rounded bg-blue-50 text-blue-600"
            >
              Discussion
            </a>
          </nav>
        </aside>

        <main className="flex-1 bg-gray-50 p-6">
          {threads.map((thread) => {
            const isOpen = thread.id === openThread;
            return (
              <article
                key={thread.id}
                className="bg-white rounded-lg shadow mb-6 overflow-hidden"
              >
                {/* thread header */}
                <div className="p-5 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{thread.title}</h2>
                    <p className="text-sm text-gray-500">
                      {thread.author} <span className="uppercase">|</span>{" "}
                      {thread.authorRole} &nbsp;•&nbsp; Posted {thread.date}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">
                      {thread.replies.length} Replies
                    </span>
                    <button
                      onClick={() => setOpenThread(isOpen ? null : thread.id)}
                      className="text-gray-500 hover:text-gray-700"
                      title={isOpen ? "Collapse" : "Expand"}
                    >
                      {isOpen ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreVertical />
                    </button>
                  </div>
                </div>

                {/* replies */}
                {isOpen && (
                  <div className="border-t border-gray-200 p-5 space-y-6">
                    {thread.replies.map((r) => (
                      <div key={r.id} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                            {r.authorInitials}
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-medium">{r.author}</span>
                              <span className="ml-2 text-xs text-gray-400">
                                {r.authorRole}
                              </span>
                              <span className="ml-2 text-xs text-gray-400">
                                {r.date}
                              </span>
                              {r.lastReply && (
                                <span className="ml-2 text-xs text-gray-400">
                                  | Last reply {r.lastReply}
                                </span>
                              )}
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical />
                            </button>
                          </div>
                          <p className="mt-2 text-gray-700">{r.text}</p>
                          <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                            <button className="hover:underline">Reply</button>
                            <button className="hover:underline">
                              Mark as Unread
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })}

          {/* pagination */}
          <div className="flex justify-between text-sm text-gray-600">
            <button className="hover:underline">← Previous</button>
            <button className="hover:underline">Next →</button>
          </div>
        </main>
      </div>
    </>
  );
}
