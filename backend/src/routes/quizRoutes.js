/**
 * quizRoutes — /quizzes CRUD and student attempt flow.
 */
const router = require('express').Router()

const quizController = require('../controllers/quizController')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.get('/', authenticate, quizController.listQuizzes)
router.get('/:id', authenticate, quizController.getQuiz)
router.get('/:id/attempts', authenticate, quizController.listAttempts)

router.post('/', authenticate, authorize('instructor', 'admin'), quizController.createQuiz)
router.put('/:id', authenticate, authorize('instructor', 'admin'), quizController.updateQuiz)
router.delete('/:id', authenticate, authorize('instructor', 'admin'), quizController.deleteQuiz)

// Student: submit a quiz attempt.
router.post('/:id/attempts', authenticate, authorize('student'), quizController.submitAttempt)

module.exports = router
