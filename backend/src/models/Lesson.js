/**
 * Lesson — a single unit of content. Belongs to a course and optionally a
 * module. `isPreview` marks free-to-view lessons before enrollment.
 */
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Lesson = sequelize.define(
  'Lesson',
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
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'module_id',
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: { notEmpty: true },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    videoUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'video_url',
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: 'Lesson length in minutes',
      validate: { min: 0 },
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { min: 0 },
    },
    isPreview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_preview',
    },
  },
  {
    tableName: 'lessons',
  }
)

module.exports = Lesson
