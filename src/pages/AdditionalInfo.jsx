import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiBookOpen,
  FiPlay,
  FiMessageCircle,
  FiAward,
} from "react-icons/fi";

function AdditionalInfo({ course }) {
  const { id } = useParams();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState("");

  const saveNote = () => {
    if (selectedLesson && currentNote.trim()) {
      setNotes({
        ...notes,
        [selectedLesson.id]: currentNote,
      });
      // Show saved confirmation
      const noteButton = document.getElementById("note-save-button");
      if (noteButton) {
        noteButton.innerText = "Saved!";
        setTimeout(() => {
          noteButton.innerText = "Save Note";
        }, 2000);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="prose max-w-none">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <FiBookOpen className="mr-2 text-indigo-600" />
            Lesson Overview
          </h3>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <p className="text-gray-700 leading-relaxed">
              {selectedLesson?.summary ||
                "In this lesson, you'll learn key concepts and practical applications that build on your existing knowledge. Follow along with the video demonstration and complete the exercises to reinforce your understanding."}
            </p>

            {/* Key points */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">
                Key Learning Points:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FiCheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Understanding core concepts and fundamentals
                  </span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Applying techniques to real-world scenarios
                  </span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Mastering advanced strategies and methods
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Additional content */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Additional Resources
            </h4>
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
              <div className="flex items-start">
                <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                  <FiAward className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">
                    Challenge Yourself
                  </h5>
                  <p className="text-gray-700 text-sm mt-1">
                    Complete the practice exercises to reinforce what you've
                    learned in this lesson
                  </p>
                  <button
                    onClick={() => {
                      setCurrentQuiz(sampleQuiz);
                      setShowQuiz(true);
                      setQuizAnswers({});
                      setQuizSubmitted(false);
                    }}
                    className="mt-3 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
                  >
                    <FiPlay className="mr-2" size={14} />
                    Start Exercise
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FiMessageCircle className="mr-2 text-indigo-600" />
          My Notes
        </h3>
        <textarea
          value={
            selectedLesson?.id
              ? notes[selectedLesson.id] || currentNote
              : currentNote
          }
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder="Write your notes here..."
          className="w-full h-36 p-4 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        <button
          id="note-save-button"
          onClick={saveNote}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-[1.02] shadow-sm w-full font-medium"
        >
          Save Note
        </button>

        {/* Quick Note Templates */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Quick Templates
          </h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCurrentNote(currentNote + "\n\n• Key point: ")}
              className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors"
            >
              Add Key Point
            </button>
            <button
              onClick={() => setCurrentNote(currentNote + "\n\n❓ Question: ")}
              className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors"
            >
              Add Question
            </button>
            <button
              onClick={() => setCurrentNote(currentNote + "\n\n📌 Remember: ")}
              className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors"
            >
              Add Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalInfo;
