/**
 * Attendance — a student's presence record for a class/schedule slot.
 */
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const STATUSES = ['present', 'absent', 'late', 'excused']

const Attendance = sequelize.define(
  'Attendance',
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
    scheduleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'schedule_id',
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...STATUSES),
      allowNull: false,
      defaultValue: 'present',
      validate: {
        isIn: { args: [STATUSES], msg: 'Invalid attendance status' },
      },
    },
  },
  {
    tableName: 'attendances',
    indexes: [
      { unique: true, fields: ['student_id', 'course_id', 'date'] },
    ],
  }
)

Attendance.STATUSES = STATUSES

module.exports = Attendance
