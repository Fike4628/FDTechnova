/**
 * userRoutes — /users/* and the public /instructors index.
 *
 * Admin-only listing lives under /users; self profile edits and the public
 * instructor directory are open to authenticated / public users respectively.
 */
const router = require('express').Router()

const userController = require('../controllers/userController')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

// Admin: full user management.
router.get('/', authenticate, authorize('admin'), userController.listUsers)
router.get('/:id', authenticate, userController.getUser)

// Self (or admin): update profile.
router.put('/:id', authenticate, userController.updateProfile)

module.exports = router
