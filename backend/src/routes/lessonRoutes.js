/**
 * lessonRoutes — /lessons CRUD (instructor/admin) + read for enrolled users.
 * The by-course listing lives on the course router (/courses/:courseId/lessons).
 */
const router = require('express').Router()

const lessonController = require('../controllers/lessonController')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const validateRequest = require('../middleware/validateRequest')
const { createLessonRules } = require('../validators/courseValidator')

router.get('/:id', authenticate, lessonController.getLesson)

router.post(
  '/',
  authenticate,
  authorize('instructor', 'admin'),
  createLessonRules,
  validateRequest,
  lessonController.createLesson
)
router.put(
  '/:id',
  authenticate,
  authorize('instructor', 'admin'),
  validateRequest,
  lessonController.updateLesson
)
router.delete(
  '/:id',
  authenticate,
  authorize('instructor', 'admin'),
  lessonController.deleteLesson
)

module.exports = router
