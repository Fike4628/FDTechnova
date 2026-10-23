/**
 * enrollmentRoutes — /enrollments and admin-scoped /admin/enrollments.
 *
 * Both use the same controller; role-based scoping happens inside the
 * controller (students see only their own). Create is admin/instructor only.
 */
const router = require('express').Router()
const adminRouter = require('express').Router()

const enrollmentController = require('../controllers/enrollmentController')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const validateRequest = require('../middleware/validateRequest')
const {
  createEnrollmentRules,
  updateEnrollmentRules,
} = require('../validators/enrollmentValidator')

// Authenticated reads (self-scoped for students).
router.get('/', authenticate, enrollmentController.listEnrollments)
router.get('/:id', authenticate, enrollmentController.getEnrollment)
router.put('/:id', authenticate, updateEnrollmentRules, validateRequest, enrollmentController.updateEnrollment)
router.delete('/:id', authenticate, enrollmentController.deleteEnrollment)

// Create an enrollment for any student (admin/instructor).
router.post(
  '/',
  authenticate,
  authorize('admin', 'instructor'),
  createEnrollmentRules,
  validateRequest,
  enrollmentController.createEnrollment
)

// Admin: same list, surfaced under /admin/enrollments.
adminRouter.get('/', authenticate, authorize('admin'), enrollmentController.listEnrollments)

module.exports = router
module.exports.adminRouter = adminRouter
