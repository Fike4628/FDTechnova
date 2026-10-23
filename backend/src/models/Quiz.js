/**
 * Quiz — a set of questions stored as JSON, attached to a course/lesson.
 *
 * The `questions` array shape (kept loose intentionally for flexibility):
 *   [{ id, text, type: 'single'|'multiple'|'text',
 *      options?: [{ id, text, correct: boolean }], points }]
 */
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Quiz = sequelize.define(
  'Quiz',
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
    questions: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      validate: {
        isValid(value) {
          if (!Array.isArray(value)) {
            throw new Error('Quiz questions must be an array')
          }
        },
      },
    },
    passScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 60,
      field: 'pass_score',
      validate: { min: 0, max: 100 },
    },
  },
  {
    tableName: 'quizzes',
  }
)

module.exports = Quiz
