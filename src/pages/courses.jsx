"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Star,
  Clock,
  BookOpen,
  Tag,
  User,
  Calendar,
  ChevronDown,
  Bell,
  Search,
  Menu,
  X,
  BookCheck,
  Award,
  TrendingUp,
  BarChart,
  Users,
  Bookmark,
  Home,
  Layers,
  Settings,
  LogOut,
  CheckCircle,
  ExternalLink,
  ClipboardList,
  Megaphone,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function TeacherCoursesSection() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedCourses, setCompletedCourses] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://platform-backend-c4zp.onrender.com/teacher_courses/"
      );

      const coursesArray = Array.isArray(response.data)
        ? response.data
        : response.data.results || response.data.courses || [];

      if (coursesArray.length > 0) {
        const publishedCourses = coursesArray.filter(
          (course) => course.status === "published"
        );
        console.log(publishedCourses);

        setCourses(
          publishedCourses.map((course) => {
            const thumb = course.thumbnail_url || course.thumbnail_image;
            let thumbnailUrl;

            if (!thumb) {
              thumbnailUrl = "/placeholder.svg"; // default
            } else if (/^(https?:\/\/|data:)/.test(thumb)) {
              thumbnailUrl = thumb; // full URL or base64
            } else {
              const cleaned = thumb.replace(/^[/\\]+/, "").replace(/\\/g, "/");
              const BASE_URL =
                window.location.hostname === "localhost"
                  ? "http://localhost:8000"
                  : "https://platform-backend-c4zp.onrender.com";
              thumbnailUrl = `${BASE_URL}/${cleaned}`; // append cleaned path here

              console.log("Resolved Thumbnail URL:", thumbnailUrl);
            }

            return {
              id: course.id,
              title: course.title,
              instructor: course.teacher || course.category || "Instructor",
              duration: course.duration || "N/A",
              level: course.level,
              type: (course.type || "free").toLowerCase(),
              thumbnail_image: thumbnailUrl,
              status: course.status,
              rating: course.rating || 5.0,
              progress: course.progress || Math.floor(Math.random() * 100),
              reviewCount:
                course.reviewCount || Math.floor(Math.random() * 200) + 50,
              price: course.price || (Math.floor(Math.random() * 3) + 1) * 9.99,
              originalPrice:
                course.originalPrice ||
                (Math.floor(Math.random() * 3) + 2) * 9.99,
              lastAccessed: course.lastAccessed || "2 days ago",
              studentsEnrolled:
                course.student_count || Math.floor(Math.random() * 5000) + 500,
              description: course.description,
            };
          })
        );
      } else {
        setError("No published courses found");
        generateMockCourses();
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(`Error loading courses: ${error.message}`);
      generateMockCourses();
    } finally {
      setLoading(false);
    }
  };

  const generateMockCourses = () => {
    const mockCourses = [
      {
        id: 1,
        title: "Complete Web Development Bootcamp",
        instructor: "Dr. Jane Smith",
        duration: "48 hours",
        level: "Intermediate",
        type: "premium",
        thumbnail_image: "/placeholder.svg?height=250&width=400",
        status: "completed",
        rating: 4.8,
        progress: 100,
        reviewCount: 245,
        price: 19.99,
        originalPrice: 89.99,
        lastAccessed: "Yesterday",
        studentsEnrolled: 3452,
        description:
          "A comprehensive course covering all aspects of web development including HTML, CSS, JavaScript, and back-end technologies.",
      },
      {
        id: 2,
        title: "Advanced React & Redux",
        instructor: "Dr. John Doe",
        duration: "36 hours",
        level: "Advanced",
        type: "premium",
        thumbnail_image: "/placeholder.svg?height=250&width=400",
        status: "remaining",
        rating: 4.9,
        progress: 65,
        reviewCount: 189,
        price: 29.99,
        originalPrice: 99.99,
        lastAccessed: "3 days ago",
        studentsEnrolled: 2789,
        description:
          "Master complex state management with Redux and build enterprise-level React applications with advanced patterns.",
      },
      {
        id: 3,
        title: "Introduction to Machine Learning",
        instructor: "Dr. Jane Smith",
        duration: "24 hours",
        level: "Beginner",
        type: "free",
        thumbnail_image: "/placeholder.svg?height=250&width=400",
        status: "remaining",
        rating: 4.7,
        progress: 32,
        reviewCount: 167,
        price: 0,
        originalPrice: 79.99,
        lastAccessed: "1 week ago",
        studentsEnrolled: 5678,
        description:
          "Learn the fundamentals of machine learning algorithms and how to implement them using Python and popular libraries.",
      },
      {
        id: 4,
        title: "Python for Data Science",
        instructor: "Dr. Jane Smith",
        duration: "32 hours",
        level: "Intermediate",
        type: "premium",
        thumbnail_image: "/placeholder.svg?height=250&width=400",
        status: "completed",
        rating: 4.9,
        progress: 100,
        reviewCount: 218,
        price: 24.99,
        originalPrice: 94.99,
        lastAccessed: "5 days ago",
        studentsEnrolled: 4321,
        description:
          "Develop skills in data analysis, visualization, and modeling using Python's powerful data science ecosystem.",
      },
      {
        id: 5,
        title: "UI/UX Design Fundamentals",
        instructor: "Prof. Alex Johnson",
        duration: "28 hours",
        level: "Beginner",
        type: "premium",
        thumbnail_image: "/placeholder.svg?height=250&width=400",
        status: "remaining",
        rating: 4.6,
        progress: 45,
        reviewCount: 176,
        price: 18.99,
        originalPrice: 69.99,
        lastAccessed: "2 days ago",
        studentsEnrolled: 2156,
        description:
          "Learn the principles of user interface and experience design to create intuitive, beautiful digital products.",
      },
      {
        id: 6,
        title: "Digital Marketing Masterclass",
        instructor: "Sarah Williams",
        duration: "22 hours",
        level: "Intermediate",
        type: "free",
        thumbnail_image: "/placeholder.svg?height=250&width=400",
        status: "remaining",
        rating: 4.5,
        progress: 15,
        reviewCount: 132,
        price: 0,
        originalPrice: 59.99,
        lastAccessed: "1 day ago",
        studentsEnrolled: 3789,
        description:
          "Comprehensive guide to digital marketing strategies including SEO, social media, email marketing, and analytics.",
      },
    ];

    setCourses(mockCourses);
    setCompletedCourses(2);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "completed")
      return matchesSearch && course.status === "completed";
    if (activeTab === "in-progress")
      return matchesSearch && course.status === "remaining";
    if (activeTab === "free") return matchesSearch && course.type === "free";
    if (activeTab === "premium")
      return matchesSearch && course.type === "premium";

    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome to Praktikly Learning Hub
              </h1>
              <p className="text-teal-100">
                Expand your knowledge with our premium courses designed for
                educators
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border-none">
              <div className="p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-teal-500 rounded-md">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-white/80">Total Courses</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-white">
                        {courses.length}
                      </p>
                      <span className="ml-2 text-xs text-teal-200">
                        +2 this month
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border-none">
              <div className="p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-green-500 rounded-md">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-white/80">Completed</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-white">
                        {completedCourses}
                      </p>
                      <span className="ml-2 text-xs text-teal-200">
                        {Math.round((completedCourses / courses.length) * 100)}%
                        completion rate
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Your Courses</h2>

          <div className="w-full md:w-auto">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  activeTab === "all"
                    ? "bg-teal-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("in-progress")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "in-progress"
                    ? "bg-teal-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "completed"
                    ? "bg-teal-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveTab("free")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "free"
                    ? "bg-teal-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Free
              </button>
              <button
                onClick={() => setActiveTab("premium")}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  activeTab === "premium"
                    ? "bg-teal-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Premium
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {filteredCourses.length === 0 ? (
          <div className="bg-white p-12 rounded-lg text-center shadow-md">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">
              No courses found
            </h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Try changing your search term or filter selection to find what
              you're looking for.
            </p>
            <button className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md">
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200 rounded-lg group bg-white"
              >
                <div className="relative">
                  <img
                    src={course.thumbnail_image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />

                  <span
                    className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${
                      course.type === "free"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-teal-600 hover:bg-teal-700 text-white"
                    }`}
                  >
                    {course.type === "free" ? "FREE" : "PREMIUM"}
                  </span>

                  {course.status === "completed" ? (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                      <span className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-xs flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </span>
                    </div>
                  ) : (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2">
                      <div className="flex justify-between items-center text-xs text-white mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-teal-600 h-1.5 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3">
                    by {course.instructor}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-50 text-gray-700 border border-gray-200 text-xs px-2 py-1 rounded-full flex items-center">
                      <Clock size={12} className="mr-1" />
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex items-center mb-4">
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 text-sm">
                      {course.reviewCount} reviews
                    </span>
                  </div>

                  <div className="flex items-center mb-4 text-sm text-gray-500">
                    <Users size={14} className="mr-1" />
                    <span>
                      {course.studentsEnrolled.toLocaleString()} students
                      enrolled
                    </span>
                  </div>
                </div>

                <div className="p-5 pt-0 flex justify-between items-center border-t border-gray-100">
                  <div>
                    {course.type === "free" ? (
                      <div className="flex items-center space-x-3">
                        <Link
                          to={`/courses/${course.id}/assignments`}
                          title="Assignments"
                          className="p-1 text-green-600 hover:text-green-800"
                        >
                          <ClipboardList className="w-5 h-5" />
                        </Link>
                        <Link
                          to={`/courses/${course.id}/announcements`}
                          title="Announcements"
                          className="p-1 text-green-600 hover:text-green-800"
                        >
                          <Megaphone className="w-5 h-5" />
                        </Link>
                        <Link
                          to={`/courses/${course.id}/discussion`}
                          title="Discussion"
                          className="p-1 text-green-600 hover:text-green-800"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </Link>
                      </div>
                    ) : (
                      <div className="flex items-end">
                        <span className="text-teal-600 font-bold text-lg">
                          ${course.price.toFixed(2)}
                        </span>
                        {course.originalPrice > course.price && (
                          <span className="ml-2 text-gray-500 text-sm line-through">
                            ${course.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <Link to={`/courses/${course.id}`} className="block">
                    <button
                      className={`px-4 py-2 rounded-md text-white flex items-center ${
                        course.status === "completed"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-teal-600 hover:bg-teal-700"
                      }`}
                    >
                      {course.status === "completed" ? (
                        <>
                          <ExternalLink className="mr-1 h-4 w-4" />
                          Review
                        </>
                      ) : (
                        <>
                          <BookOpen className="mr-1 h-4 w-4" />
                          Continue
                        </>
                      )}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
