import React, { useState, useEffect } from "react";
import { PlusCircle, BookOpen } from "lucide-react";
import Sidebar from "./Sidebar";
import DashboardStats from "./DashboardStats";
import CourseCard from "./CourseCard";
import ProfileForm from "./ProfileForm";
import CreateCoursePage from "./CreateCoursePage";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [courses, setCourses] = useState({
    draft: [],
    published: [],
  });
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail_image: "",
    thumbnailPreview: "",
    modules: [],
  });
  const [currentModule, setCurrentModule] = useState({
    title: "",
    description: "",
    lessons: [],
    quiz: null,
  });
  const [currentLesson, setCurrentLesson] = useState({
    title: "",
    video: "",
    resource: "",
    duration: "",
    summary: "",
  });
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState({
    title: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    enrolledStudents: [],
    activeStudents: 0,
  });
  const [teacherProfile, setTeacherProfile] = useState({
    name: "",
    email: "",
    department: "",
    bio: "",
    signature: null,
    signaturePreview: "",
  });

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          "https://platform-backend-c4zp.onrender.com/teacher_courses/"
        );
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        const coursesWithThumb = data.map((c) => ({
          ...c,
          thumbnail_image:
            c.thumbnail_url || c.thumbnail_image || "/placeholder.svg",
        }));
        const draftCourses = coursesWithThumb.filter(
          (c) => c.status === "draft"
        );
        const publishedCourses = coursesWithThumb.filter(
          (c) => c.status === "published"
        );

        setCourses({ draft: draftCourses, published: publishedCourses });
        setStats({
          totalCourses: data.length,
          totalStudents: 57,
          enrolledStudents: [],
          activeStudents: 0,
        });
        console.log("Fetched courses:", data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profileId = localStorage.getItem("profileId");
        if (!profileId) throw new Error("Missing profile ID");

        const response = await fetch(
          `https://platform-backend-c4zp.onrender.com/profile/${profileId}`
        );
        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();

        setTeacherProfile({
          name: data.name || "",
          email: data.email || "",
          department: data.department || "",
          bio: data.bio || "",
          signature: null,
          signaturePreview: data.signature_url || "",
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    if (activeTab === "profile") {
      fetchProfile();
    }
  }, [activeTab]);

  const handleAddCourse = () => {
    setActiveTab("add course");
  };

  const handleEditCourse = (courseId) => {
    console.log("Editing course:", courseId);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setNewCourse({
          ...newCourse,
          thumbnail_image: file,
          thumbnailPreview: reader.result,
        });
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setTeacherProfile({
          ...teacherProfile,
          signature: file,
          signaturePreview: reader.result,
        });
      reader.readAsDataURL(file);
    }
  };

  const addModule = () => {
    if (currentModule.title.trim() === "") return;
    setNewCourse({
      ...newCourse,
      modules: [...newCourse.modules, currentModule],
    });
    setCurrentModule({ title: "", description: "", lessons: [], quiz: null });
  };

  const addLesson = () => {
    if (currentLesson.title.trim() === "") return;
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

  const addQuizQuestion = () => {
    if (currentQuizQuestion.question.trim() === "") return;
    const quiz = currentModule.quiz || {
      title: `${currentModule.title} Quiz`,
      questions: [],
    };
    setCurrentModule({
      ...currentModule,
      quiz: { ...quiz, questions: [...quiz.questions, currentQuizQuestion] },
    });
    setCurrentQuizQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    });
  };

  const submitCourse = () => {
    if (newCourse.title.trim() === "" || newCourse.modules.length === 0) return;

    const newCourseObj = {
      id: `course${courses.draft.length + courses.published.length + 1}`,
      title: newCourse.title,
      description: newCourse.description,
      thumbnail_image: newCourse.thumbnailPreview,
      modules: newCourse.modules,
      createdAt: new Date().toISOString(),
      status: "draft",
    };

    setCourses({ ...courses, draft: [...courses.draft, newCourseObj] });

    setNewCourse({
      title: "",
      description: "",
      category: "",
      thumbnail_image: "",
      thumbnailPreview: "",
      modules: [],
    });

    setActiveTab("dashboard");
  };

  const publishCourse = (courseId) => {
    const courseToPublish = courses.draft.find((c) => c.id === courseId);
    if (!courseToPublish) return;

    setCourses({
      draft: courses.draft.filter((c) => c.id !== courseId),
      published: [
        ...courses.published,
        {
          ...courseToPublish,
          thumbnail_image:
            courseToPublish.thumbnail_image || courseToPublish.thumbnailPreview,
          status: "published",
          publishedDate: new Date().toISOString(),
        },
      ],
    });
    console.log("thumbnail_image", courseToPublish.thumbnail_image);
  };

  const moveToDraft = (courseId, from) => {
    const courseToMove = courses[from].find((c) => c.id === courseId);
    if (!courseToMove) return;
    setCourses({
      ...courses,
      [from]: courses[from].filter((c) => c.id !== courseId),
      draft: [...courses.draft, { ...courseToMove, status: "draft" }],
    });
  };

  const deleteCourse = (courseId, from) => {
    setCourses({
      ...courses,
      [from]: courses[from].filter((c) => c.id !== courseId),
    });
  };

  const updateProfile = () => alert("Profile updated successfully!");

  const categoryLabels = {
    draft: "Draft",
    published: "Published",
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-8 overflow-auto">
        {activeTab === "dashboard" && (
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 bg-white rounded-2xl shadow-sm p-8 border border-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="relative z-10">
                <h1 className="text-4xl font-bold mb-2">
                  Welcome back, {teacherProfile.name}!
                </h1>
                <p className="text-blue-100 text-lg opacity-90">
                  Here's what's happening with your courses today.
                </p>
              </div>
            </div>

            <DashboardStats stats={stats} />

            <div className="mt-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Your Courses
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Manage and track your course progress
                  </p>
                </div>
                <button
                  onClick={handleAddCourse}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center transform hover:-translate-y-1"
                >
                  <PlusCircle className="mr-2" size={20} />
                  Create Course
                </button>
              </div>

              {["draft", "published"].map((status) => (
                <div key={status} className="mb-12">
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-4 h-4 rounded-full mr-3 ${
                        status === "draft"
                          ? "bg-gradient-to-r from-amber-400 to-orange-500"
                          : "bg-gradient-to-r from-green-400 to-emerald-500"
                      }`}
                    ></div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {categoryLabels[status]} Courses
                    </h3>
                    <span className="ml-4 bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full font-semibold">
                      {courses[status].length}
                    </span>
                  </div>

                  {courses[status].length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-gray-400" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-700 mb-2">
                        No {status} courses yet
                      </h4>
                      <p className="text-gray-500 mb-6">
                        {status === "draft"
                          ? "Start creating your first course to engage with students."
                          : "Publish your draft courses to make them available to students."}
                      </p>
                      {status === "draft" && (
                        <button
                          onClick={handleAddCourse}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-all duration-200 font-semibold"
                        >
                          Create Your First Course
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {courses[status].map((course) => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          category={status}
                          onPublish={publishCourse}
                          onMoveToDraft={moveToDraft}
                          onDelete={(id) => deleteCourse(id, status)}
                          onEdit={handleEditCourse}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "draft" && (
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Draft Courses
                </h1>
                <p className="text-gray-600 mt-1">
                  Review and publish your unpublished courses
                </p>
              </div>
              <button
                onClick={handleAddCourse}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center transform hover:-translate-y-1"
              >
                <PlusCircle className="mr-2" size={20} />
                Create New Course
              </button>
            </div>

            {courses.draft.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-16 text-center border border-gray-100">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No draft courses
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  You haven't created any draft courses yet. Start building your
                  first course to share knowledge with your students.
                </p>
                <button
                  onClick={handleAddCourse}
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-200 font-semibold"
                >
                  Create Your First Course
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.draft.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    category="draft"
                    onPublish={publishCourse}
                    onDelete={(id) => deleteCourse(id, "draft")}
                    onEdit={handleEditCourse}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "add course" && (
          <div className="max-w-4xl mx-auto">
            <CreateCoursePage
              onClose={() => setActiveTab("dashboard")}
              newCourse={newCourse}
              setNewCourse={setNewCourse}
              handleFileUpload={handleFileUpload}
              currentModule={currentModule}
              setCurrentModule={setCurrentModule}
              addModule={addModule}
              currentLesson={currentLesson}
              setCurrentLesson={setCurrentLesson}
              addLesson={addLesson}
              currentQuizQuestion={currentQuizQuestion}
              setCurrentQuizQuestion={setCurrentQuizQuestion}
              addQuizQuestion={addQuizQuestion}
              submitCourse={submitCourse}
            />
          </div>
        )}

        {activeTab === "profile" && (
          <ProfileForm
            profile={teacherProfile}
            setProfile={setTeacherProfile}
            handleSignatureUpload={handleSignatureUpload}
            updateProfile={updateProfile}
          />
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
