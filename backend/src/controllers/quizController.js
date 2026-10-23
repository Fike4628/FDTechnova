/**
 * quizController — quiz CRUD + student attempts.
 *
 * Questions are stored as JSON. The attempt handler computes a score by
 * comparing the student's selected option ids against each question's
 * `options[].correct` flags, then derives `passed` from the quiz passScore.
 */
const { Op } = require('sequelize')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const { Quiz, QuizAttempt, Course, Lesson } = require('../models')

const listQuizzes = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.query
  const where = {}
  if (courseId) where.courseId = Number(courseId)
  if (lessonId) where.lessonId = Number(lessonId)

  const quizzes = await Quiz.findAll({
    where,
    include: [{ model: Course, as: 'course', attributes: ['id', 'title'] }],
  })
  res.json(quizzes)
})

const getQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id)
  if (!quiz) throw ApiError.notFound('Quiz not found')
  res.json(quiz)
})

const createQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.create(req.body)
  res.status(201).json(quiz)
})

const updateQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id)
  if (!quiz) throw ApiError.notFound('Quiz not found')

  const updatable = ['title', 'description', 'questions', 'passScore', 'lessonId']
  updatable.forEach((k) => {
    if (req.body[k] !== undefined) quiz[k] = req.body[k]
  })
  await quiz.save()
  res.json(quiz)
})

const deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id)
  if (!quiz) throw ApiError.notFound('Quiz not found')
  await quiz.destroy()
  res.json({ message: 'Quiz deleted' })
})

/**
 * Score an attempt. `answers` shape:
 *   [{ questionId, selectedOptions: [optionId, ...] }]
 * Correct answers come from question.options where option.correct === true.
 */
function scoreAttempt(questions, answers) {
  let earned = 0
  let possible = 0
  const answerMap = new Map(
    (answers || []).map((a) => [String(a.questionId), a.selectedOptions || []])
  )

  for (const q of questions || []) {
    const points = q.points || 1
    possible += points
    const correct = (q.options || [])
      .filter((o) => o.correct)
      .map((o) => String(o.id))
      .sort()
    const selected = (answerMap.get(String(q.id)) || [])
      .map(String)
      .sort()
    const isCorrect =
      correct.length > 0 &&
      correct.length === selected.length &&
      correct.every((id) => selected.includes(id))
    if (isCorrect) earned += points
  }

  const percentage = possible > 0 ? Math.round((earned / possible) * 1000) / 10 : 0
  return { earned, possible, percentage }
}

const submitAttempt = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id)
  if (!quiz) throw ApiError.notFound('Quiz not found')

  const { answers } = req.body
  const { earned, possible, percentage } = scoreAttempt(quiz.questions, answers)

  const attempt = await QuizAttempt.create({
    quizId: quiz.id,
    studentId: req.user.id,
    score: earned,
    total: possible,
    percentage,
    passed: percentage >= quiz.passScore,
    answers,
    completedAt: new Date(),
  })

  res.status(201).json(attempt)
})

// Student: own attempt history for a quiz.
const listAttempts = asyncHandler(async (req, res) => {
  const where = { quizId: Number(req.params.id) }
  if (req.user.role === 'student') where.studentId = req.user.id

  const attempts = await QuizAttempt.findAll({
    where,
    order: [['created_at', 'DESC']],
  })
  res.json(attempts)
})

module.exports = {
  listQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitAttempt,
  listAttempts,
}
