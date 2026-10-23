/**
 * Submission — a student's answer to an assignment, later graded by an
 * instructor. The grade + feedback are written by the instructor grade flow.
 */
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const STATUSES = ['submitted', 'graded', 'late', 'resubmitted']

const Submission = sequelize.define(
  'Submission',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'assignment_id',
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'student_id',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fileUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'file_url',
    },
    grade: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
      validate: { min: 0 },
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...STATUSES),
      allowNull: false,
      defaultValue: 'submitted',
      validate: {
        isIn: { args: [STATUSES], msg: 'Invalid submission status' },
      },
    },
    submittedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'submitted_at',
    },
    gradedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'graded_at',
    },
  },
  {
    tableName: 'submissions',
  }
)

Submission.STATUSES = STATUSES

module.exports = Submission
