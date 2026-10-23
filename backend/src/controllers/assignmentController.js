/**
 * assignmentController — assignment lifecycle and grading.
 *
 * Instructors create assignments for their courses; students submit; the
 * grade flow writes grade + feedback and flips the submission status.
 */
const { Op } = require('sequelize')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const { Assignment, Submission, Course, User } = require('../models')

const assertOwnsCourse = async (courseId, user) => {
  if (user.role === 'admin') return
  const course = await Course.findByPk(courseId)
  if (!course) throw ApiError.notFound('Course not found')
  if (user.role === 'instructor' && course.instructorId !== user.id) {
    throw ApiError.forbidden('You can only manage your own courses')
  }
}

// List assignments (instructor: their courses; admin: all; student: enrolled).
const listAssignments = asyncHandler(async (req, res) => {
  const { courseId } = req.query
  const where = {}
  if (courseId) where.courseId = Number(courseId)

  if (req.user.role === 'instructor') {
    const courseIds = (
      await Course.findAll({
        where: { instructorId: req.user.id },
        attributes: ['id'],
      })
    ).map((c) => c.id)
    where.courseId = { [Op.in]: courseIds }
  }

  const assignments = await Assignment.findAll({
    where,
    include: [{ model: Course, as: 'course', attributes: ['id', 'title'] }],
  })
  res.json(assignments)
})

const getAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.id)
  if (!assignment) throw ApiError.notFound('Assignment not found')
  res.json(assignment)
})

const createAssignment = asyncHandler(async (req, res) => {
  await assertOwnsCourse(req.body.courseId, req.user)
  const assignment = await Assignment.create(req.body)
  res.status(201).json(assignment)
})

const updateAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.id)
  if (!assignment) throw ApiError.notFound('Assignment not found')
  await assertOwnsCourse(assignment.courseId, req.user)

  const updatable = [
    'title',
    'description',
    'dueDate',
    'totalMarks',
    'lessonId',
  ]
  updatable.forEach((k) => {
    if (req.body[k] !== undefined) assignment[k] = req.body[k]
  })
  await assignment.save()
  res.json(assignment)
})

const deleteAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.id)
  if (!assignment) throw ApiError.notFound('Assignment not found')
  await assertOwnsCourse(assignment.courseId, req.user)

  await assignment.destroy()
  res.json({ message: 'Assignment deleted' })
})

// Student: submit work for an assignment.
const submitAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.id)
  if (!assignment) throw ApiError.notFound('Assignment not found')

  const { content, fileUrl } = req.body
  const isLate = assignment.dueDate && new Date() > new Date(assignment.dueDate)

  const [submission, created] = await Submission.findOrCreate({
    where: { assignmentId: assignment.id, studentId: req.user.id },
    defaults: {
      assignmentId: assignment.id,
      studentId: req.user.id,
      content,
      fileUrl,
      status: isLate ? 'late' : 'submitted',
      submittedAt: new Date(),
    },
  })

  if (!created) {
    submission.content = content ?? submission.content
    submission.fileUrl = fileUrl ?? submission.fileUrl
    submission.status = isLate ? 'late' : 'resubmitted'
    submission.submittedAt = new Date()
    submission.gradedAt = null
    submission.grade = null
    await submission.save()
  }

  res.status(created ? 201 : 200).json(submission)
})

// Instructor: grade a submission.
const gradeSubmission = asyncHandler(async (req, res) => {
  const submission = await Submission.findByPk(req.params.id, {
    include: [{ model: Assignment, as: 'assignment' }],
  })
  if (!submission) throw ApiError.notFound('Submission not found')

  await assertOwnsCourse(submission.assignment.courseId, req.user)

  const { grade, feedback } = req.body
  if (grade !== undefined) submission.grade = grade
  if (feedback !== undefined) submission.feedback = feedback
  submission.status = 'graded'
  submission.gradedAt = new Date()
  await submission.save()

  res.json(submission)
})

// Instructor: list submissions for their assignments (optionally by assignment).
const listSubmissions = asyncHandler(async (req, res) => {
  const { assignmentId } = req.query
  const where = {}
  if (assignmentId) where.assignmentId = Number(assignmentId)

  if (req.user.role === 'instructor') {
    const courseIds = (
      await Course.findAll({
        where: { instructorId: req.user.id },
        attributes: ['id'],
      })
    ).map((c) => c.id)
    const assignmentIds = (
      await Assignment.findAll({
        where: { courseId: { [Op.in]: courseIds } },
        attributes: ['id'],
      })
    ).map((a) => a.id)
    where.assignmentId = { [Op.in]: assignmentIds }
  } else if (req.user.role === 'student') {
    where.studentId = req.user.id
  }

  const submissions = await Submission.findAll({
    where,
    include: [
      { model: Assignment, as: 'assignment', attributes: ['id', 'title', 'totalMarks'] },
      { model: User, as: 'student', attributes: ['id', 'firstName', 'lastName', 'email'] },
    ],
  })
  res.json(submissions)
})

// Instructor: grade a submission identified by assignment + (submissionId or
// studentId). Used by PUT /instructor/assignments/:assignmentId/grade.
const gradeByAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.assignmentId)
  if (!assignment) throw ApiError.notFound('Assignment not found')
  await assertOwnsCourse(assignment.courseId, req.user)

  const { submissionId, studentId, grade, feedback } = req.body

  const where = { assignmentId: assignment.id }
  if (submissionId) where.id = Number(submissionId)
  else if (studentId) where.studentId = Number(studentId)
  else throw ApiError.badRequest('submissionId or studentId is required')

  const submission = await Submission.findOne({ where })
  if (!submission) throw ApiError.notFound('Submission not found')

  if (grade !== undefined) submission.grade = grade
  if (feedback !== undefined) submission.feedback = feedback
  submission.status = 'graded'
  submission.gradedAt = new Date()
  await submission.save()

  res.json(submission)
})

module.exports = {
  listAssignments,
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  gradeSubmission,
  gradeByAssignment,
  listSubmissions,
}
