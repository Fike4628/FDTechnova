/**
 * Assignment — instructor-created coursework attached to a course/lesson.
 */
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Assignment = sequelize.define(
  'Assignment',
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
    lessonId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'lesson_id',
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: true },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'due_date',
    },
    totalMarks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
      field: 'total_marks',
      validate: { min: 0 },
    },
  },
  {
    tableName: 'assignments',
  }
)

module.exports = Assignment
