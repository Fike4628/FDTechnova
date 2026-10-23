/**
 * dashboardController — role-scoped aggregations for the three dashboards.
 *
 * Admins get platform-wide stats + recent activity. Instructors get their
 * courses/students/grading queue. Students get progress, upcoming work and
 * results. All read-only and cheap (counts + small fetches).
 */
const { Op, fn, col, literal } = require('sequelize')
const asyncHandler = require('../utils/asyncHandler')
const {
  User,
  Course,
  Enrollment,
  Assignment,
  Submission,
  Quiz,
  QuizAttempt,
  Schedule,
  Notification,
  Payment,
  Category,
} = require('../models')

// ── Admin ──────────────────────────────────────────────
const adminDashboard = asyncHandler(async (req, res) => {
  const [
    studentsCount,
    instructorsCount,
    coursesCount,
    publishedCourses,
    enrollmentsCount,
    revenue,
  ] = await Promise.all([
    User.count({ where: { role: 'student' } }),
    User.count({ where: { role: 'instructor' } }),
    Course.count(),
    Course.count({ where: { status: 'published' } }),
    Enrollment.count(),
    Payment.sum('amount', { where: { status: 'completed' } }),
  ])

  const recentEnrollments = await Enrollment.findAll({
    limit: 5,
    order: [['created_at', 'DESC']],
    include: [
      { model: User, as: 'student', attributes: ['id', 'firstName', 'lastName'] },
      { model: Course, as: 'course', attributes: ['id', 'title'] },
    ],
  })

  res.json({
    stats: {
      students: studentsCount,
      instructors: instructorsCount,
      courses: coursesCount,
      publishedCourses,
      enrollments: enrollmentsCount,
      revenue: Number(revenue) || 0,
    },
    recentEnrollments,
  })
})

// ── Instructor ────────────────────────────────────────
const instructorDashboard = asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    where: { instructorId: req.user.id },
    attributes: ['id'],
  })
  const courseIds = courses.map((c) => c.id)

  const [coursesCount, studentsCount, pendingGrading, completedPayments] =
    await Promise.all([
      Course.count({ where: { instructorId: req.user.id } }),
      Enrollment.count({ where: { courseId: { [Op.in]: courseIds } } }),
      Submission.count({
        where: { status: ['submitted', 'late', 'resubmitted'] },
        include: [
          {
            model: Assignment,
            as: 'assignment',
            where: { courseId: { [Op.in]: courseIds } },
            required: true,
          },
        ],
      }),
      Enrollment.count({
        where: { courseId: { [Op.in]: courseIds }, status: 'completed' },
      }),
    ])

  const myCourses = await Course.findAll({
    where: { instructorId: req.user.id },
    include: ['category'],
    order: [['created_at', 'DESC']],
  })

  res.json({
    stats: {
      courses: coursesCount,
      students: studentsCount,
      pendingGrading,
      completedCourses: completedPayments,
    },
    courses: myCourses,
  })
})

// ── Student ───────────────────────────────────────────
const studentDashboard = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.findAll({
    where: { studentId: req.user.id },
    include: [{ model: Course, as: 'course', attributes: ['id', 'title', 'slug', 'imageUrl', 'level'] }],
  })

  const activeEnrollments = enrollments.filter((e) => e.status === 'active')
  const completedEnrollments = enrollments.filter((e) => e.status === 'completed')
  const avgProgress =
    activeEnrollments.length > 0
      ? Math.round(
          activeEnrollments.reduce((sum, e) => sum + e.progress, 0) /
            activeEnrollments.length
        )
      : 0

  const courseIds = enrollments.map((e) => e.courseId)
  const upcomingAssignments = await Assignment.findAll({
    where: {
      courseId: { [Op.in]: courseIds },
      dueDate: { [Op.gte]: new Date() },
    },
    include: [{ model: Course, as: 'course', attributes: ['id', 'title'] }],
    order: [['dueDate', 'ASC']],
    limit: 5,
  })

  const recentResults = await QuizAttempt.findAll({
    where: { studentId: req.user.id },
    order: [['created_at', 'DESC']],
    limit: 5,
    include: [{ model: Quiz, as: 'quiz', attributes: ['id', 'title', 'passScore'] }],
  })

  const unreadNotifications = await Notification.count({
    where: { userId: req.user.id, isRead: false },
  })

  res.json({
    stats: {
      activeCourses: activeEnrollments.length,
      completedCourses: completedEnrollments.length,
      averageProgress: avgProgress,
      unreadNotifications,
    },
    enrollments,
    upcomingAssignments,
    recentResults,
  })
})

// ── Admin reports (charts for the Reports page) ───────
const adminReports = asyncHandler(async (req, res) => {
  const [
    totalStudents,
    totalInstructors,
    totalCourses,
    totalEnrollments,
    totalRevenue,
  ] = await Promise.all([
    User.count({ where: { role: 'student' } }),
    User.count({ where: { role: 'instructor' } }),
    Course.count(),
    Enrollment.count(),
    Payment.sum('amount', { where: { status: 'completed' } }),
  ])

  // Enrollments per course — group without join, then attach course titles.
  const enrollmentsPerCourseRaw = await Enrollment.findAll({
    attributes: ['courseId', [fn('COUNT', col('Enrollment.id')), 'count']],
    group: ['courseId'],
    raw: true,
  })
  const courseIds = enrollmentsPerCourseRaw.map((r) => r.courseId)
  const courseTitles = courseIds.length
    ? await Course.findAll({
        where: { id: courseIds },
        attributes: ['id', 'title'],
        raw: true,
      })
    : []
  const courseTitleMap = new Map(courseTitles.map((c) => [c.id, c.title]))
  const enrollmentsPerCourse = enrollmentsPerCourseRaw.map((r) => ({
    courseId: r.courseId,
    courseTitle: courseTitleMap.get(r.courseId) || null,
    count: Number(r.count),
  }))

  // Courses per category — group without join, then attach category names.
  const coursesByCategoryRaw = await Course.findAll({
    attributes: ['categoryId', [fn('COUNT', col('Course.id')), 'count']],
    where: { categoryId: { [Op.not]: null } },
    group: ['categoryId'],
    raw: true,
  })
  const catIds = coursesByCategoryRaw.map((r) => r.categoryId).filter(Boolean)
  const categories = catIds.length
    ? await Category.findAll({
        where: { id: catIds },
        attributes: ['id', 'name'],
        raw: true,
      })
    : []
  const catNameMap = new Map(categories.map((c) => [c.id, c.name]))
  const coursesByCategory = coursesByCategoryRaw.map((r) => ({
    categoryId: r.categoryId,
    categoryName: catNameMap.get(r.categoryId) || null,
    count: Number(r.count),
  }))

  // Monthly enrollment trend (last 6 months).
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  const monthlyTrend = await Enrollment.findAll({
    attributes: [
      [fn('DATE_TRUNC', 'month', col('Enrollment.created_at')), 'month'],
      [fn('COUNT', col('Enrollment.id')), 'count'],
    ],
    where: literal(`"Enrollment"."created_at" >= '${sixMonthsAgo.toISOString()}'`),
    group: [fn('DATE_TRUNC', 'month', col('Enrollment.created_at'))],
    order: [[fn('DATE_TRUNC', 'month', col('Enrollment.created_at')), 'ASC']],
    raw: true,
  })

  res.json({
    totals: {
      students: totalStudents,
      instructors: totalInstructors,
      courses: totalCourses,
      enrollments: totalEnrollments,
      revenue: Number(totalRevenue) || 0,
    },
    enrollmentsPerCourse,
    coursesByCategory,
    monthlyTrend,
  })
})

// ── Student area endpoints (/student/courses, /assignments, /results) ──

// Enrolled courses with progress.
const studentCourses = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.findAll({
    where: { studentId: req.user.id },
    include: [
      {
        model: Course,
        as: 'course',
        attributes: ['id', 'title', 'slug', 'imageUrl', 'level', 'price'],
        include: [{ model: User, as: 'instructor', attributes: ['id', 'firstName', 'lastName'] }],
      },
    ],
  })
  res.json(enrollments)
})

// Assignments for the student's enrolled courses, with their submission state.
const studentAssignments = asyncHandler(async (req, res) => {
  const courseIds = (
    await Enrollment.findAll({
      where: { studentId: req.user.id, status: ['active', 'completed'] },
      attributes: ['courseId'],
    })
  ).map((e) => e.courseId)

  const assignments = await Assignment.findAll({
    where: { courseId: { [Op.in]: courseIds } },
    include: [{ model: Course, as: 'course', attributes: ['id', 'title'] }],
    order: [['dueDate', 'ASC']],
  })

  const submissions = await Submission.findAll({
    where: { studentId: req.user.id },
    attributes: ['assignmentId', 'status', 'grade', 'submittedAt'],
  })
  const submissionMap = new Map(submissions.map((s) => [s.assignmentId, s]))

  const withState = assignments.map((a) => ({
    ...a.get({ plain: true }),
    submission: submissionMap.get(a.id) || null,
  }))
  res.json(withState)
})

// Quiz attempts + graded submissions for the student (their results).
// Returns a flat array matching what MyResults.jsx expects:
//   [{ id, type, title, courseName, score, maxScore, grade, date }]
const studentResults = asyncHandler(async (req, res) => {
  const [quizAttempts, gradedSubmissions] = await Promise.all([
    QuizAttempt.findAll({
      where: { studentId: req.user.id },
      include: [
        {
          model: Quiz,
          as: 'quiz',
          attributes: ['id', 'title', 'passScore'],
          include: [{ model: Course, as: 'course', attributes: ['id', 'title'] }],
        },
      ],
      order: [['created_at', 'DESC']],
    }),
    Submission.findAll({
      where: { studentId: req.user.id, status: 'graded' },
      include: [
        {
          model: Assignment,
          as: 'assignment',
          attributes: ['id', 'title', 'totalMarks'],
          include: [{ model: Course, as: 'course', attributes: ['id', 'title'] }],
        },
      ],
      order: [['gradedAt', 'DESC']],
    }),
  ])

  // Flatten into a unified results array.
  const quizRows = quizAttempts.map((a) => ({
    id: `quiz-${a.id}`,
    type: 'quiz',
    assignmentTitle: a.quiz?.title ?? 'Quiz',
    courseName: a.quiz?.course?.title ?? '—',
    score: a.score,
    maxScore: a.total,
    grade: a.passed ? 'Pass' : 'Fail',
    percentage: a.percentage,
    date: a.completedAt || a.createdAt,
  }))

  const submissionRows = gradedSubmissions.map((s) => {
    const marks = s.assignment?.totalMarks || 100
    const earned = Number(s.grade) || 0
    const pct = marks > 0 ? Math.round((earned / marks) * 100) : 0
    const gradeLabel =
      pct >= 90 ? 'A' : pct >= 80 ? 'B' : pct >= 70 ? 'C' : pct >= 60 ? 'D' : 'F'
    return {
      id: `sub-${s.id}`,
      type: 'assignment',
      assignmentTitle: s.assignment?.title ?? 'Assignment',
      courseName: s.assignment?.course?.title ?? '—',
      score: earned,
      maxScore: marks,
      grade: gradeLabel,
      percentage: pct,
      date: s.gradedAt || s.createdAt,
    }
  })

  const results = [...submissionRows, ...quizRows].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  res.json(results)
})

module.exports = {
  adminDashboard,
  instructorDashboard,
  studentDashboard,
  studentCourses,
  studentAssignments,
  studentResults,
  adminReports,
}
