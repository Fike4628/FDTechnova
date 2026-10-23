import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import PublicLayout from '../components/layout/PublicLayout'
import DashboardLayout from '../components/layout/DashboardLayout'

// Guards
import ProtectedRoute from './ProtectedRoute'
import RoleRoute from './RoleRoute'

// Public pages
import Home from '../pages/public/Home'
import Courses from '../pages/public/Courses'
import CourseDetails from '../pages/public/CourseDetails'
import About from '../pages/public/About'
import Instructors from '../pages/public/Instructors'
import Blog from '../pages/public/Blog'
import Contact from '../pages/public/Contact'
import FAQ from '../pages/public/FAQ'
import PrivacyPolicy from '../pages/public/PrivacyPolicy'
import Terms from '../pages/public/Terms'

// Auth
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'

// Student
import StudentDashboard from '../pages/student/StudentDashboard'
import MyCourses from '../pages/student/MyCourses'
import LearningPage from '../pages/student/LearningPage'
import MyAssignments from '../pages/student/MyAssignments'
import MyResults from '../pages/student/MyResults'
import MySchedule from '../pages/student/MySchedule'
import Notifications from '../pages/student/Notifications'
import StudentProfile from '../pages/student/StudentProfile'

// Instructor
import InstructorDashboard from '../pages/instructor/InstructorDashboard'
import InstructorCourses from '../pages/instructor/InstructorCourses'
import ManageLessons from '../pages/instructor/ManageLessons'
import ManageAssignments from '../pages/instructor/ManageAssignments'
import StudentsList from '../pages/instructor/StudentsList'
import InstructorProfile from '../pages/instructor/InstructorProfile'

// Admin
import AdminDashboard from '../pages/admin/AdminDashboard'
import ManageCourses from '../pages/admin/ManageCourses'
import CreateCourse from '../pages/admin/CreateCourse'
import EditCourse from '../pages/admin/EditCourse'
import ManageCategories from '../pages/admin/ManageCategories'
import ManageStudents from '../pages/admin/ManageStudents'
import ManageInstructors from '../pages/admin/ManageInstructors'
import ManageEnrollments from '../pages/admin/ManageEnrollments'
import ManageSchedules from '../pages/admin/ManageSchedules'
import ManageAnnouncements from '../pages/admin/ManageAnnouncements'
import ManagePayments from '../pages/admin/ManagePayments'
import Reports from '../pages/admin/Reports'

function AppRoutes() {
  return (
    <Routes>
      {/* ── Public ── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Route>

      {/* ── Auth (no layout) ── */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ── Student ── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={['student']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/my-courses" element={<MyCourses />} />
            <Route path="/student/learn/:courseId" element={<LearningPage />} />
            <Route path="/student/assignments" element={<MyAssignments />} />
            <Route path="/student/results" element={<MyResults />} />
            <Route path="/student/schedule" element={<MySchedule />} />
            <Route path="/student/notifications" element={<Notifications />} />
            <Route path="/student/profile" element={<StudentProfile />} />
          </Route>
        </Route>
      </Route>

      {/* ── Instructor ── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={['instructor']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
            <Route path="/instructor/courses" element={<InstructorCourses />} />
            <Route path="/instructor/lessons" element={<ManageLessons />} />
            <Route path="/instructor/assignments" element={<ManageAssignments />} />
            <Route path="/instructor/students" element={<StudentsList />} />
            <Route path="/instructor/profile" element={<InstructorProfile />} />
          </Route>
        </Route>
      </Route>

      {/* ── Admin ── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={['admin']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/courses" element={<ManageCourses />} />
            <Route path="/admin/courses/create" element={<CreateCourse />} />
            <Route path="/admin/courses/:id/edit" element={<EditCourse />} />
            <Route path="/admin/categories" element={<ManageCategories />} />
            <Route path="/admin/students" element={<ManageStudents />} />
            <Route path="/admin/instructors" element={<ManageInstructors />} />
            <Route path="/admin/enrollments" element={<ManageEnrollments />} />
            <Route path="/admin/schedules" element={<ManageSchedules />} />
            <Route path="/admin/announcements" element={<ManageAnnouncements />} />
            <Route path="/admin/payments" element={<ManagePayments />} />
            <Route path="/admin/reports" element={<Reports />} />
          </Route>
        </Route>
      </Route>

      {/* ── Fallback ── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
