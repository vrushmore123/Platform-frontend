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

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/course/:id/learn" element={<CourseLearning />} />

        {/* Course Edit Route */}
        <Route path="/courses/edit/:id" element={<CourseEditPage />} />

        {/* Teacher Routes */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/courses" element={<AddCoursePage />} />
        <Route path="/teacher/courses/:id" element={<AddCoursePage />} />
        <Route path="/preview/:id" element={<Preview />} />
      </Routes>
    </Router>
  );
}

export default App;
