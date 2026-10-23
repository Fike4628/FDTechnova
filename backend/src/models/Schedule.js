/**
 * Schedule — a recurring class slot for a course.
 * `dayOfWeek` 0=Sunday … 6=Saturday, with start/end times.
 */
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Schedule = sequelize.define(
  'Schedule',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'course_id',
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: true },
    },
    dayOfWeek: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'day_of_week',
      validate: { min: 0, max: 6 },
      comment: '0=Sunday … 6=Saturday',
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'start_time',
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'end_time',
    },
    location: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    startsAt: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'starts_at',
    },
    endsAt: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'ends_at',
    },
  },
  {
    tableName: 'schedules',
  }
)

module.exports = Schedule
