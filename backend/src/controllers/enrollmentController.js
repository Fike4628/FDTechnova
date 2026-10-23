/**
 * enrollmentController — enrollment CRUD with role-aware scoping.
 *
 * Students only ever see their own enrollments; admins/instructors see all
 * (instructors are further scoped to their own courses in routes where
 * relevant). Progress updates come from the lesson-completion flow.
 */
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const { Enrollment, Course, User } = require('../models')

// Students -> their enrollments; staff -> all enrollments (with relations).
const listEnrollments = asyncHandler(async (req, res) => {
  const where = {}
  if (req.user.role === 'student') where.studentId = req.user.id

  const include = [
    {
      model: Course,
      as: 'course',
      attributes: ['id', 'title', 'slug', 'imageUrl', 'level', 'price'],
    },
  ]
  if (req.user.role !== 'student') {
    include.push({
      model: User,
      as: 'student',
      attributes: ['id', 'firstName', 'lastName', 'email'],
    })
  }

  const enrollments = await Enrollment.findAll({ where, include })
  res.json(enrollments)
})

const getEnrollment = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findByPk(req.params.id, {
    include: [{ model: Course, as: 'course' }, { model: User, as: 'student' }],
  })
  if (!enrollment) throw ApiError.notFound('Enrollment not found')

  if (req.user.role === 'student' && enrollment.studentId !== req.user.id) {
    throw ApiError.forbidden()
  }

  res.json(enrollment)
})

// Admin/instructor: create an enrollment for a student.
const createEnrollment = asyncHandler(async (req, res) => {
  const { courseId, studentId, status } = req.body
  const targetStudent = studentId || req.user.id

  const course = await Course.findByPk(courseId)
  if (!course) throw ApiError.notFound('Course not found')

  const [enrollment, created] = await Enrollment.findOrCreate({
    where: { studentId: targetStudent, courseId },
    defaults: {
      studentId: targetStudent,
      courseId,
      status: status || 'active',
    },
  })

  if (!created) throw ApiError.conflict('Student is already enrolled')

  res.status(201).json(enrollment)
})

const updateEnrollment = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findByPk(req.params.id)
  if (!enrollment) throw ApiError.notFound('Enrollment not found')

  if (req.user.role === 'student' && enrollment.studentId !== req.user.id) {
    throw ApiError.forbidden()
  }

  const { status, progress } = req.body
  if (status !== undefined) enrollment.status = status
  if (progress !== undefined) {
    enrollment.progress = Math.min(100, Math.max(0, progress))
    if (enrollment.progress >= 100 && enrollment.status === 'active') {
      enrollment.status = 'completed'
      enrollment.completedAt = new Date()
    }
  }
  await enrollment.save()

  res.json(enrollment)
})

const deleteEnrollment = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findByPk(req.params.id)
  if (!enrollment) throw ApiError.notFound('Enrollment not found')

  if (req.user.role === 'student' && enrollment.studentId !== req.user.id) {
    throw ApiError.forbidden()
  }

  await enrollment.destroy()
  res.json({ message: 'Enrollment removed' })
})

module.exports = {
  listEnrollments,
  getEnrollment,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
}
