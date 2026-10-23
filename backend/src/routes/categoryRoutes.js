/**
 * categoryRoutes — public /categories and admin-scoped /admin/categories.
 *
 * Two routers are exported: `router` (public reads) and `adminRouter`
 * (create/update/delete, admin-only). app.js mounts them at the matching
 * prefixes so the controller stays unaware of URL structure.
 */
const router = require('express').Router()
const adminRouter = require('express').Router()

const categoryController = require('../controllers/categoryController')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const validateRequest = require('../middleware/validateRequest')
const { createCategoryRules } = require('../validators/courseValidator')

// Public
router.get('/', categoryController.listCategories)
router.get('/:id', categoryController.getCategory)

// Admin
adminRouter.get('/', authenticate, authorize('admin'), categoryController.listCategories)
adminRouter.get('/:id', authenticate, authorize('admin'), categoryController.getCategory)
adminRouter.post(
  '/',
  authenticate,
  authorize('admin'),
  createCategoryRules,
  validateRequest,
  categoryController.createCategory
)
adminRouter.put(
  '/:id',
  authenticate,
  authorize('admin'),
  createCategoryRules,
  validateRequest,
  categoryController.updateCategory
)
adminRouter.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  categoryController.deleteCategory
)

module.exports = router
module.exports.adminRouter = adminRouter
