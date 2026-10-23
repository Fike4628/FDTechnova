/**
 * notificationRoutes — /notifications for the signed-in user.
 * Every route is authenticated and scoped to req.user.id in the controller.
 *
 * Note the order: `/read-all` is registered before `/:id` so the parameterised
 * route doesn't swallow the literal path.
 */
const router = require('express').Router()

const notificationController = require('../controllers/notificationController')
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate, notificationController.listNotifications)
router.put('/read-all', authenticate, notificationController.markAllAsRead)
router.put('/:id/read', authenticate, notificationController.markAsRead)
router.delete('/:id', authenticate, notificationController.deleteNotification)

module.exports = router
