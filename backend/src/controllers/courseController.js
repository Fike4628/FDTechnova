/**
 * courseController — public browse, self-enroll, and admin CRUD for courses.
 *
 * The public list supports the filters the frontend `courseService` sends
 * (featured, search, category, level, price, page, limit) and returns either
 * a plain array (small/featured) or a paginated { courses, totalPages, ... }
 * envelope that `useCourses` knows how to consume.
 */
const { Op } = require('sequelize')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const slugify = require('../utils/slugify')
const {
  Course,
  Category,
  User,
  InstructorProfile,
  Module,
  Lesson,
  LearningMaterial,
  Enrollment,
} = require('../models')

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 12

const buildWhere = (query, { includeDrafts = false } = {}) => {
  const where = {}

  // Drafts/archived are hidden from the public catalog unless an admin asks.
  if (!includeDrafts) where.status = 'published'

  if (query.featured === 'true' || query.featured === true) {
    where.featured = true
  }
  if (query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${query.search}%` } },
      { shortDescription: { [Op.iLike]: `%${query.search}%` } },
      { description: { [Op.iLike]: `%${query.search}%` } },
    ]
  }
  if (query.level) where.level = query.level
  if (query.category) where.categoryId = Number(query.category)
  if (query.price) {
    // price=free => price = 0, else a numeric upper bound
    if (query.price === 'free') where.price = 0
    else where.price = { [Op.lte]: Number(query.price) }
  }
  if (query.status) where.status = query.status

  return where
}

const courseIncludes = () => [
  { model: Category, as: 'category', attributes: ['id', 'name', 'slug'] },
  {
    model: User,
    as: 'instructor',
    attributes: ['id', 'firstName', 'lastName', 'avatar'],
    include: [
      {
        model: InstructorProfile,
        as: 'instructorProfile',
        attributes: ['title', 'bio', 'expertise'],
      },
    ],
  },
]

// ── Public: list with filters + pagination ─────────────────────
const listCourses = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || DEFAULT_PAGE, 1)
  const limit = Math.max(parseInt(req.query.limit, 10) || DEFAULT_LIMIT, 1)
  const offset = (page - 1) * limit
  const featuredOnly = req.query.featured !== undefined

  const where = buildWhere(req.query)
  const include = courseIncludes()

  // A pure "featured" request without pagination returns a flat array, which
  // is convenient for a homepage carousel.
  if (featuredOnly && req.query.page === undefined && req.query.limit !== undefined) {
    const courses = await Course.findAll({ where, include, limit })
    return res.json(courses)
  }

  const { rows: courses, count: total } = await Course.findAndCountAll({
    where,
    include,
    limit,
    offset,
    distinct: true,
    order: [['created_at', 'DESC']],
  })

  res.json({
    courses,
    total,
    page,
    totalPages: Math.ceil(total / limit) || 1,
  })
})

// ── Public: single course with full relations ──────────────────
const getCourse = asyncHandler(async (req, res) => {
  const idOrSlug = req.params.id
  const isNumeric = /^\d+$/.test(idOrSlug)
  const where = isNumeric ? { id: Number(idOrSlug) } : { slug: idOrSlug }

  const course = await Course.findOne({
    where,
    include: [
      ...courseIncludes(),
      {
        model: Module,
        as: 'modules',
        separate: true,
        order: [['order', 'ASC']],
        include: [
          {
            model: Lesson,
            as: 'lessons',
            separate: true,
            order: [['order', 'ASC']],
            include: [{ model: LearningMaterial, as: 'materials' }],
          },
        ],
      },
      { model: Lesson, as: 'lessons', where: { moduleId: null }, required: false },
    ],
  })

  if (!course) throw ApiError.notFound('Course not found')

  // Only published courses are public; drafts/archived need admin auth.
  if (course.status !== 'published' && req.user?.role !== 'admin') {
    throw ApiError.notFound('Course not found')
  }

  res.json(course)
})

// ── Student: enroll self in a course ───────────────────────────
const enrollInCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id)
  if (!course) throw ApiError.notFound('Course not found')
  if (course.status !== 'published') {
    throw ApiError.badRequest('This course is not available for enrollment')
  }

  const studentId = req.user.id
  const [enrollment, created] = await Enrollment.findOrCreate({
    where: { studentId, courseId: course.id },
    defaults: { studentId, courseId: course.id, status: 'active' },
  })

  if (!created && enrollment.status === 'cancelled') {
    enrollment.status = 'active'
    enrollment.progress = 0
    await enrollment.save()
  }

  res.status(created ? 201 : 200).json(enrollment)
})

// ── Admin: list all courses (incl. drafts) ─────────────────────
const adminListCourses = asyncHandler(async (req, res) => {
  const where = buildWhere(req.query, { includeDrafts: true })
  const include = courseIncludes()
  const courses = await Course.findAll({ where, include })
  res.json(courses)
})

const adminGetCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    include: [...courseIncludes(), { model: Module, as: 'modules' }],
  })
  if (!course) throw ApiError.notFound('Course not found')
  res.json(course)
})

const adminCreateCourse = asyncHandler(async (req, res) => {
  const {
    title,
    slug,
    description,
    shortDescription,
    price = 0,
    level = 'beginner',
    language,
    imageUrl,
    featured = false,
    status = 'draft',
    instructorId,
    categoryId,
    durationHours,
  } = req.body

  const course = await Course.create({
    title,
    slug: slug || slugify(title, { lower: true, strict: true }),
    description,
    shortDescription,
    price,
    level,
    language,
    imageUrl,
    featured,
    status,
    instructorId: instructorId || req.user.id,
    categoryId,
    durationHours,
  })

  res.status(201).json(course)
})

const adminUpdateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id)
  if (!course) throw ApiError.notFound('Course not found')

  const updatable = [
    'title',
    'slug',
    'description',
    'shortDescription',
    'price',
    'level',
    'language',
    'imageUrl',
    'featured',
    'status',
    'instructorId',
    'categoryId',
    'durationHours',
  ]
  updatable.forEach((key) => {
    if (req.body[key] !== undefined) course[key] = req.body[key]
  })
  if (req.body.title && !req.body.slug) {
    course.slug = slugify(req.body.title, { lower: true, strict: true })
  }

  await course.save()
  res.json(course)
})

const adminDeleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id)
  if (!course) throw ApiError.notFound('Course not found')

  const enrollmentCount = await Enrollment.count({
    where: { courseId: course.id },
  })
  if (enrollmentCount > 0) {
    // Soft-delete via archive instead of breaking history.
    course.status = 'archived'
    await course.save()
    return res.json({ message: 'Course archived (has active enrollments)' })
  }

  await course.destroy()
  res.json({ message: 'Course deleted' })
})

// ── Instructor: list their own courses (with enrollment counts) ──
const listOwnCourses = asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    where: { instructorId: req.user.id },
    include: [
      { model: Category, as: 'category', attributes: ['id', 'name', 'slug'] },
      { model: Enrollment, as: 'enrollments', attributes: ['id', 'status'] },
    ],
    order: [['created_at', 'DESC']],
  })

  const withStats = courses.map((c) => {
    const enrollments = c.enrollments || []
    return {
      ...c.get({ plain: true }),
      enrollmentCount: enrollments.length,
      activeEnrollments: enrollments.filter((e) => e.status === 'active')
        .length,
    }
  })

  res.json(withStats)
})

module.exports = {
  listCourses,
  getCourse,
  enrollInCourse,
  listOwnCourses,
  adminListCourses,
  adminGetCourse,
  adminCreateCourse,
  adminUpdateCourse,
  adminDeleteCourse,
}
