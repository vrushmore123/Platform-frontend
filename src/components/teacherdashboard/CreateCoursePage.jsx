import React, { useState, useEffect } from "react";
import {
  FiUpload,
  FiPlus,
  FiCheck,
  FiBookOpen,
  FiVideo,
  FiHelpCircle,
  FiLayers,
  FiInfo,
  FiX,
  FiClock,
  FiLink,
  FiFileText,
  FiChevronDown,
  FiChevronUp,
  FiSave,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const CreateCoursePage = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(isEditing);
  const [error, setError] = useState(null);

  // Course state
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: null,
    thumbnailName: "",
    modules: [],
    status: "draft",
  });

  // Current module being edited
  const [currentModule, setCurrentModule] = useState({
    title: "",
    description: "",
    lessons: [],
    quiz: {
      title: "",
      questions: [],
    },
  });

  // Current lesson being edited
  const [currentLesson, setCurrentLesson] = useState({
    title: "",
    video: "",
    resource: "",
    duration: "",
    summary: "",
  });

  // Current quiz question being edited
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState({
    title: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });

  // UI state
  const [activeTab, setActiveTab] = useState("module");
  const [expandedModule, setExpandedModule] = useState(null);

  // Fetch course data if in edit mode
  useEffect(() => {
    if (isEditing) {
      const fetchCourse = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(
            `https://platform-backend-c4zp.onrender.com/teacher_courses/${id}`
          );
          const data = await response.json();

          if (response.ok) {
            setCourse({
              title: data.title,
              description: data.description,
              category: data.category,
              thumbnail: data.thumbnail_image,
              thumbnailName: data.thumbnail_name || "",
              modules: data.modules || [],
              status: data.status || "draft",
            });
          } else {
            setError("Failed to load course data");
            console.error("Failed to fetch course:", data);
          }
        } catch (error) {
          setError("Error loading course data");
          console.error("Error fetching course:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCourse();
    }
  }, [id, isEditing]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Please select a valid image file (PNG/JPG/JPEG)");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      alert("File size exceeds 3MB limit");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCourse({
        ...course,
        thumbnail: reader.result,
        thumbnailName: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  // Add a new lesson to current module
  const addLesson = () => {
    if (!currentLesson.title) return;

    setCurrentModule({
      ...currentModule,
      lessons: [...currentModule.lessons, currentLesson],
    });

    setCurrentLesson({
      title: "",
      video: "",
      resource: "",
      duration: "",
      summary: "",
    });
  };

  // Add a new quiz question to current module
  const addQuizQuestion = () => {
    if (
      !currentQuizQuestion.title ||
      !currentQuizQuestion.question ||
      currentQuizQuestion.options.some((opt) => !opt)
    )
      return;

    const newQuestion = {
      title: currentQuizQuestion.title,
      question: currentQuizQuestion.question,
      options: currentQuizQuestion.options,
      correctAnswer: currentQuizQuestion.correctAnswer,
    };

    setCurrentModule({
      ...currentModule,
      quiz: {
        ...currentModule.quiz,
        questions: [...currentModule.quiz.questions, newQuestion],
      },
    });

    setCurrentQuizQuestion({
      title: "",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    });
  };

  // Add the current module to the course
  const addModule = () => {
    if (!currentModule.title || currentModule.lessons.length === 0) return;

    setCourse({
      ...course,
      modules: [...course.modules, currentModule],
    });

    setCurrentModule({
      title: "",
      description: "",
      lessons: [],
      quiz: {
        title: "",
        questions: [],
      },
    });
  };

  // Submit the entire course (create or update)
  const submitCourse = async (e, status = "published") => {
    e.preventDefault();

    try {
      const response = await fetch("https://platform-backend-c4zp.onrender.com/teacher_courses/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getCoursePayload(status)),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error saving course:", data);
        alert("Failed to save course. Please check the data and try again.");
        return;
      }

      alert(
        status === "draft"
          ? "Course saved as draft successfully!"
          : "Course published successfully!"
      );
      const id = data.id;
      navigate(status === "draft" ? "/teacher/dashboard" : `/preview/${id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the course.");
    }
  };

  const updateCourse = async (e, courseId, status = "published") => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://platform-backend-c4zp.onrender.com/teacher_courses/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(getCoursePayload(status)),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Error updating course:", data);
        alert("Failed to update course. Please check the data and try again.");
        return;
      }

      alert(
        status === "draft"
          ? "Course updated and saved as draft successfully!"
          : "Course updated and published successfully!"
      );
      navigate(status === "draft" ? "/teacher/dashboard" : `/preview/${id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the course.");
    }
  };

  const getCoursePayload = (status) => ({
    title: course.title || "",
    description: course.description || "",
    category: course.category || "",
    thumbnail_image: course.thumbnail || "",
    status: status,
    modules: course.modules.map((module) => ({
      title: module.title || "",
      description: module.description || "",
      lessons: module.lessons.map((lesson) => ({
        title: lesson.title || "",
        video_url: lesson.video || "", 
        resource_url: lesson.resource || "", 
        duration: lesson.duration || "",
        summary: lesson.summary || "",
      })),
      quiz:
        module.quiz &&
        Array.isArray(module.quiz.questions) &&
        module.quiz.questions.length > 0
          ? {
              title: module.quiz.title || `Quiz for ${module.title}` || "",
              questions: module.quiz.questions.map((q) => ({
                question: q.question || "",
                options: q.options || [],
                correct_answer: q.correctAnswer || 0,
              })),
            }
          : null,
    })),
  });

  // Save as draft function
  const saveAsDraft = async (e) => {
    if (!course.title) {
      alert("Please at least provide a course title to save as draft.");
      return;
    }
    await submitCourse(e, "draft");
  };

  const toggleModuleExpansion = (index) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  const headerTitle = isEditing ? "Edit Course" : "Create New Course";
  const headerDescription = isEditing
    ? "Update your course content"
    : "Share your knowledge with the world";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading course data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <div className="text-red-500 mb-4">
            <FiX size={48} className="mx-auto" />
          </div>
          <h2 className="text-xl font-bold mb-2">Error Loading Course</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => navigate("/teacher/dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
          <div className="bg-blue-600 text-white p-3 rounded-full">
            <FiBookOpen size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{headerTitle}</h1>
            <p className="text-gray-600">{headerDescription}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Course Creation Progress
            </span>
            <span className="text-sm font-medium text-gray-700">
              {course.title ? "1. Basic Info ✓" : "1. Basic Info"}
              {course.modules.length > 0 ? " → 2. Modules ✓" : " → 2. Modules"}
              {" → 3. Review"}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{
                width:
                  course.title && course.description
                    ? course.modules.length > 0
                      ? "75%"
                      : "40%"
                    : "10%",
              }}
            ></div>
          </div>
        </div>

        {/* Course Information Section */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <div className="bg-blue-100 p-2 rounded-full">
              <FiInfo size={20} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Course Information
            </h2>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={course.title}
                  onChange={(e) =>
                    setCourse({ ...course, title: e.target.value })
                  }
                  placeholder="e.g. Advanced JavaScript"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={course.category}
                  onChange={(e) =>
                    setCourse({ ...course, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select a category</option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="data">Data Science</option>
                  <option value="design">Design</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                value={course.description}
                onChange={(e) =>
                  setCourse({ ...course, description: e.target.value })
                }
                placeholder="Describe what students will learn in this course"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thumbnail Image
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition">
                  <FiUpload /> Upload Image
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                  />
                </label>
                {course.thumbnailName && (
                  <span className="text-sm text-gray-700 flex items-center">
                    <FiCheck className="text-green-500 mr-1" />{" "}
                    {course.thumbnailName}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mb-3">
                Supports: PNG, JPG. Max file size: 3MB
              </p>
              {course.thumbnail && (
                <div className="w-64 h-36 rounded-lg overflow-hidden border-2 border-gray-200">
                  <img
                    src={course.thumbnail}
                    alt="Course thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Course Modules Section */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <div className="bg-blue-100 p-2 rounded-full">
              <FiLayers size={20} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Course Modules
            </h2>
            <span className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {course.modules.length} module
              {course.modules.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Existing Modules List */}
          {course.modules.length > 0 ? (
            <div className="space-y-4 mb-8">
              {course.modules.map((module, moduleIndex) => (
                <div
                  key={moduleIndex}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                >
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleModuleExpansion(moduleIndex)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 text-white h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium">
                        {moduleIndex + 1}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {module.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <FiVideo /> {module.lessons.length} lessons
                          </span>
                          {module?.quiz?.questions?.length > 0 && (
                            <span className="flex items-center gap-1">
                              <FiHelpCircle /> {module.quiz.questions.length}{" "}
                              quiz questions
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-600">
                      {expandedModule === moduleIndex ? (
                        <FiChevronUp />
                      ) : (
                        <FiChevronDown />
                      )}
                    </div>
                  </div>

                  {expandedModule === moduleIndex && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      {module.description && (
                        <p className="text-gray-700 text-sm mb-4 italic">
                          {module.description}
                        </p>
                      )}

                      {/* Module Lessons */}
                      {module.lessons.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                            <FiVideo className="text-blue-600" /> Lessons
                          </h4>
                          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className={`p-3 ${
                                  lessonIndex !== module.lessons.length - 1
                                    ? "border-b border-gray-100"
                                    : ""
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  <div className="bg-blue-100 text-blue-700 rounded-full h-6 w-6 flex items-center justify-center text-xs flex-shrink-0">
                                    {lessonIndex + 1}
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-800">
                                      {lesson.title}
                                    </p>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-600">
                                      {lesson.duration && (
                                        <span className="flex items-center gap-1">
                                          <FiClock /> {lesson.duration}
                                        </span>
                                      )}
                                      {lesson.video && (
                                        <span className="flex items-center gap-1">
                                          <FiVideo /> Video included
                                        </span>
                                      )}
                                      {lesson.resource && (
                                        <span className="flex items-center gap-1">
                                          <FiLink /> Resource included
                                        </span>
                                      )}
                                    </div>
                                    {lesson.summary && (
                                      <p className="text-xs text-gray-500 mt-1 italic">
                                        {lesson.summary}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Module Quiz */}
                      {module.quiz && module.quiz.questions.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                            <FiHelpCircle className="text-blue-600" /> Quiz:{" "}
                            {module.quiz.title || `${module.title} Quiz`}
                          </h4>
                          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {module.quiz.questions.map((question, qIndex) => (
                              <div
                                key={qIndex}
                                className={`p-3 ${
                                  qIndex !== module.quiz.questions.length - 1
                                    ? "border-b border-gray-100"
                                    : ""
                                }`}
                              >
                                <p className="font-medium text-gray-800 mb-2">
                                  Q{qIndex + 1}: {question.question}
                                </p>
                                <ul className="space-y-1 ml-6 text-sm">
                                  {question.options.map((option, optIndex) => (
                                    <li
                                      key={optIndex}
                                      className={`${
                                        optIndex === question.correctAnswer
                                          ? "text-green-600 font-medium"
                                          : "text-gray-600"
                                      }`}
                                    >
                                      {optIndex === question.correctAnswer ? (
                                        <span className="flex items-start">
                                          <FiCheck className="mr-1 mt-1 flex-shrink-0" />{" "}
                                          {option} (Correct)
                                        </span>
                                      ) : (
                                        option
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-dashed border-gray-300 p-8 text-center mb-8">
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <FiLayers size={24} className="text-blue-600" />
                </div>
                <p className="text-gray-700 font-medium">
                  No modules added yet
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Add your first module below to structure your course
                </p>
              </div>
            </div>
          )}

          {/* Module Creation Tabs */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  activeTab === "module"
                    ? "bg-blue-50 text-blue-800 border-b-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("module")}
              >
                <span className="flex items-center justify-center gap-2">
                  <FiLayers /> Module Details
                </span>
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  activeTab === "lesson"
                    ? "bg-blue-50 text-blue-800 border-b-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("lesson")}
              >
                <span className="flex items-center justify-center gap-2">
                  <FiVideo /> Add Lessons
                </span>
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  activeTab === "quiz"
                    ? "bg-blue-50 text-blue-800 border-b-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("quiz")}
              >
                <span className="flex items-center justify-center gap-2">
                  <FiHelpCircle /> Add Quiz
                </span>
              </button>
            </div>

            <div className="p-6">
              {/* Module Tab */}
              {activeTab === "module" && (
                <div>
                  <h3 className="font-medium text-lg mb-5 text-gray-800 flex items-center gap-2">
                    <FiPlus className="text-blue-600" /> New Module Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Module Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={currentModule.title}
                        onChange={(e) =>
                          setCurrentModule({
                            ...currentModule,
                            title: e.target.value,
                          })
                        }
                        placeholder="e.g. Introduction to React"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={2}
                        value={currentModule.description}
                        onChange={(e) =>
                          setCurrentModule({
                            ...currentModule,
                            description: e.target.value,
                          })
                        }
                        placeholder="Module description"
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-700">
                          Module Summary
                        </h4>
                        <p className="text-sm text-gray-500">
                          {currentModule.lessons.length} lessons
                          {currentModule.quiz.questions.length > 0 &&
                            ` • ${currentModule.quiz.questions.length} quiz questions`}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={addModule}
                        disabled={
                          !currentModule.title ||
                          currentModule.lessons.length === 0
                        }
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiPlus /> Add Module to Course
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Lessons Tab */}
              {activeTab === "lesson" && (
                <div>
                  <h3 className="font-medium text-lg mb-5 text-gray-800 flex items-center gap-2">
                    <FiVideo className="text-blue-600" /> Add Lesson
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lesson Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={currentLesson.title}
                        onChange={(e) =>
                          setCurrentLesson({
                            ...currentLesson,
                            title: e.target.value,
                          })
                        }
                        placeholder="e.g. React Components"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                          <FiVideo className="text-blue-600" /> Video URL
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={currentLesson.video}
                          onChange={(e) =>
                            setCurrentLesson({
                              ...currentLesson,
                              video: e.target.value,
                            })
                          }
                          placeholder="YouTube or video URL"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                          <FiClock className="text-blue-600" /> Duration
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={currentLesson.duration}
                          onChange={(e) =>
                            setCurrentLesson({
                              ...currentLesson,
                              duration: e.target.value,
                            })
                          }
                          placeholder="e.g. 10:30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <FiLink className="text-blue-600" /> Resource URL
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={currentLesson.resource}
                        onChange={(e) =>
                          setCurrentLesson({
                            ...currentLesson,
                            resource: e.target.value,
                          })
                        }
                        placeholder="PDF or document URL"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <FiFileText className="text-blue-600" /> Summary
                      </label>
                      <textarea
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                        value={currentLesson.summary}
                        onChange={(e) =>
                          setCurrentLesson({
                            ...currentLesson,
                            summary: e.target.value,
                          })
                        }
                        placeholder="Brief summary of the lesson"
                      />
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                      {currentModule.lessons.length > 0 && (
                        <span className="text-sm text-gray-500">
                          {currentModule.lessons.length} lesson
                          {currentModule.lessons.length !== 1 ? "s" : ""} added
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={addLesson}
                        disabled={!currentLesson.title}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                      >
                        <FiPlus /> Add Lesson
                      </button>
                    </div>
                  </div>

                  {/* Current Lessons in Module */}
                  {currentModule.lessons.length > 0 && (
                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <FiVideo className="text-blue-600" /> Current Lessons
                      </h4>
                      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                        {currentModule.lessons.map((lesson, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-3 p-3 ${
                              index !== currentModule.lessons.length - 1
                                ? "border-b border-gray-100"
                                : ""
                            }`}
                          >
                            <div className="bg-blue-100 text-blue-700 rounded-full h-6 w-6 flex items-center justify-center text-xs flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">
                                {lesson.title}
                              </p>
                              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
                                {lesson.duration && (
                                  <span className="flex items-center gap-1">
                                    <FiClock /> {lesson.duration}
                                  </span>
                                )}
                                {lesson.video && (
                                  <span className="flex items-center gap-1">
                                    <FiVideo /> Video
                                  </span>
                                )}
                                {lesson.resource && (
                                  <span className="flex items-center gap-1">
                                    <FiLink /> Resource
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              className="text-red-500 hover:text-red-700 p-1"
                              onClick={() => {
                                setCurrentModule({
                                  ...currentModule,
                                  lessons: currentModule.lessons.filter(
                                    (_, i) => i !== index
                                  ),
                                });
                              }}
                            >
                              <FiX />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Quiz Tab */}
              {activeTab === "quiz" && (
                <div>
                  <h3 className="font-medium text-lg mb-5 text-gray-800 flex items-center gap-2">
                    <FiHelpCircle className="text-blue-600" /> Add Quiz Question
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quiz Title
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={currentModule.quiz.title}
                          onChange={(e) =>
                            setCurrentModule({
                              ...currentModule,
                              quiz: {
                                ...currentModule.quiz,
                                title: e.target.value,
                              },
                            })
                          }
                          placeholder="e.g. Module Assessment Quiz"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Question Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={currentQuizQuestion.title}
                          onChange={(e) =>
                            setCurrentQuizQuestion({
                              ...currentQuizQuestion,
                              title: e.target.value,
                            })
                          }
                          placeholder="e.g. Question 1"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={2}
                        value={currentQuizQuestion.question}
                        onChange={(e) =>
                          setCurrentQuizQuestion({
                            ...currentQuizQuestion,
                            question: e.target.value,
                          })
                        }
                        placeholder="Type your question here"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Answer Options <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-3">
                        {currentQuizQuestion.options.map((option, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                id={`option-${index}`}
                                name="correctAnswer"
                                checked={
                                  currentQuizQuestion.correctAnswer === index
                                }
                                onChange={() =>
                                  setCurrentQuizQuestion({
                                    ...currentQuizQuestion,
                                    correctAnswer: index,
                                  })
                                }
                                className="form-radio text-blue-600 focus:ring-blue-500"
                              />
                              <label
                                htmlFor={`option-${index}`}
                                className="text-sm font-medium text-gray-700"
                              >
                                {index === currentQuizQuestion.correctAnswer
                                  ? "Correct"
                                  : ""}
                              </label>
                            </div>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [
                                  ...currentQuizQuestion.options,
                                ];
                                newOptions[index] = e.target.value;
                                setCurrentQuizQuestion({
                                  ...currentQuizQuestion,
                                  options: newOptions,
                                });
                              }}
                              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder={`Option ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                      {currentModule.quiz.questions.length > 0 && (
                        <span className="text-sm text-gray-500">
                          {currentModule.quiz.questions.length} question
                          {currentModule.quiz.questions.length !== 1
                            ? "s"
                            : ""}{" "}
                          added
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={addQuizQuestion}
                        disabled={
                          !currentQuizQuestion.title ||
                          !currentQuizQuestion.question ||
                          currentQuizQuestion.options.some((opt) => !opt)
                        }
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                      >
                        <FiPlus /> Add Question
                      </button>
                    </div>
                  </div>

                  {/* Current Questions in Quiz */}
                  {currentModule.quiz.questions.length > 0 && (
                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <FiHelpCircle className="text-blue-600" /> Current
                        Questions
                      </h4>
                      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                        {currentModule.quiz.questions.map((question, index) => (
                          <div
                            key={index}
                            className={`p-3 ${
                              index !== currentModule.quiz.questions.length - 1
                                ? "border-b border-gray-100"
                                : ""
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-gray-800">
                                  Q{index + 1}: {question.question}
                                </p>
                                <ul className="mt-1 ml-4 text-sm">
                                  {question.options.map((option, optIndex) => (
                                    <li
                                      key={optIndex}
                                      className={
                                        optIndex === question.correctAnswer
                                          ? "text-green-600"
                                          : "text-gray-600"
                                      }
                                    >
                                      {option}
                                      {optIndex === question.correctAnswer &&
                                        " (Correct)"}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <button
                                className="text-red-500 hover:text-red-700 p-1"
                                onClick={() => {
                                  setCurrentModule({
                                    ...currentModule,
                                    quiz: {
                                      ...currentModule.quiz,
                                      questions:
                                        currentModule.quiz.questions.filter(
                                          (_, i) => i !== index
                                        ),
                                    },
                                  });
                                }}
                              >
                                <FiX />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Quiz Tab End */}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={saveAsDraft}
            disabled={!course.title}
            className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSave /> Save as Draft
          </button>
          <button
            type="button"
            onClick={(e) =>
              isEditing
                ? updateCourse(e, course.id, "published")
                : submitCourse(e, "published")
            }
            disabled={
              // Disable only if creating or publishing (not editing a draft)
              (!isEditing || course.status !== "draft") &&
              (!course.title ||
                !course.description ||
                !course.category ||
                course.modules.length === 0)
            }
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEditing ? "Update Course" : "Preview Course"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
