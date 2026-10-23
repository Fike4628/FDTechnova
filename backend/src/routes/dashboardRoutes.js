/**
 * dashboardRoutes — role-scoped aggregations and the /admin aggregates that
 * don't belong to a single resource router (reports, announcements, users).
 *
 * Mounted at the root prefix, so all paths are absolute:
 *   /dashboard/admin | /dashboard/instructor | /dashboard/student
 *   /student/courses | /student/assignments | /student/results
 *   /student/schedule | /student/profile
 *   /instructor/courses | /instructor/assignments | /instructor/students
 *   /instructor/assignments/:assignmentId/grade | /instructor/profile
 *   /admin/reports | /admin/announcements
 *   /admin/students | /admin/instructors | /admin/users/:id/deactivate
 */
const router = require('express').Router()

const dashboardController = require('../controllers/dashboardController')
const courseController = require('../controllers/courseController')
const assignmentController = require('../controllers/assignmentController')
const scheduleController = require('../controllers/scheduleController')
const userController = require('../controllers/userController')
const notificationController = require('../controllers/notificationController')

const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

const only = (...roles) => [authenticate, authorize(...roles)]

// Public: instructor directory (frontend instructorService.getAll).
router.get('/instructors', userController.listInstructors)

// ── Dashboards ────────────────────────────────────────
router.get('/dashboard/admin', ...only('admin'), dashboardController.adminDashboard)
router.get(
  '/dashboard/instructor',
  ...only('instructor'),
  dashboardController.instructorDashboard
)
router.get(
  '/dashboard/student',
  ...only('student'),
  dashboardController.studentDashboard
)

// ── Student area ───────────────────────────────────────
router.get('/student/courses', ...only('student'), dashboardController.studentCourses)
router.get('/student/assignments', ...only('student'), dashboardController.studentAssignments)
router.get('/student/results', ...only('student'), dashboardController.studentResults)
router.get('/student/schedule', ...only('student'), scheduleController.listSchedules)
router.put('/student/profile', ...only('student'), userController.updateProfileSelf)

// ── Instructor area ────────────────────────────────────
router.get('/instructor/courses', ...only('instructor'), courseController.listOwnCourses)
router.get('/instructor/assignments', ...only('instructor'), assignmentController.listAssignments)
router.get('/instructor/students', ...only('instructor'), userController.listInstructorStudents)
router.put(
  '/instructor/assignments/:assignmentId/grade',
  ...only('instructor'),
  assignmentController.gradeByAssignment
)
router.put('/instructor/profile', ...only('instructor'), userController.updateProfileSelf)

// ── Admin aggregates ───────────────────────────────────
router.get('/admin/reports', ...only('admin'), dashboardController.adminReports)
router.get('/admin/announcements', ...only('admin'), notificationController.listAnnouncements)
router.post('/admin/announcements', ...only('admin'), notificationController.createAnnouncement)
router.get('/admin/students', ...only('admin'), userController.listStudents)
router.get('/admin/instructors', ...only('admin'), userController.listInstructors)
router.put('/admin/users/:id/deactivate', ...only('admin'), userController.deactivateUser)

module.exports = router
