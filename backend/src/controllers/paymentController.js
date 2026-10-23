/**
 * paymentController — payments listing + charge + verify.
 * Students see their own payments; admins see all. The actual charge is
 * delegated to paymentService so the gateway can be swapped out.
 */
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const { Payment, Enrollment, Course, User } = require('../models')
const paymentService = require('../services/paymentService')

const listPayments = asyncHandler(async (req, res) => {
  const where = {}
  if (req.user.role === 'student') where.studentId = req.user.id

  const include = [
    { model: User, as: 'student', attributes: ['id', 'firstName', 'lastName', 'email'] },
    { model: Enrollment, as: 'enrollment', include: [{ model: Course, as: 'course', attributes: ['id', 'title'] }] },
  ]

  const payments = await Payment.findAll({ where, include })
  res.json(payments)
})

const getPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findByPk(req.params.id, {
    include: [
      { model: User, as: 'student' },
      { model: Enrollment, as: 'enrollment' },
    ],
  })
  if (!payment) throw ApiError.notFound('Payment not found')

  if (req.user.role === 'student' && payment.studentId !== req.user.id) {
    throw ApiError.forbidden()
  }
  res.json(payment)
})

// Student: pay for an enrollment / course.
const createPayment = asyncHandler(async (req, res) => {
  const { enrollmentId, amount, method } = req.body

  // If no amount given, derive it from the enrollment's course price.
  let finalAmount = amount
  let studentId = req.user.id
  if (enrollmentId) {
    const enrollment = await Enrollment.findByPk(enrollmentId, {
      include: [{ model: Course, as: 'course' }],
    })
    if (!enrollment) throw ApiError.notFound('Enrollment not found')
    if (req.user.role === 'student' && enrollment.studentId !== req.user.id) {
      throw ApiError.forbidden()
    }
    if (finalAmount === undefined && enrollment.course) {
      finalAmount = Number(enrollment.course.price)
    }
  }

  const payment = await paymentService.processPayment({
    enrollmentId,
    studentId,
    amount: finalAmount,
    method,
  })

  res.status(201).json(payment)
})

const verifyPayment = asyncHandler(async (req, res) => {
  const payment = await paymentService.verifyPayment(req.params.id)
  if (req.user.role === 'student' && payment.studentId !== req.user.id) {
    throw ApiError.forbidden()
  }
  res.json(payment)
})

const refundPayment = asyncHandler(async (req, res) => {
  const payment = await paymentService.refundPayment(req.params.id)
  res.json(payment)
})

module.exports = {
  listPayments,
  getPayment,
  createPayment,
  verifyPayment,
  refundPayment,
}
