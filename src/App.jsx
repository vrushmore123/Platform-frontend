import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Courses from "./pages/courses";
import CourseDetail from "./pages/coursesdetails";
import CourseLearning from "./pages/Learncourse";
import TeacherDashboard from "./components/teacherdashboard/TeacherDashboard";
import Navbar from "./components/Navbar";
import AddCoursePage from "./components/teacherdashboard/CreateCoursePage";
import Preview from "./components/teacherdashboard/preview";
import CourseEditPage from "./components/teacherdashboard/CourseEditPage"; // <-- import here
import AssignmentsPage from "./pages/AssignmentsPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import DiscussionPage from "./pages/DiscussionPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/:id/assignments" element={<AssignmentsPage />} />
        <Route
          path="/courses/:id/announcements"
          element={<AnnouncementsPage />}
        />
        <Route path="/courses/:id/discussion" element={<DiscussionPage />} />
        <Route path="/course/:id/learn" element={<CourseLearning />} />
        <Route path="/courses/edit/:id" element={<CourseEditPage />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/courses" element={<AddCoursePage />} />
        <Route path="/teacher/courses/:id" element={<AddCoursePage />} />
        <Route path="/preview/:id" element={<Preview />} />
      </Routes>
    </Router>
  );
}

export default App;
