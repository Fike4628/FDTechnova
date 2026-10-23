/**
 * Enrollment — a student's registration in a course.
 * Tracks progress (0-100) and lifecycle status. Uniqueness on (student, course)
 * prevents duplicate enrollments.
 */
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const STATUSES = ['active', 'completed', 'cancelled', 'refunded']

const Enrollment = sequelize.define(
  'Enrollment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'student_id',
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'course_id',
    },
    status: {
      type: DataTypes.ENUM(...STATUSES),
      allowNull: false,
      defaultValue: 'active',
      validate: {
        isIn: { args: [STATUSES], msg: 'Invalid enrollment status' },
      },
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0, max: 100 },
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'completed_at',
    },
  },
  {
    tableName: 'enrollments',
    indexes: [
      { unique: true, fields: ['student_id', 'course_id'] },
      { fields: ['status'] },
    ],
  }
)

Enrollment.STATUSES = STATUSES

module.exports = Enrollment
