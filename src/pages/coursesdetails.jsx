"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FiArrowLeft,
  FiClock,
  FiUsers,
  FiBookOpen,
  FiCalendar,
  FiAward,
  FiChevronRight,
} from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `https://platform-backend-c4zp.onrender.com/teacher_courses/${id}`
        );
        setCourse(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const getSafeThumbnail = (url) => {
    if (!url) return null;
    const lowerUrl = url.toLowerCase();
    return lowerUrl.endsWith(".jpg") ||
      lowerUrl.endsWith(".jpeg") ||
      lowerUrl.endsWith(".png")
      ? url
      : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ImSpinner8 className="animate-spin text-4xl text-emerald-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-red-50 p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <FiBookOpen className="text-4xl mb-4 text-red-500" />
          <h2 className="text-xl font-semibold mb-2">Error Loading Course</h2>
          <p className="text-gray-600">{error}</p>
          <Link
            to="/courses"
            className="mt-4 text-emerald-600 hover:text-emerald-800 flex items-center"
          >
            <FiArrowLeft className="mr-2" />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-emerald-50 p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <FiBookOpen className="text-4xl mb-4 text-emerald-600" />
          <h2 className="text-xl font-semibold mb-2">Course Not Found</h2>
          <p className="text-gray-600">
            The requested course could not be found
          </p>
          <Link
            to="/courses"
            className="mt-4 text-emerald-600 hover:text-emerald-800 flex items-center"
          >
            <FiArrowLeft className="mr-2" />
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  const thumbnail = getSafeThumbnail(course.thumbnail_url);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/courses"
            className="text-emerald-600 hover:text-emerald-800 flex items-center"
          >
            <FiArrowLeft className="mr-2" />
            Back to Courses
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-80">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-emerald-50 to-teal-50 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Course Planning Overview"
                  className="w-full h-auto mb-6 rounded-xl shadow-sm"
                />
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
              <h1 className="text-4xl font-bold text-white mb-2">
                {course.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-200">
                <span className="bg-emerald-600 px-3 py-1 rounded-full text-sm">
                  {course.category}
                </span>
                <span className="flex items-center">
                  <FiCalendar className="mr-1" />
                  {new Date(course.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-column layout for info and action button */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Course Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Description */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-emerald-700">
                <FiBookOpen className="mr-2" />
                Course Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Course Stats */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-emerald-700">
                Course Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-xl">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <FiUsers className="mr-2 text-emerald-600" />
                    Enrollment
                  </h4>
                  <p className="text-gray-700">
                    Currently enrolled by {course.student_count} students
                  </p>
                </div>

                <div className="bg-emerald-50 p-4 rounded-xl">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <FiClock className="mr-2 text-emerald-600" />
                    Duration
                  </h4>
                  <p className="text-gray-700">
                    {course.duration || "Self-paced learning"}
                  </p>
                </div>
              </div>
            </div>

            {/* Course Modules (if available) */}
            {course.modules && course.modules.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-emerald-700">
                  Course Curriculum
                </h3>
                <img
                  src="./website-planning.webp"
                  alt="Course Planning Overview"
                  className="w-full h-auto mb-6 rounded-xl shadow-sm"
                />
                <div className="space-y-3">
                  {course.modules.map((module, index) => (
                    <div
                      key={module.id}
                      className="border border-emerald-100 rounded-xl p-4 hover:bg-emerald-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="bg-emerald-100 text-emerald-700 h-8 w-8 rounded-full flex items-center justify-center mr-3 font-medium">
                            {index + 1}
                          </span>
                          <h4 className="text-lg font-medium">
                            {module.title}
                          </h4>
                        </div>
                        {Array.isArray(module.lessons) && (
                          <span className="text-sm text-gray-500">
                            {module.duration} • {module.lessons.length} lessons
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column - Action Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-emerald-700 mb-2">
                    Ready to Start Learning?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Join {course.student_count} students already enrolled in
                    this course
                  </p>

                  <div className="bg-emerald-50 p-4 rounded-xl mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">
                        Course Access
                      </span>
                      <span className="text-emerald-600">Lifetime</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">
                        Certificate
                      </span>
                      <span className="text-emerald-600">Included</span>
                    </div>
                  </div>

                  <Link
                    to={`/course/${course.id}/learn`}
                    className="block w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-4 rounded-xl hover:from-emerald-700 hover:to-teal-600 transition-all text-center shadow-lg hover:shadow-xl font-medium text-lg"
                  >
                    Start Learning Now
                  </Link>

                  <div className="mt-4 flex items-center justify-center text-emerald-600">
                    <FiAward className="mr-2" />
                    <span className="text-sm">Satisfaction Guaranteed</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-700 mb-3">
                    What you'll get:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <FiChevronRight className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">
                        Full lifetime access to course materials
                      </span>
                    </li>
                    <li className="flex items-start">
                      <FiChevronRight className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">
                        Certificate of completion
                      </span>
                    </li>
                    <li className="flex items-start">
                      <FiChevronRight className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">
                        Access to community support
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
