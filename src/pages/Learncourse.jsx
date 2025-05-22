// frontend/src/CourseLearning.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import logo from "../assets/logoPraktikly.png";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiVideo,
  FiAlertTriangle,
  FiBookOpen,
  FiFileText,
  FiHeart,
  FiBookmark,
  FiShare2,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiPlay,
  FiDownload,
  FiLock,
  FiMessageCircle,
  FiAward,
  FiUser,
  FiSettings,
} from "react-icons/fi";
import AdditionalInfo from "./AdditionalInfo";
import Header from "./Header";

const VideoPlayer = ({ url, title, resource }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showResource, setShowResource] = useState(false);

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleReady = () => {
    setLoading(false);
  };

  if (error) {
    return (
      <div className="absolute inset-0 bg-red-50 flex flex-col items-center justify-center p-6 text-center rounded-xl">
        <FiAlertTriangle className="text-red-500 w-12 h-12 mb-4" />
        <h3 className="text-lg font-medium text-red-700 mb-2">
          Video Unavailable
        </h3>
        <p className="text-gray-600 mb-4">
          We couldn't load this lesson's video.
        </p>
        {resource ? (
          <button
            onClick={() => setShowResource(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-md"
          >
            View Resource Instead
          </button>
        ) : url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-md"
          >
            Open Video Directly
          </a>
        ) : null}
      </div>
    );
  }

  if (showResource || !url) {
    return (
      <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center p-6 rounded-xl overflow-hidden">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <FiFileText className="text-indigo-500 w-16 h-16 mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            {title || "Lesson Resource"}
          </h3>
          <p className="text-gray-600 mb-6 text-center">
            {resource
              ? "This lesson provides a downloadable resource instead of a video."
              : "No video or resource available for this lesson."}
          </p>

          {resource && (
            <a
              href={resource}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
            >
              <FiDownload className="mr-2" />
              Download Resource
            </a>
          )}

          {url && !resource && (
            <button
              onClick={() => setShowResource(false)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Try Loading Video Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-10">
          <div className="animate-pulse flex flex-col items-center">
            <FiPlay className="w-16 h-16 text-indigo-500 mb-4" />
            <div className="h-2 w-24 bg-indigo-400 rounded"></div>
          </div>
        </div>
      )}

      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        onError={handleError}
        onReady={handleReady}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0,
              origin: window.location.origin,
              host: "https://www.youtube-nocookie.com",
            },
          },
        }}
      />
    </div>
  );
};
const ResourcePanel = ({ isOpen, resources, onClose }) => {
  if (!isOpen) return null;

  const dummyResources = [
    {
      title: "Lesson PDF Notes",
      type: "pdf",
      size: "2.4MB",
      url: "#",
    },
    {
      title: "Exercise Worksheet",
      type: "docx",
      size: "1.8MB",
      url: "#",
    },
    {
      title: "Additional Reading",
      type: "link",
      url: "https://example.com/reading",
    },
  ];

  const allResources = resources?.length > 0 ? resources : dummyResources;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all animate-fadeIn">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">Lesson Resources</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {allResources.map((resource) => (
              <div
                key={resource.url}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors group"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
                    {resource.type === "pdf" && (
                      <FiFileText className="w-6 h-6" />
                    )}
                    {resource.type === "docx" && (
                      <FiFileText className="w-6 h-6" />
                    )}
                    {resource.type === "link" && (
                      <FiShare2 className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {resource.title}
                    </h4>
                    {resource.size && (
                      <p className="text-sm text-gray-500">{resource.size}</p>
                    )}
                  </div>
                </div>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-indigo-600 group-hover:text-indigo-600"
                >
                  <FiDownload className="w-5 h-5" />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseLearning = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizScore, setQuizScore] = useState(0);

  // State management
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState("");
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [allLessonsCompleted, setAllLessonsCompleted] = useState(false);

  useEffect(() => {
    const allLessons = course?.modules?.flatMap((mod) => mod.lessons) || [];
    setAllLessonsCompleted(
      completedLessons.size === allLessons.length && allLessons.length > 0
    );
  }, [completedLessons, course]);
  const handleDownloadCertificate = () => {
    // This is a placeholder - you would typically make an API call to generate/download a certificate
    const certificateData = {
      courseName: course?.title || "Course",
      studentName: "John Doe", // Replace with actual user name
      completionDate: new Date().toLocaleDateString(),
      teacherName: course?.teacher?.name || "Instructor",
    };

    // Create a simple certificate (in a real app, this would be a proper PDF generation)
    const certificateContent = `
    <html>
      <head>
        <title>Certificate of Completion</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 40px; }
          .certificate { border: 20px solid #4f46e5; padding: 40px; max-width: 800px; margin: 0 auto; }
          h1 { color: #4f46e5; }
          .signature { margin-top: 60px; }
        </style>
      </head>
      <body>
        <div class="certificate">
          <h1>CERTIFICATE OF COMPLETION</h1>
          <p>This is to certify that</p>
          <h2>${certificateData.studentName}</h2>
          <p>has successfully completed the course</p>
          <h3>"${certificateData.courseName}"</h3>
          <p>on ${certificateData.completionDate}</p>
          <div class="signature">
            <p>${certificateData.teacherName}</p>
            <p>Instructor</p>
          </div>
        </div>
      </body>
    </html>
  `;

    // Create a blob and download it
    const blob = new Blob([certificateContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${certificateData.courseName.replace(
      /\s+/g,
      "_"
    )}_Certificate.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `https://platform-backend-c4zp.onrender.com/teacher_courses/${id}`
        );
        const courseData = response.data;

        const transformedModules = courseData.modules.map((module) => ({
          ...module,
          lessons: module.lessons.map((lesson, idx) => ({
            ...lesson,
            video: lesson.video_url?.replace("http://", "https://"),
            resource: lesson.resource_url,
            id: lesson.id || `${module.id}-${idx}`,
          })),
        }));

        setCourse({
          ...courseData,
          modules: transformedModules,
        });

        // Initialize all modules as expanded
        const initialExpandedState = {};
        transformedModules.forEach((module, index) => {
          initialExpandedState[module.id || index] = index === 0; // Only expand first module
        });
        setExpandedModules(initialExpandedState);

        if (transformedModules[0]?.lessons?.length > 0) {
          setSelectedLesson(transformedModules[0].lessons[0]);
        }
      } catch (err) {
        setError(err.response?.data?.detail || "Error loading course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const QuizPanel = ({
    quiz,
    onClose,
    answers,
    setAnswers,
    onSubmit,
    submitted,
    score,
  }) => {
    const handleAnswerChange = (questionId, value) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: value,
      }));
    };

    const calculateScore = () => {
      if (!quiz) return 0;

      let correct = 0;
      quiz.questions.forEach((q) => {
        if (q.type === "multiple-choice") {
          const selectedOption = q.options.find((o) => o.id === answers[q.id]);
          if (selectedOption?.correct) correct++;
        } else if (q.type === "multiple-answer") {
          const selectedOptions = answers[q.id] || [];
          const allCorrectSelected = q.options
            .filter((o) => o.correct)
            .every((o) => selectedOptions.includes(o.id));
          const noIncorrectSelected = !q.options
            .filter((o) => !o.correct)
            .some((o) => selectedOptions.includes(o.id));

          if (allCorrectSelected && noIncorrectSelected) correct++;
        }
        // Text answers aren't scored automatically
      });

      return Math.round((correct / quiz.questions.length) * 100);
    };

    const finalScore = submitted ? score : calculateScore();

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">{quiz.title}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-6">
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-green-800">
                      Quiz Submitted!
                    </h4>
                    <p className="text-green-700">Your score: {finalScore}%</p>
                  </div>
                  <FiAward className="w-8 h-8 text-green-600" />
                </div>
              </div>
            )}

            <div className="space-y-8">
              {quiz.questions.map((q) => (
                <div
                  key={q.id}
                  className="border-b border-gray-100 pb-6 last:border-0"
                >
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    {q.question}
                  </h4>

                  {q.type === "multiple-choice" && (
                    <div className="space-y-3">
                      {q.options.map((opt) => (
                        <label
                          key={opt.id}
                          className="flex items-start space-x-3"
                        >
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            checked={answers[q.id] === opt.id}
                            onChange={() => handleAnswerChange(q.id, opt.id)}
                            className="mt-1"
                            disabled={submitted}
                          />
                          <span
                            className={
                              submitted && opt.correct
                                ? "text-green-600 font-medium"
                                : ""
                            }
                          >
                            {opt.text}
                            {submitted && opt.correct && (
                              <span className="ml-2 text-green-500">
                                ✓ Correct answer
                              </span>
                            )}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === "multiple-answer" && (
                    <div className="space-y-3">
                      {q.options.map((opt) => (
                        <label
                          key={opt.id}
                          className="flex items-start space-x-3"
                        >
                          <input
                            type="checkbox"
                            checked={(answers[q.id] || []).includes(opt.id)}
                            onChange={(e) => {
                              const current = answers[q.id] || [];
                              const newAnswers = e.target.checked
                                ? [...current, opt.id]
                                : current.filter((id) => id !== opt.id);
                              handleAnswerChange(q.id, newAnswers);
                            }}
                            className="mt-1"
                            disabled={submitted}
                          />
                          <span
                            className={
                              submitted && opt.correct
                                ? "text-green-600 font-medium"
                                : ""
                            }
                          >
                            {opt.text}
                            {submitted && opt.correct && (
                              <span className="ml-2 text-green-500">
                                ✓ Correct answer
                              </span>
                            )}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === "text" && (
                    <textarea
                      value={answers[q.id] || ""}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows={4}
                      placeholder="Type your answer here..."
                      disabled={submitted}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="sticky bottom-0 bg-white p-4 border-t">
            {!submitted ? (
              <button
                onClick={() => {
                  const score = calculateScore();
                  setQuizScore(score);
                  onSubmit();
                }}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Calculate progress
  useEffect(() => {
    const allLessons = course?.modules?.flatMap((mod) => mod.lessons) || [];
    setProgressPercentage(
      allLessons.length > 0
        ? Math.round((completedLessons.size / allLessons.length) * 100)
        : 0
    );
  }, [completedLessons, course]);

  const toggleModuleExpansion = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const toggleLessonCompletion = (lessonId) => {
    setCompletedLessons((prev) => {
      const newCompletedLessons = new Set(prev);
      if (newCompletedLessons.has(lessonId)) {
        newCompletedLessons.delete(lessonId);
      } else {
        newCompletedLessons.add(lessonId);
      }
      return newCompletedLessons;
    });
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="relative w-24 h-24">
          <div className="absolute animate-ping w-full h-full rounded-full bg-indigo-400 opacity-25"></div>
          <div className="relative animate-spin rounded-full h-full w-full border-4 border-gray-200 border-t-indigo-600"></div>
        </div>
        <p className="mt-6 text-lg text-gray-600">Loading your course...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50">
        <div className="text-center py-8 text-red-500 max-w-md mx-auto">
          <FiAlertTriangle className="inline-block w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transform lg:translate-x-0 fixed lg:static left-0 top-16 bottom-0 w-full lg:max-w-xs bg-white shadow-xl lg:shadow-lg z-20 transition-transform duration-300 ease-in-out overflow-y-auto`}
        >
          <div className="p-6">
            <button
              onClick={() => navigate("/courses")}
              className="mb-6 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg w-full flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] shadow-md"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Back to Courses</span>
            </button>

            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center text-gray-800">
                <FiBookOpen className="mr-2 text-indigo-600" />
                Course Content
              </h2>
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    Your Progress
                  </span>
                  <span className="text-sm font-semibold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                    {completedLessons.size}/
                    {course?.modules?.flatMap((m) => m.lessons).length || 0}{" "}
                    lessons
                  </span>
                </div>
                <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Modules List */}
            <div className="space-y-4">
              {course?.modules?.map((module, moduleIndex) => (
                <div
                  key={module.id || moduleIndex}
                  className="border rounded-xl overflow-hidden shadow-sm bg-white transition-all hover:shadow-md"
                >
                  <div
                    className="bg-gray-50 p-4 cursor-pointer flex justify-between items-center hover:bg-indigo-50 transition-colors"
                    onClick={() =>
                      toggleModuleExpansion(module.id || moduleIndex)
                    }
                  >
                    <h3 className="font-semibold text-gray-800">
                      {moduleIndex + 1}. {module.title}
                    </h3>
                    <div className="flex items-center text-indigo-600">
                      {expandedModules[module.id || moduleIndex] ? (
                        <FiChevronUp className="w-5 h-5" />
                      ) : (
                        <FiChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>

                  {expandedModules[module.id || moduleIndex] && (
                    <ul className="divide-y divide-gray-100">
                      {module.lessons.map((lesson, index) => {
                        const isCompleted = completedLessons.has(lesson.id);
                        const isActive = selectedLesson?.id === lesson.id;

                        return (
                          <li
                            key={lesson.id}
                            className={`cursor-pointer transition-all ${
                              isActive
                                ? "bg-indigo-50 border-l-4 border-indigo-600"
                                : isCompleted
                                ? "bg-gray-50 hover:bg-indigo-50"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <div className="p-3 flex items-start">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent triggering the lesson selection
                                  toggleLessonCompletion(lesson.id);
                                }}
                                className={`p-1 rounded-full mr-3 flex-shrink-0 mt-0.5 ${
                                  isCompleted
                                    ? "text-green-500 hover:text-green-600"
                                    : "text-gray-300 hover:text-indigo-500"
                                }`}
                              >
                                <FiCheckCircle className="w-5 h-5" />
                              </button>

                              <div
                                className="flex-1 py-1"
                                onClick={() => setSelectedLesson(lesson)}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <span className="text-gray-700 font-medium block hover:text-indigo-700">
                                      {lesson.title}
                                    </span>
                                    <div className="flex items-center mt-1 space-x-3">
                                      <span className="flex items-center text-xs text-gray-500">
                                        <FiVideo
                                          className="inline mr-1"
                                          size={12}
                                        />{" "}
                                        Video
                                      </span>
                                      <span className="flex items-center text-xs text-gray-500">
                                        <FiClock
                                          className="inline mr-1"
                                          size={12}
                                        />{" "}
                                        {lesson.duration || "10 min"}
                                      </span>
                                    </div>
                                  </div>

                                  <FiChevronRight
                                    className={`w-5 h-5 flex-shrink-0 ${
                                      isActive
                                        ? "text-indigo-600"
                                        : "text-gray-400"
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))}
              {allLessonsCompleted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FiAward className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        Congratulations!
                      </h3>
                      <p className="text-sm text-green-700">
                        You've completed all lessons in this course!
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={handleDownloadCertificate}
                disabled={!allLessonsCompleted}
                className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all ${
                  allLessonsCompleted
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                <FiAward className="w-5 h-5" />
                <span>Download Certificate</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto pb-16">
          {selectedLesson ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto">
              {/* Video Section */}
              <div className="relative w-full h-[500px] bg-black rounded-lg overflow-hidden">
                <VideoPlayer
                  url={selectedLesson.video}
                  title={selectedLesson.title}
                  resource={selectedLesson.resource}
                />
              </div>

              {/* Lesson Info */}
              <div className="p-6 lg:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8 border-b pb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedLesson.title}
                    </h2>
                    <div className="flex items-center text-gray-500 text-sm space-x-4">
                      <span className="flex items-center">
                        <FiClock className="mr-1" />
                        {selectedLesson.duration || "10 minutes"}
                      </span>
                      <span className="flex items-center">
                        <FiUser className="mr-1" />
                        {course?.teacher?.name || "Instructor"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleLessonCompletion(selectedLesson.id)}
                      className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                        completedLessons.has(selectedLesson.id)
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } transition-colors`}
                    >
                      <FiCheckCircle className="w-5 h-5" />
                      <span>
                        {completedLessons.has(selectedLesson.id)
                          ? "Completed"
                          : "Mark Complete"}
                      </span>
                    </button>

                    <button
                      onClick={() => setIsResourcesOpen(true)}
                      className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <FiFileText className="w-5 h-5" />
                      <span>Resources</span>
                    </button>

                    <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <FiBookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <AdditionalInfo />

                {/* Next/Previous Lesson Navigation */}
                <div className="mt-10 border-t border-gray-100 pt-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <button className="mb-4 sm:mb-0 w-full sm:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                      <FiArrowLeft className="w-5 h-5" />
                      <span>Previous Lesson</span>
                    </button>

                    <button className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center space-x-2 transition-colors shadow-sm">
                      <span>Next Lesson</span>
                      <FiChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-16">
              <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiBookOpen className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-4">
                  Select a lesson to begin
                </h3>
                <p className="text-gray-600 mb-6">
                  Choose a lesson from the course outline to start your learning
                  journey
                </p>
                <button
                  onClick={() => {
                    const firstModule = course?.modules?.[0];
                    const firstLesson = firstModule?.lessons?.[0];
                    if (firstLesson) {
                      setSelectedLesson(firstLesson);
                    }
                  }}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start First Lesson
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resources Panel */}
      <ResourcePanel
        isOpen={isResourcesOpen}
        resources={selectedLesson?.resources}
        onClose={() => setIsResourcesOpen(false)}
      />

      {/* Mobile overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Floating action button for mobile */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed right-6 bottom-6 lg:hidden z-20 w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <FiBookOpen className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CourseLearning;
