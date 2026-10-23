/**
 * courseValidator — express-validator chains for course + category routes.
 */
const { body } = require('express-validator')

const createCourseRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('slug').optional().trim(),
  body('description').optional().trim(),
  body('shortDescription').optional().trim(),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be >= 0'),
  body('level')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Invalid level'),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Invalid status'),
  body('categoryId').optional().isInt({ min: 1 }),
  body('instructorId').optional().isInt({ min: 1 }),
  body('featured').optional().isBoolean(),
  body('durationHours').optional().isInt({ min: 0 }),
  body('imageUrl').optional().isURL().withMessage('Invalid image URL'),
]

const updateCourseRules = createCourseRules // all fields optional on update

const createCategoryRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('slug').optional().trim(),
  body('description').optional().trim(),
]

const createLessonRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').optional().trim(),
  body('videoUrl').optional().trim(),
  body('duration').optional().isInt({ min: 0 }),
  body('order').optional().isInt({ min: 0 }),
  body('moduleId').optional().isInt({ min: 1 }),
  body('isPreview').optional().isBoolean(),
]

module.exports = {
  createCourseRules,
  updateCourseRules,
  createCategoryRules,
  createLessonRules,
}
