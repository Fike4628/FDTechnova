/**
 * scheduleRoutes — /schedules and admin-scoped /admin/schedules.
 * Students read their enrolled courses' schedules; instructors manage their
 * own; admins manage any.
 */
const router = require('express').Router()
const adminRouter = require('express').Router()

const scheduleController = require('../controllers/scheduleController')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.get('/', authenticate, scheduleController.listSchedules)
router.get('/:id', authenticate, scheduleController.getSchedule)
router.post('/', authenticate, authorize('instructor', 'admin'), scheduleController.createSchedule)
router.put('/:id', authenticate, authorize('instructor', 'admin'), scheduleController.updateSchedule)
router.delete('/:id', authenticate, authorize('instructor', 'admin'), scheduleController.deleteSchedule)

// Admin listing surfaced under /admin/schedules.
adminRouter.get('/', authenticate, authorize('admin'), scheduleController.listSchedules)
adminRouter.post('/', authenticate, authorize('admin'), scheduleController.createSchedule)

module.exports = router
module.exports.adminRouter = adminRouter
