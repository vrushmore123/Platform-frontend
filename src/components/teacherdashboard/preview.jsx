import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  ArrowLeft,
  Award,
  BookOpen,
  BarChart2,
  Play,
  Check,
  AlertCircle,
  ChevronRight,
  Video,
  Image as ImageIcon,
} from "lucide-react";
import ReactPlayer from "react-player";

const Preview = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  // Course states
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [completedLessons, setCompletedLessons] = useState([]);
  const [publishingStatus, setPublishingStatus] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://platform-backend-c4zp.onrender.com/teacher_courses/${courseId}`
        );
        if (!res.ok) throw new Error("Failed to fetch course data");
        const data = await res.json();

        console.log("thumbnail_image from API:", data.thumbnail_image);

        const API_BASE = "https://platform-backend-c4zp.onrender.com";
        let thumbUrl = "";
        if (data.thumbnail_image) {
          const raw = data.thumbnail_image;
          if (raw.startsWith("data:")) {
            thumbUrl = raw; // inline base64
          } else if (raw.startsWith("http")) {
            thumbUrl = raw;
          } else if (raw.startsWith("/")) {
            thumbUrl = `${API_BASE}${raw}`;
          } else {
            thumbUrl = `${API_BASE}/${raw}`;
          }
        }

        // Debug the normalized URL
        console.log("Normalized thumbnail URL:", thumbUrl);

        setTitle(data.title || "");
        setDescription(data.description || "");
        setCategory(data.category || "");
        setLevel(data.level || "");
        setCourse(data);
        setImagePreview(thumbUrl);
        if (data.modules?.length > 0) {
          setExpandedModules({ 0: true });
          const firstLesson = data.modules[0].lessons?.[0] || null;
          setSelectedLesson(firstLesson);
          setVideoUrl(firstLesson?.video_url || data.video_url || "");
        }
        setError(null);
        console.log("Course data loaded successfully:", data);
      } catch (err) {
        console.error(err);
        setError("Could not load course data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const toggleModule = (moduleIndex) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleIndex]: !prev[moduleIndex],
    }));
  };

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);

    if (lesson.video_url) {
      setVideoUrl(lesson.video_url);
    }
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleLessonCompletion = (moduleIndex, lessonIndex, e) => {
    e.stopPropagation();
    const lessonId = `${moduleIndex}-${lessonIndex}`;
    setCompletedLessons((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const calculateProgress = () => {
    const totalLessons = course?.modules?.reduce(
      (total, module) => total + (module.lessons?.length || 0),
      0
    );
    return totalLessons > 0
      ? Math.round((completedLessons.length / totalLessons) * 100)
      : 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitCourse = async () => {
    setPublishingStatus("loading");
    try {
      let thumbnailImage = course?.thumbnail_image || "";
      if (imageFile) {
        try {
          thumbnailImage = await fileToBase64(imageFile);
        } catch (err) {
          console.error("Error converting image to base64:", err);
          throw new Error("Invalid image file");
        }
      }

      const courseData = {
        title,
        description,
        category,
        level,
        status: "published",
        modules: course?.modules || [],
        thumbnail_image: thumbnailImage,
        video_url: videoUrl,
      };

      const response = await fetch(
        `https://platform-backend-c4zp.onrender.com/teacher_courses/${courseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update course");
      }

      const data = await response.json();
      console.log("Course published successfully!", data);
      setPublishingStatus("success");
      setTimeout(() => navigate("/teacher/dashboard"), 2000);
    } catch (err) {
      console.error("Error publishing course:", err);
      setPublishingStatus("error");
    }
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const isValidYouTubeUrl = (url) => {
    if (!url) return false;
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return pattern.test(url);
  };

  const progress = calculateProgress();
  const totalLessons = course?.modules?.reduce(
    (total, module) => total + (module.lessons?.length || 0),
    0
  );

  const getCurrentModuleTitle = () => {
    if (!selectedLesson || !course) return "";
    const currentModule = course.modules?.find((module) =>
      module.lessons?.some((lesson) => lesson.title === selectedLesson.title)
    );
    return currentModule?.title || "";
  };

  const currentModuleTitle = getCurrentModuleTitle();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  if (error)
    return (
      <div className="p-10 text-center text-red-600">
        <AlertCircle className="w-10 h-10 mx-auto mb-4" />
        {error}
      </div>
    );
  if (!course)
    return (
      <div className="p-10 text-center">
        <BookOpen className="w-10 h-10 mx-auto mb-4 text-gray-400" />
        Course not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
        <button
          onClick={() => navigate("/teacher/dashboard")}
          className="text-purple-700 flex items-center gap-1 hover:text-purple-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <h1 className="text-lg font-semibold text-gray-800 truncate max-w-[200px]">
          {course.title}
        </h1>
        <div className="w-6"></div>
      </div>

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-80 lg:w-96 bg-white shadow-lg md:shadow-xl p-4 md:p-6 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
        <div className="hidden md:block mb-8">
          <button
            onClick={() => navigate("/teacher/dashboard")}
            className="mb-6 text-purple-700 font-medium hover:underline flex items-center gap-2 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {course.title}
          </h1>
          <p className="text-gray-600 capitalize">{course.category}</p>
        </div>

        {/* Course Content & Progress */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Course Content
            </h2>
            <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
              {course.modules?.length || 0} modules
            </span>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-600">Your Progress</p>
              <p className="text-sm font-medium text-purple-700">
                {completedLessons.length}/{totalLessons || 0} lessons
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-700 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Modules List */}
          <div className="space-y-3">
            {course.modules?.map((module, moduleIndex) => (
              <div
                key={moduleIndex}
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-sm"
              >
                <div
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer select-none transition-colors ${
                    expandedModules[moduleIndex]
                      ? "bg-purple-50 border-purple-300"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => toggleModule(moduleIndex)}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 text-purple-800 h-7 w-7 rounded-full flex items-center justify-center text-sm font-medium">
                      {moduleIndex + 1}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {module.title}
                    </h3>
                  </div>
                  {expandedModules[moduleIndex] ? (
                    <ChevronUp className="text-gray-500 h-4 w-4 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="text-gray-500 h-4 w-4 flex-shrink-0" />
                  )}
                </div>

                {expandedModules[moduleIndex] && (
                  <div className="bg-white border-t border-gray-200 divide-y divide-gray-100">
                    {module.lessons?.map((lesson, lessonIndex) => {
                      const lessonId = `${moduleIndex}-${lessonIndex}`;
                      const isCompleted = completedLessons.includes(lessonId);
                      const isActive = selectedLesson?.title === lesson.title;

                      return (
                        <div
                          key={lessonIndex}
                          onClick={() => handleLessonClick(lesson)}
                          className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                            isActive
                              ? "bg-purple-100"
                              : isCompleted
                              ? "bg-green-50 hover:bg-green-100"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              {isCompleted ? (
                                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                                  <Check className="h-3 w-3 text-green-600" />
                                </div>
                              ) : (
                                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                                  <Play className="h-3 w-3 text-gray-400 ml-0.5" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm ${
                                  isActive
                                    ? "text-purple-800 font-medium"
                                    : "text-gray-700"
                                }`}
                              >
                                {lesson.title}
                              </p>
                              {lesson.duration && (
                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {lesson.duration}
                                </p>
                              )}
                            </div>
                          </div>
                          <div
                            className="flex-shrink-0"
                            onClick={(e) =>
                              toggleLessonCompletion(
                                moduleIndex,
                                lessonIndex,
                                e
                              )
                            }
                          >
                            <input
                              type="checkbox"
                              checked={isCompleted}
                              readOnly
                              className="form-checkbox h-4 w-4 text-purple-600 rounded focus:ring-purple-500 cursor-pointer"
                            />
                          </div>
                        </div>
                      );
                    })}

                    {module.quiz?.questions?.length > 0 && (
                      <div className="p-3 bg-yellow-50 hover:bg-yellow-100 cursor-pointer transition-colors flex items-center gap-3">
                        <Award className="h-5 w-5 text-yellow-600" />
                        <span className="text-sm font-medium text-gray-800">
                          {module.quiz.title || `Module Quiz`}
                        </span>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full ml-auto">
                          {module.quiz.questions.length} questions
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-600 mb-6">
            <button
              onClick={() => navigate("/teacher/dashboard")}
              className="hover:text-purple-700 hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </button>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-800 font-medium">Course Preview</span>
            {currentModuleTitle && (
              <>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                <span className="text-purple-700">{currentModuleTitle}</span>
              </>
            )}
          </div>

          {/* Video Player Section */}
          <div className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden">
            {isValidYouTubeUrl(videoUrl) ? (
              <div className="relative pt-[56.25%] bg-black">
                <ReactPlayer
                  url={videoUrl}
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                  controls
                  onError={(e) => console.error("Video player error:", e)}
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <div className="text-center p-6">
                  <Video className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium text-gray-200">
                    No video available
                  </h3>
                  <p className="text-gray-400 mt-1">
                    {selectedLesson
                      ? "This lesson doesn't have a video yet"
                      : "Select a lesson to view its content"}
                  </p>
                </div>
              </div>
            )}
            <div className="p-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedLesson?.title || "No lesson selected"}
              </h3>
              {selectedLesson?.duration && (
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4" /> {selectedLesson.duration}
                </p>
              )}
            </div>
          </div>

          {/* Course Info Form */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              Course Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter course title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Web Development"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty Level
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail Image
                </label>
                <div className="flex items-center gap-4">
                  {imagePreview ? (
                    <div className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                      <img
                        src={imagePreview}
                        alt="Course thumbnail"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                  <label className="cursor-pointer">
                    <span className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                      {imagePreview ? "Change" : "Upload"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what students will learn in this course..."
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={submitCourse}
                disabled={publishingStatus === "loading"}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  publishingStatus === "loading"
                    ? "bg-gray-400 cursor-not-allowed"
                    : publishingStatus === "success"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : publishingStatus === "error"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {publishingStatus === "loading" ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Publishing...
                  </>
                ) : publishingStatus === "success" ? (
                  <>
                    <Check className="h-5 w-5" />
                    Published!
                  </>
                ) : publishingStatus === "error" ? (
                  <>
                    <AlertCircle className="h-5 w-5" />
                    Failed to Publish
                  </>
                ) : (
                  "Publish Course"
                )}
              </button>
            </div>
          </div>

          {/* Lesson Details */}
          {selectedLesson && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedLesson.title}
                </h2>
                <div className="flex items-center gap-2">
                  {selectedLesson.resource_url && (
                    <a
                      href={selectedLesson.resource_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-purple-700 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-lg transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      Resources
                    </a>
                  )}
                </div>
              </div>

              <div className="prose max-w-none text-gray-700 mb-6">
                {selectedLesson.summary || (
                  <p className="text-gray-500 italic">
                    No summary available for this lesson.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Preview;
