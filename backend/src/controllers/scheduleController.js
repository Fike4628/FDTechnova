/**
 * scheduleController — class schedule CRUD.
 * Instructors manage their courses' schedules; admins manage any; students
 * read their enrolled courses' schedules.
 */
const { Op } = require('sequelize')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const {
  Schedule,
  Course,
  Enrollment,
  User,
} = require('../models')

const listSchedules = asyncHandler(async (req, res) => {
  const where = {}
  const include = [{ model: Course, as: 'course', attributes: ['id', 'title'] }]

  if (req.user.role === 'student') {
    const courseIds = (
      await Enrollment.findAll({
        where: { studentId: req.user.id, status: ['active', 'completed'] },
        attributes: ['courseId'],
      })
    ).map((e) => e.courseId)
    where.courseId = { [Op.in]: courseIds }
  } else if (req.user.role === 'instructor') {
    const courseIds = (
      await Course.findAll({
        where: { instructorId: req.user.id },
        attributes: ['id'],
      })
    ).map((c) => c.id)
    where.courseId = { [Op.in]: courseIds }
  }

  if (req.query.courseId) where.courseId = Number(req.query.courseId)

  const schedules = await Schedule.findAll({ where, include })
  res.json(schedules)
})

const getSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findByPk(req.params.id, {
    include: [{ model: Course, as: 'course' }],
  })
  if (!schedule) throw ApiError.notFound('Schedule not found')
  res.json(schedule)
})

const assertOwnsCourse = async (courseId, user) => {
  if (user.role === 'admin') return
  const course = await Course.findByPk(courseId)
  if (!course) throw ApiError.notFound('Course not found')
  if (user.role === 'instructor' && course.instructorId !== user.id) {
    throw ApiError.forbidden()
  }
}

const createSchedule = asyncHandler(async (req, res) => {
  await assertOwnsCourse(req.body.courseId, req.user)
  const schedule = await Schedule.create(req.body)
  res.status(201).json(schedule)
})

const updateSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findByPk(req.params.id)
  if (!schedule) throw ApiError.notFound('Schedule not found')
  if (req.body.courseId) await assertOwnsCourse(req.body.courseId, req.user)
  else await assertOwnsCourse(schedule.courseId, req.user)

  const updatable = [
    'title',
    'dayOfWeek',
    'startTime',
    'endTime',
    'location',
    'startsAt',
    'endsAt',
    'courseId',
  ]
  updatable.forEach((k) => {
    if (req.body[k] !== undefined) schedule[k] = req.body[k]
  })
  await schedule.save()
  res.json(schedule)
})

const deleteSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findByPk(req.params.id)
  if (!schedule) throw ApiError.notFound('Schedule not found')
  await assertOwnsCourse(schedule.courseId, req.user)
  await schedule.destroy()
  res.json({ message: 'Schedule deleted' })
})

module.exports = {
  listSchedules,
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
}
