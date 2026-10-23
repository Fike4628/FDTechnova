/**
 * paymentRoutes — /payments and admin-scoped /admin/payments.
 * Students create/verify their own payments; refunds are admin-only.
 */
const router = require('express').Router()
const adminRouter = require('express').Router()

const paymentController = require('../controllers/paymentController')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.get('/', authenticate, paymentController.listPayments)
router.get('/:id', authenticate, paymentController.getPayment)
router.post('/', authenticate, authorize('student', 'admin'), paymentController.createPayment)
router.get('/:id/verify', authenticate, paymentController.verifyPayment)
router.post('/:id/refund', authenticate, authorize('admin'), paymentController.refundPayment)

// Admin listing surfaced under /admin/payments.
adminRouter.get('/', authenticate, authorize('admin'), paymentController.listPayments)

module.exports = router
module.exports.adminRouter = adminRouter
