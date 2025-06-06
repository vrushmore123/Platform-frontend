import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  BookOpen,
  Users,
  Star,
  Trash2,
  Edit,
  Eye,
  HelpCircle,
  ClipboardList,
  Megaphone,
  MessageCircle,
} from "lucide-react";

const CourseCard = ({
  course,
  type,
  onPublish,
  onMoveToDraft,
  onDelete,
  onView,
  onEdit,
}) => {
  const navigate = useNavigate();

  const handlePublish = () => {
    if (onPublish) {
      onPublish(course.id);
    } else {
      console.warn("onPublish function not provided");
    }
  };

  const handleEdit = () => {
    navigate(`/teacher/courses/${course.id}`);
  };

  const handleView = () => {
    if (onView) {
      onView(course);
    } else {
      console.warn("onView function not provided");
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(course.id, type);
    } else {
      console.warn("onDelete function not provided");
    }
  };

  const handleMoveToDraft = () => {
    if (onMoveToDraft) {
      onMoveToDraft(course.id);
    } else {
      console.warn("onMoveToDraft function not provided");
    }
  };

  const handleAssignments = () => console.warn("Assignments clicked");
  const handleAnnouncements = () => console.warn("Announcements clicked");
  const handleDiscussion = () => console.warn("Discussion clicked");

  const statusConfig = {
    published: {
      color: "bg-emerald-100 text-emerald-800",
      text: "Published",
      icon: <BookOpen className="w-3 h-3" />,
    },
    draft: {
      color: "bg-amber-100 text-amber-800",
      text: "Draft",
      icon: <Clock className="w-3 h-3" />,
    },
    ongoing: {
      color: "bg-blue-100 text-blue-800",
      text: "Ongoing",
      icon: <Users className="w-3 h-3" />,
    },
    unknown: {
      color: "bg-gray-100 text-gray-800",
      text: "Unknown",
      icon: <HelpCircle className="w-3 h-3" />,
    },
  };

  const currentStatus = statusConfig[course.status] || statusConfig.unknown;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full max-w-sm mx-auto transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-200 group">
      <div className="relative h-48 bg-gray-100">
        {course.thumbnail_image ? (
          <img
            src={course.thumbnail_image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder.svg";
            }}
          />
        ) : (
          <img
            src="/placeholder.svg"
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`${currentStatus.color} text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium`}
          >
            {currentStatus.icon}
            {currentStatus.text}
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70"></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-3">
          <button
            onClick={handleView}
            className="bg-white/90 text-gray-800 p-2 rounded-full shadow-md hover:bg-white transition-colors"
            title="Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={handleEdit}
            className="bg-white/90 text-blue-600 p-2 rounded-full shadow-md hover:bg-white transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
            {course.title}
          </h3>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-5 border-t border-gray-100 pt-3">
          {type === "published" && (
            <div className="flex items-center">
              <Star className="text-yellow-400 w-4 h-4 mr-1 fill-yellow-400" />
              <span className="font-medium text-gray-700">
                {course.rating || "0.0"}
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <Users className="w-4 h-4 mr-1 text-gray-500" />
              <span>{course.studentsEnrolled || 0}</span>
            </div>
          )}

          {(type === "ongoing" || type === "published") && !course.rating && (
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1 text-gray-500" />
              <span>{course.studentsEnrolled || 0} enrolled</span>
            </div>
          )}

          {type === "draft" && (
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1 text-gray-500" />
              <span>{course.modules?.length || 0} modules</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div>
            {course.status === "draft" && (
              <button
                onClick={handlePublish}
                className="text-sm font-medium text-green-600 hover:text-green-800 px-3 py-1.5 rounded-md hover:bg-green-50 transition-colors"
              >
                Publish
              </button>
            )}
            {course.status === "published" && (
              <button
                onClick={handleMoveToDraft}
                className="text-sm font-medium text-amber-600 hover:text-amber-800 px-3 py-1.5 rounded-md hover:bg-amber-50 transition-colors"
              >
                Move to Draft
              </button>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleAssignments}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
              title="Assignments"
            >
              <ClipboardList className="w-4 h-4" />
            </button>
            <button
              onClick={handleAnnouncements}
              className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors"
              title="Announcements"
            >
              <Megaphone className="w-4 h-4" />
            </button>
            <button
              onClick={handleDiscussion}
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
              title="Discussion"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              onClick={handleEdit}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {type === "ongoing" && (
          <button
            onClick={handlePublish}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            Publish to Catalog
            <BookOpen className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
