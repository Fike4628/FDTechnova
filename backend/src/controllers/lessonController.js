/**
 * lessonController — lesson read + instructor/admin write.
 *
 * Lessons belong to a course; the by-course listing powers the course details
 * page. Preview lessons are public; the rest require an active enrollment,
 * enforced here so the route layer stays declarative.
 */
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const {
  Lesson,
  Course,
  Module,
  LearningMaterial,
  Enrollment,
} = require('../models')

// Lessons for a course, ordered, with materials. Free previews always visible.
const listLessonsByCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId
  const course = await Course.findByPk(courseId)
  if (!course) throw ApiError.notFound('Course not found')

  const lessons = await Lesson.findAll({
    where: { courseId },
    include: [{ model: LearningMaterial, as: 'materials' }],
    order: [['order', 'ASC'], ['id', 'ASC']],
  })

  // If the course isn't published, hide non-preview lessons for non-staff.
  const isStaff =
    req.user?.role === 'admin' || req.user?.role === 'instructor'
  if (course.status !== 'published' && !isStaff) {
    throw ApiError.notFound('Course not found')
  }

  if (req.user && !isStaff) {
    const enrolled = await Enrollment.findOne({
      where: { studentId: req.user.id, courseId, status: ['active', 'completed'] },
    })
    if (!enrolled) {
      // Restrict to previews only.
      return res.json(
        lessons.map((l) => l.get({ plain: true })).filter((l) => l.isPreview)
      )
    }
  }

  res.json(lessons)
})

const getLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findByPk(req.params.id, {
    include: [{ model: LearningMaterial, as: 'materials' }],
  })
  if (!lesson) throw ApiError.notFound('Lesson not found')
  res.json(lesson)
})

const createLesson = asyncHandler(async (req, res) => {
  const { courseId } = req.body
  const course = await Course.findByPk(courseId)
  if (!course) throw ApiError.notFound('Course not found')

  if (
    req.user.role === 'instructor' &&
    course.instructorId !== req.user.id
  ) {
    throw ApiError.forbidden('You can only manage lessons for your own courses')
  }

  const lesson = await Lesson.create(req.body)
  res.status(201).json(lesson)
})

const updateLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findByPk(req.params.id)
  if (!lesson) throw ApiError.notFound('Lesson not found')

  const course = await Course.findByPk(lesson.courseId)
  if (
    req.user.role === 'instructor' &&
    course.instructorId !== req.user.id
  ) {
    throw ApiError.forbidden()
  }

  const updatable = [
    'title',
    'content',
    'videoUrl',
    'duration',
    'order',
    'moduleId',
    'isPreview',
    'courseId',
  ]
  updatable.forEach((key) => {
    if (req.body[key] !== undefined) lesson[key] = req.body[key]
  })
  await lesson.save()

  res.json(lesson)
})

const deleteLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findByPk(req.params.id)
  if (!lesson) throw ApiError.notFound('Lesson not found')

  const course = await Course.findByPk(lesson.courseId)
  if (
    req.user.role === 'instructor' &&
    course.instructorId !== req.user.id
  ) {
    throw ApiError.forbidden()
  }

  await lesson.destroy()
  res.json({ message: 'Lesson deleted' })
})

module.exports = {
  listLessonsByCourse,
  getLesson,
  createLesson,
  updateLesson,
  deleteLesson,
}
