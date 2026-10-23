/**
 * userController — user listing + profile management.
 *
 * Admins list/search users; anyone can read their own profile; users update
 * their own profile (and role-specific profile row). Deactivation is admin-only.
 */
const { Op } = require('sequelize')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const {
  User,
  StudentProfile,
  InstructorProfile,
  Enrollment,
  Course,
} = require('../models')

// Public: directory of instructors (with profile) for the landing page.
const listInstructors = asyncHandler(async (req, res) => {
  const instructors = await User.findAll({
    where: { role: 'instructor', isActive: true },
    attributes: ['id', 'firstName', 'lastName', 'avatar'],
    include: [
      {
        model: InstructorProfile,
        as: 'instructorProfile',
        attributes: ['title', 'bio', 'expertise', 'yearsOfExperience'],
      },
    ],
  })
  res.json(instructors)
})

// Admin: list users, optionally filtered by role or search term.
const listUsers = asyncHandler(async (req, res) => {
  const { role, search, isActive } = req.query

  const where = {}
  if (role) where.role = role
  if (typeof isActive !== 'undefined') {
    where.isActive = isActive === 'true'
  }
  if (search) {
    where[Op.or] = [
      { firstName: { [Op.iLike]: `%${search}%` } },
      { lastName: { [Op.iLike]: `%${search}%` } },
      { email: { [Op.iLike]: `%${search}%` } },
    ]
  }

  const users = await User.findAll({ where })
  res.json(users)
})

// Admin / self: fetch a single user.
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (!user) throw ApiError.notFound('User not found')

  let profile = null
  if (user.role === 'student') {
    profile = await StudentProfile.findOne({ where: { userId: user.id } })
  } else if (user.role === 'instructor') {
    profile = await InstructorProfile.findOne({ where: { userId: user.id } })
  }

  res.json({ user, profile })
})

// Self-service profile update (writes both User + role profile).
const updateProfile = asyncHandler(async (req, res) => {
  const id = Number(req.params.id)
  const requester = req.user

  // Users may only edit themselves unless they're an admin.
  if (requester.role !== 'admin' && requester.id !== id) {
    throw ApiError.forbidden('You can only edit your own profile')
  }

  const { firstName, lastName, phone, avatar, ...profileFields } = req.body

  const user = await User.findByPk(id)
  if (!user) throw ApiError.notFound('User not found')

  if (firstName !== undefined) user.firstName = firstName
  if (lastName !== undefined) user.lastName = lastName
  if (phone !== undefined) user.phone = phone
  if (avatar !== undefined) user.avatar = avatar
  await user.save()

  if (user.role === 'student') {
    const [profile] = await StudentProfile.findOrCreate({ where: { userId: id } })
    await profile.update(profileFields)
  } else if (user.role === 'instructor') {
    const [profile] = await InstructorProfile.findOrCreate({
      where: { userId: id },
    })
    await profile.update(profileFields)
  }

  const fresh = await User.findByPk(id)
  res.json(fresh)
})

// Admin: deactivate (soft) a user account.
const deactivateUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (!user) throw ApiError.notFound('User not found')
  if (user.role === 'admin' && user.id === req.user.id) {
    throw ApiError.badRequest('You cannot deactivate your own admin account')
  }

  user.isActive = false
  await user.save()
  res.json({ message: 'User deactivated', user })
})

// Admin: reactivate a user account.
const activateUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (!user) throw ApiError.notFound('User not found')

  user.isActive = true
  await user.save()
  res.json({ message: 'User activated', user })
})

// Self-service: update the signed-in user's own profile (no :id in URL).
// Used by the /student/profile and /instructor/profile role routes.
const updateProfileSelf = asyncHandler(async (req, res) => {
  req.params.id = String(req.user.id)
  return updateProfile(req, res)
})

// Admin: list all students with their student profile.
const listStudents = asyncHandler(async (req, res) => {
  const { search, isActive } = req.query
  const where = { role: 'student' }
  if (typeof isActive !== 'undefined') where.isActive = isActive === 'true'
  if (search) {
    where[Op.or] = [
      { firstName: { [Op.iLike]: `%${search}%` } },
      { lastName: { [Op.iLike]: `%${search}%` } },
      { email: { [Op.iLike]: `%${search}%` } },
    ]
  }

  const students = await User.findAll({
    where,
    include: [{ model: StudentProfile, as: 'studentProfile' }],
  })
  res.json(students)
})

// Instructor: list distinct students enrolled in their courses.
const listInstructorStudents = asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    where: { instructorId: req.user.id },
    attributes: ['id'],
  })
  const courseIds = courses.map((c) => c.id)

  const enrollments = await Enrollment.findAll({
    where: { courseId: { [Op.in]: courseIds } },
    attributes: ['studentId', 'courseId', 'status', 'progress'],
    include: [
      {
        model: User,
        as: 'student',
        attributes: ['id', 'firstName', 'lastName', 'email', 'avatar'],
        include: [{ model: StudentProfile, as: 'studentProfile' }],
      },
      { model: Course, as: 'course', attributes: ['id', 'title'] },
    ],
  })
  res.json(enrollments)
})

module.exports = {
  listInstructors,
  listUsers,
  listStudents,
  listInstructorStudents,
  getUser,
  updateProfile,
  updateProfileSelf,
  deactivateUser,
  activateUser,
}
