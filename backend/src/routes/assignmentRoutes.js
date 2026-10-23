/**
 * assignmentRoutes — /assignments CRUD and the instructor grade/submit flows.
 *
 * Students submit against an assignment via POST /assignments/:id/submit.
 * Instructors grade via PUT /assignments/:id/grade (submission id), exposed
 * here and re-exposed by the dashboard router under /instructor/assignments.
 */
const router = require('express').Router()

const assignmentController = require('../controllers/assignmentController')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

// List submissions (instructor: their courses; student: their own).
// Registered before /:id so "submissions" isn't captured as an id.
router.get('/submissions/all', authenticate, assignmentController.listSubmissions)

// Read (role-scoped inside controller).
router.get('/', authenticate, assignmentController.listAssignments)
router.get('/:id', authenticate, assignmentController.getAssignment)

// Instructor/admin: manage assignments.
router.post('/', authenticate, authorize('instructor', 'admin'), assignmentController.createAssignment)
router.put('/:id', authenticate, authorize('instructor', 'admin'), assignmentController.updateAssignment)
router.delete('/:id', authenticate, authorize('instructor', 'admin'), assignmentController.deleteAssignment)

// Student: submit work.
router.post('/:id/submit', authenticate, authorize('student'), assignmentController.submitAssignment)

// Instructor/admin: grade a submission (param is the submission id).
router.put('/:id/grade', authenticate, authorize('instructor', 'admin'), assignmentController.gradeSubmission)

module.exports = router
