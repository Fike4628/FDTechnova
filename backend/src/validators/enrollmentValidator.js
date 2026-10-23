/**
 * enrollmentValidator — express-validator chains for enrollment routes.
 */
const { body } = require('express-validator')

const createEnrollmentRules = [
  body('courseId')
    .isInt({ min: 1 })
    .withMessage('A valid course id is required'),
  body('studentId').optional().isInt({ min: 1 }),
  body('status')
    .optional()
    .isIn(['active', 'completed', 'cancelled', 'refunded'])
    .withMessage('Invalid enrollment status'),
]

const updateEnrollmentRules = [
  body('status')
    .optional()
    .isIn(['active', 'completed', 'cancelled', 'refunded'])
    .withMessage('Invalid enrollment status'),
  body('progress')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Progress must be between 0 and 100'),
]

module.exports = {
  createEnrollmentRules,
  updateEnrollmentRules,
}
