/**
 * courseRoutes — public /courses, student self-enroll, lessons-by-course,
 * plus admin-scoped /admin/courses CRUD.
 */
const router = require('express').Router()
const adminRouter = require('express').Router()

const courseController = require('../controllers/courseController')
const lessonController = require('../controllers/lessonController')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const validateRequest = require('../middleware/validateRequest')
const {
  createCourseRules,
  updateCourseRules,
  createLessonRules,
} = require('../validators/courseValidator')

// ── Public: browse ─────────────────────────────────────
router.get('/', courseController.listCourses)
router.get('/:id', courseController.getCourse)

// Lessons belonging to a course (preview gating handled in controller).
router.get('/:courseId/lessons', lessonController.listLessonsByCourse)

// ── Student: enroll ────────────────────────────────────
router.post(
  '/:id/enroll',
  authenticate,
  authorize('student', 'admin'),
  courseController.enrollInCourse
)

// ── Admin: course CRUD ─────────────────────────────────
adminRouter.get('/', authenticate, authorize('admin'), courseController.adminListCourses)
adminRouter.get('/:id', authenticate, authorize('admin'), courseController.adminGetCourse)
adminRouter.post(
  '/',
  authenticate,
  authorize('admin'),
  createCourseRules,
  validateRequest,
  courseController.adminCreateCourse
)
adminRouter.put(
  '/:id',
  authenticate,
  authorize('admin'),
  updateCourseRules,
  validateRequest,
  courseController.adminUpdateCourse
)
adminRouter.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  courseController.adminDeleteCourse
)

module.exports = router
module.exports.adminRouter = adminRouter
