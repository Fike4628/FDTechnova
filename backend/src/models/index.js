/**
 * models/index.js — single registry for the model layer.
 *
 * Imports every model, wires up associations in one place (so ownership is
 * easy to read) and re-exports `{ sequelize, Sequelize, ...models }`.
 *
 * Controllers/services import from here rather than individual files so the
 * association graph is always initialised before any query runs.
 */
const sequelize = require('../config/database')
const { Sequelize } = require('sequelize')

const User = require('./User')
const StudentProfile = require('./StudentProfile')
const InstructorProfile = require('./InstructorProfile')
const Category = require('./Category')
const Course = require('./Course')
const Module = require('./Module')
const Lesson = require('./Lesson')
const LearningMaterial = require('./LearningMaterial')
const Enrollment = require('./Enrollment')
const Assignment = require('./Assignment')
const Submission = require('./Submission')
const Quiz = require('./Quiz')
const QuizAttempt = require('./QuizAttempt')
const Attendance = require('./Attendance')
const Schedule = require('./Schedule')
const Notification = require('./Notification')
const Payment = require('./Payment')

const db = {
  sequelize,
  Sequelize,
  User,
  StudentProfile,
  InstructorProfile,
  Category,
  Course,
  Module,
  Lesson,
  LearningMaterial,
  Enrollment,
  Assignment,
  Submission,
  Quiz,
  QuizAttempt,
  Attendance,
  Schedule,
  Notification,
  Payment,
}

// ── User <-> profiles (1:1) ────────────────────────────
User.hasOne(StudentProfile, { foreignKey: 'userId', as: 'studentProfile' })
StudentProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' })

User.hasOne(InstructorProfile, {
  foreignKey: 'userId',
  as: 'instructorProfile',
})
InstructorProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' })

// ── Category <-> Course (1:N) ──────────────────────────
Category.hasMany(Course, { foreignKey: 'categoryId', as: 'courses' })
Course.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' })

// ── Instructor (User) <-> Course (1:N) ────────────────
User.hasMany(Course, { foreignKey: 'instructorId', as: 'teachingCourses' })
Course.belongsTo(User, {
  foreignKey: 'instructorId',
  as: 'instructor',
})

// ── Course <-> Module <-> Lesson ──────────────────────
Course.hasMany(Module, { foreignKey: 'courseId', as: 'modules' })
Module.belongsTo(Course, { foreignKey: 'courseId', as: 'course' })

Module.hasMany(Lesson, { foreignKey: 'moduleId', as: 'lessons' })
Lesson.belongsTo(Module, { foreignKey: 'moduleId', as: 'module' })

Course.hasMany(Lesson, { foreignKey: 'courseId', as: 'lessons' })
Lesson.belongsTo(Course, { foreignKey: 'courseId', as: 'course' })

// ── Lesson <-> LearningMaterial (1:N) ──────────────────
Lesson.hasMany(LearningMaterial, {
  foreignKey: 'lessonId',
  as: 'materials',
})
LearningMaterial.belongsTo(Lesson, { foreignKey: 'lessonId', as: 'lesson' })

// ── Enrollment: User (student) <-> Course (N:M via Enrollment) ──
User.hasMany(Enrollment, { foreignKey: 'studentId', as: 'enrollments' })
Enrollment.belongsTo(User, { foreignKey: 'studentId', as: 'student' })

Course.hasMany(Enrollment, { foreignKey: 'courseId', as: 'enrollments' })
Enrollment.belongsTo(Course, { foreignKey: 'courseId', as: 'course' })

// Student -> enrolled courses (through enrollments)
User.belongsToMany(Course, {
  through: Enrollment,
  foreignKey: 'studentId',
  otherKey: 'courseId',
  as: 'enrolledCourses',
})
Course.belongsToMany(User, {
  through: Enrollment,
  foreignKey: 'courseId',
  otherKey: 'studentId',
  as: 'students',
})

// ── Assignment <-> Submission ─────────────────────────
Course.hasMany(Assignment, { foreignKey: 'courseId', as: 'assignments' })
Assignment.belongsTo(Course, { foreignKey: 'courseId', as: 'course' })
Assignment.belongsTo(Lesson, { foreignKey: 'lessonId', as: 'lesson' })
Lesson.hasMany(Assignment, { foreignKey: 'lessonId', as: 'assignments' })

Assignment.hasMany(Submission, {
  foreignKey: 'assignmentId',
  as: 'submissions',
})
Submission.belongsTo(Assignment, {
  foreignKey: 'assignmentId',
  as: 'assignment',
})

User.hasMany(Submission, { foreignKey: 'studentId', as: 'submissions' })
Submission.belongsTo(User, { foreignKey: 'studentId', as: 'student' })

// ── Quiz <-> QuizAttempt ──────────────────────────────
Course.hasMany(Quiz, { foreignKey: 'courseId', as: 'quizzes' })
Quiz.belongsTo(Course, { foreignKey: 'courseId', as: 'course' })
Quiz.belongsTo(Lesson, { foreignKey: 'lessonId', as: 'lesson' })
Lesson.hasMany(Quiz, { foreignKey: 'lessonId', as: 'quizzes' })

Quiz.hasMany(QuizAttempt, { foreignKey: 'quizId', as: 'attempts' })
QuizAttempt.belongsTo(Quiz, { foreignKey: 'quizId', as: 'quiz' })
User.hasMany(QuizAttempt, { foreignKey: 'studentId', as: 'quizAttempts' })
QuizAttempt.belongsTo(User, { foreignKey: 'studentId', as: 'student' })

// ── Schedule <-> Attendance ──────────────────────────
Course.hasMany(Schedule, { foreignKey: 'courseId', as: 'schedules' })
Schedule.belongsTo(Course, { foreignKey: 'courseId', as: 'course' })

Course.hasMany(Attendance, { foreignKey: 'courseId', as: 'attendance' })
Attendance.belongsTo(Course, { foreignKey: 'courseId', as: 'course' })

Schedule.hasMany(Attendance, { foreignKey: 'scheduleId', as: 'attendance' })
Attendance.belongsTo(Schedule, { foreignKey: 'scheduleId', as: 'schedule' })

User.hasMany(Attendance, { foreignKey: 'studentId', as: 'attendance' })
Attendance.belongsTo(User, { foreignKey: 'studentId', as: 'student' })

// ── Notification <-> User ─────────────────────────────
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' })
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' })

// ── Payment ───────────────────────────────────────────
Payment.belongsTo(Enrollment, {
  foreignKey: 'enrollmentId',
  as: 'enrollment',
})
Payment.belongsTo(User, { foreignKey: 'studentId', as: 'student' })
Enrollment.hasOne(Payment, { foreignKey: 'enrollmentId', as: 'payment' })
User.hasMany(Payment, { foreignKey: 'studentId', as: 'payments' })

module.exports = db
