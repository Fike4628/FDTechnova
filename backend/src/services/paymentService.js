/**
 * paymentService — payment processing abstraction.
 *
 * Currently a "mock" provider: it records a Payment and immediately marks it
 * completed, generating a fake transaction id. Swap the `processWithProvider`
 * branch for a real gateway (Stripe, etc.) without touching the controllers.
 */
const crypto = require('crypto')
const config = require('../config/env')
const ApiError = require('../utils/ApiError')
const { Payment, Enrollment } = require('../models')

function generateTransactionId() {
  return `txn_${crypto.randomBytes(10).toString('hex')}`
}

/**
 * Create + charge a payment for an enrollment. In mock mode the charge always
 * succeeds; in production this would call the real provider and only persist
 * `completed` on confirmation.
 */
async function processPayment({ enrollmentId, studentId, amount, method }) {
  if (amount <= 0) throw ApiError.badRequest('Amount must be greater than 0')

  if (enrollmentId) {
    const enrollment = await Enrollment.findByPk(enrollmentId)
    if (!enrollment) throw ApiError.notFound('Enrollment not found')
  }

  const payment = await Payment.create({
    enrollmentId: enrollmentId || null,
    studentId,
    amount,
    method: method || 'card',
    status: 'pending',
  })

  const transactionId = generateTransactionId()
  await payment.update({
    status: 'completed',
    transactionId,
    paidAt: new Date(),
  })

  // If tied to an enrollment, mark the enrollment active.
  if (enrollmentId) {
    await Enrollment.update(
      { status: 'active' },
      { where: { id: enrollmentId } }
    )
  }

  return payment
}

/**
 * Verify/refetch a payment by id (used by webhook-equivalent flows).
 */
async function verifyPayment(paymentId) {
  const payment = await Payment.findByPk(paymentId)
  if (!payment) throw ApiError.notFound('Payment not found')
  return payment
}

/**
 * Refund a completed payment.
 */
async function refundPayment(paymentId) {
  const payment = await Payment.findByPk(paymentId)
  if (!payment) throw ApiError.notFound('Payment not found')
  if (payment.status !== 'completed') {
    throw ApiError.badRequest('Only completed payments can be refunded')
  }
  await payment.update({ status: 'refunded' })
  if (payment.enrollmentId) {
    await Enrollment.update(
      { status: 'refunded' },
      { where: { id: payment.enrollmentId } }
    )
  }
  return payment
}

module.exports = {
  processPayment,
  verifyPayment,
  refundPayment,
  isMock: config.payment.provider === 'mock',
}
